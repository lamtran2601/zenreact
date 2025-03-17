/**
 * Flexible Context Manager for AI Assistants
 * 
 * Provides a framework for AI agents to maintain awareness of project structure
 * and patterns across multiple development sessions, with flexible storage options.
 */
const fs = require('fs');
const path = require('path');

class ContextManager {
  constructor(projectRoot, options = {}) {
    this.projectRoot = projectRoot;
    
    // Support multiple context formats and locations
    this.contextDir = options.contextDir || path.join(projectRoot, '.zen', 'context');
    this.embeddingsDir = options.embeddingsDir || path.join(this.contextDir, 'embeddings');
    this.markdownDir = options.markdownDir || path.join(projectRoot, 'docs', 'context');
    
    // Default context files
    this.contextFile = path.join(this.contextDir, 'context.json');
    this.architectureFile = path.join(this.markdownDir, 'architecture.md');
    this.componentPatternsFile = path.join(this.markdownDir, 'component-patterns.md');
    this.stateMgmtFile = path.join(this.markdownDir, 'state-management.md');
    
    // Ensure necessary directories exist
    this.ensureDirectoriesExist();
  }
  
  /**
   * Ensures all context directories exist
   */
  ensureDirectoriesExist() {
    [this.contextDir, this.embeddingsDir, this.markdownDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }
  
  /**
   * Gets the JSON context, or creates an empty one if none exists
   */
  getJSONContext() {
    try {
      if (fs.existsSync(this.contextFile)) {
        const data = fs.readFileSync(this.contextFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error reading context file:', error);
    }
    
    // Return default empty context
    return {
      lastUpdated: new Date().toISOString(),
      components: {},
      hooks: {},
      stores: {},
      services: {},
      utils: {},
      domainModel: {
        entities: []
      },
      patterns: []
    };
  }
  
  /**
   * Saves the JSON context to disk
   */
  saveJSONContext(context) {
    try {
      // Ensure the lastUpdated timestamp is current
      context.lastUpdated = new Date().toISOString();
      
      // Pretty print the JSON for readability
      const data = JSON.stringify(context, null, 2);
      fs.writeFileSync(this.contextFile, data);
      return true;
    } catch (error) {
      console.error('Error saving context file:', error);
      return false;
    }
  }
  
  /**
   * Gets all context in a format suitable for AI agents
   */
  getAllContext() {
    const context = {
      json: this.getJSONContext(),
      markdown: this.getMarkdownContext(),
      embeddingsAvailable: this.checkEmbeddingsExist()
    };
    
    return context;
  }
  
  /**
   * Gets all markdown context files as a single object
   */
  getMarkdownContext() {
    const markdownFiles = {};
    
    // Read all markdown files in the context directory
    if (fs.existsSync(this.markdownDir)) {
      const files = fs.readdirSync(this.markdownDir).filter(f => f.endsWith('.md'));
      
      files.forEach(file => {
        try {
          const filePath = path.join(this.markdownDir, file);
          markdownFiles[file.replace('.md', '')] = fs.readFileSync(filePath, 'utf8');
        } catch (error) {
          console.error(`Error reading ${file}:`, error);
        }
      });
    }
    
    return markdownFiles;
  }
  
  /**
   * Updates a markdown context file
   */
  updateMarkdownContext(fileName, content) {
    try {
      const filePath = path.join(this.markdownDir, `${fileName}.md`);
      fs.writeFileSync(filePath, content);
      return true;
    } catch (error) {
      console.error(`Error updating ${fileName}.md:`, error);
      return false;
    }
  }
  
  /**
   * Checks if vector embeddings exist
   */
  checkEmbeddingsExist() {
    return fs.existsSync(this.embeddingsDir) && 
           fs.readdirSync(this.embeddingsDir).length > 0;
  }
  
  /**
   * Adds or updates a component pattern in the relevant markdown file
   */
  updateComponentPattern(name, pattern) {
    let content = '';
    
    // Try to read existing file
    if (fs.existsSync(this.componentPatternsFile)) {
      content = fs.readFileSync(this.componentPatternsFile, 'utf8');
    } else {
      // Create a new file with header
      content = `# Component Patterns\n\nThis document contains patterns for React components used in this project.\n\n`;
    }
    
    // Check if this component already has a section
    const componentSection = new RegExp(`## ${name}[\\s\\S]*?(?=## |$)`, 'g');
    const hasSection = componentSection.test(content);
    
    if (hasSection) {
      // Update existing section
      content = content.replace(componentSection, `## ${name}\n\n${pattern}\n\n`);
    } else {
      // Add new section
      content += `\n## ${name}\n\n${pattern}\n\n`;
    }
    
    return this.updateMarkdownContext('component-patterns', content);
  }
  
  /**
   * Updates the state management documentation
   */
  updateStateManagement(statePattern) {
    let content = '';
    
    // Try to read existing file
    if (fs.existsSync(this.stateMgmtFile)) {
      content = fs.readFileSync(this.stateMgmtFile, 'utf8');
    } else {
      // Create a new file with header
      content = `# State Management\n\nThis document describes state management patterns used in this project.\n\n`;
    }
    
    // Add or update the state pattern
    content += `\n${statePattern}\n\n`;
    
    return this.updateMarkdownContext('state-management', content);
  }
  
  /**
   * Quick method to update JSON context while maintaining backward compatibility
   */
  updateContextSection(section, data) {
    const context = this.getJSONContext();
    context[section] = { ...context[section], ...data };
    return this.saveJSONContext(context);
  }
}

module.exports = ContextManager; 