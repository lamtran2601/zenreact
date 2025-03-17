/**
 * AI Context Helper
 * 
 * This module provides AI-friendly interfaces for interacting with project context
 * directly from AI agents like Claude in Cursor.
 * 
 * It's designed to be simple, flexible, and to enable AI agents to:
 * 1. Dynamically scan and understand your codebase
 * 2. Extract patterns and conventions
 * 3. Maintain context across development sessions
 * 4. Generate code that follows your established patterns
 */
const fs = require('fs');
const path = require('path');
const ContextManager = require('./contextManager');
const ContextAnalyzer = require('./contextAnalyzer');

class AIContextHelper {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.contextManager = new ContextManager(projectRoot, {
      contextDir: path.join(projectRoot, '.zen', 'context'),
      markdownDir: path.join(projectRoot, 'docs', 'context')
    });
    this.analyzer = new ContextAnalyzer(projectRoot, this.contextManager);
  }
  
  /**
   * Simple method for AI to quickly understand the project structure
   */
  async scanProject(options = {}) {
    // Default scan directories
    const scanDirs = options.directories || ['src/components', 'src/hooks', 'src/features'];
    
    const result = {
      structure: {},
      patterns: {},
      recommendations: []
    };
    
    // Basic directory structure analysis
    for (const dir of scanDirs) {
      try {
        const dirPath = path.join(this.projectRoot, dir);
        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath, { withFileTypes: true });
          
          result.structure[dir] = {
            fileCount: files.filter(f => f.isFile()).length,
            subdirs: files.filter(f => f.isDirectory()).map(f => f.name)
          };
        }
      } catch (error) {
        result.structure[dir] = { error: error.message };
      }
    }
    
    // Look for patterns in key files
    if (options.detectPatterns !== false) {
      // Find pattern examples
      const componentPatterns = await this.findPatternExamples('component');
      const hookPatterns = await this.findPatternExamples('hook');
      const storePatterns = await this.findPatternExamples('store');
      
      result.patterns = {
        components: componentPatterns,
        hooks: hookPatterns,
        stores: storePatterns
      };
      
      // Generate recommendations based on patterns
      result.recommendations = this.generateRecommendations(result.patterns);
    }
    
    return result;
  }
  
  /**
   * Find examples of patterns in the codebase
   */
  async findPatternExamples(type, limit = 3) {
    const examples = [];
    
    try {
      let files = [];
      
      // Find files based on type
      if (type === 'component') {
        const componentPatterns = ['src/components/**/*.{jsx,tsx}', 'src/features/**/*.{jsx,tsx}'];
        for (const pattern of componentPatterns) {
          const found = await this.analyzer.findFiles(pattern);
          files = files.concat(found.slice(0, Math.ceil(limit / componentPatterns.length)));
        }
      } else if (type === 'hook') {
        files = await this.analyzer.findFiles('src/hooks/**/*.{js,ts}');
        files = files.slice(0, limit);
      } else if (type === 'store') {
        files = await this.analyzer.findFiles('src/store/**/*.{js,ts}');
        files = files.slice(0, limit);
      }
      
      // Analyze each file
      for (const file of files) {
        let analysis;
        
        if (type === 'component') {
          const content = this.analyzer.readFile(file);
          analysis = this.analyzer.analyzeComponentContent(content, file);
        } else if (type === 'hook') {
          const content = this.analyzer.readFile(file);
          analysis = this.analyzer.analyzeHookContent(content, file);
        } else if (type === 'store') {
          const content = this.analyzer.readFile(file);
          analysis = this.analyzer.analyzeStoreContent(content, file);
        }
        
        if (analysis) {
          examples.push(analysis);
        }
      }
    } catch (error) {
      console.error(`Error finding pattern examples for ${type}:`, error);
    }
    
    return examples;
  }
  
  /**
   * Generate recommendations based on detected patterns
   */
  generateRecommendations(patterns) {
    const recommendations = [];
    
    // Component recommendations
    if (patterns.components && patterns.components.length > 0) {
      const presentational = patterns.components.some(c => c.type === 'presentation');
      const container = patterns.components.some(c => c.type === 'container');
      const memo = patterns.components.some(c => c.patterns && c.patterns.includes('Memoization'));
      
      if (presentational && container) {
        recommendations.push('Follow the presentational/container component pattern');
      }
      
      if (memo) {
        recommendations.push('Use React.memo for presentational components');
      }
    }
    
    // Hook recommendations
    if (patterns.hooks && patterns.hooks.length > 0) {
      const stateHooks = patterns.hooks.filter(h => h.type === 'state');
      if (stateHooks.length > 0) {
        recommendations.push('Extract complex state logic into custom hooks');
      }
    }
    
    // Store recommendations
    if (patterns.stores && patterns.stores.length > 0) {
      const storeTypes = new Set(patterns.stores.map(s => s.type));
      
      if (storeTypes.has('zustand')) {
        recommendations.push('Use Zustand for global state management');
      } else if (storeTypes.has('redux')) {
        recommendations.push('Use Redux with Redux Toolkit for global state management');
      } else if (storeTypes.has('context')) {
        recommendations.push('Use React Context for shared state');
      }
    }
    
    // If no specific recommendations, add defaults
    if (recommendations.length === 0) {
      recommendations.push('Use function components with TypeScript');
      recommendations.push('Create clear separation between UI and business logic');
      recommendations.push('Implement proper prop typing with interfaces');
    }
    
    return recommendations;
  }
  
  /**
   * Get all context data
   */
  getContext() {
    return this.contextManager.getAllContext();
  }
  
  /**
   * Analyze a specific file
   */
  analyzeFile(filePath) {
    return this.analyzer.analyzeFile(filePath);
  }
  
  /**
   * Add context directly from AI agent
   */
  addAIContext(contextType, name, details) {
    if (contextType === 'component-pattern') {
      return this.contextManager.updateComponentPattern(name, details);
    } else if (contextType === 'state-management') {
      return this.contextManager.updateStateManagement(details);
    } else {
      // Add to JSON context
      return this.contextManager.updateContextSection(contextType, { [name]: details });
    }
  }
  
  /**
   * Parse JSDoc-style AI context annotations from code
   */
  parseContextAnnotations(code) {
    const annotations = {};
    
    // Match @ai- annotations
    const aiAnnotationRegex = /@ai-([a-z-]+)(?:\s+([^\n]+))?/g;
    let match;
    
    while ((match = aiAnnotationRegex.exec(code)) !== null) {
      const [_, type, value] = match;
      
      if (!annotations[type]) {
        annotations[type] = [];
      }
      
      if (value) {
        annotations[type].push(value.trim());
      }
    }
    
    return annotations;
  }
  
  /**
   * Create an in-code context marker for a component
   */
  generateComponentContextMarker(componentName, type, patterns = []) {
    return `/**
 * @ai-pattern ${type}-component
 * @ai-name ${componentName}
 * @ai-conventions
 * - Props interface named ${componentName}Props
 * - Use function declaration syntax
 * ${patterns.map(p => `* - ${p}`).join('\n ')}
 */`;
  }
}

module.exports = AIContextHelper;

// Direct CLI usage
if (require.main === module) {
  const helper = new AIContextHelper();
  
  helper.scanProject()
    .then(result => {
      console.log('AI Context Scan Results:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(error => {
      console.error('Error scanning project:', error);
    });
} 