/**
 * Flexible Context Analyzer for AI Assistants
 * 
 * Provides both automated analysis capabilities and AI agent-friendly interfaces
 * for understanding codebase patterns, structure, and conventions.
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

class ContextAnalyzer {
  constructor(projectRoot, contextManager) {
    this.projectRoot = projectRoot;
    this.contextManager = contextManager;
    
    // Common patterns to look for
    this.patterns = {
      components: ['src/components/**/*.{jsx,tsx}', 'src/features/**/*.{jsx,tsx}'],
      hooks: ['src/hooks/**/*.{js,ts}', 'src/**/use*.{js,ts}'],
      stores: ['src/store/**/*.{js,ts}', 'src/stores/**/*.{js,ts}', 'src/**/store.{js,ts}'],
      services: ['src/services/**/*.{js,ts}', 'src/api/**/*.{js,ts}'],
      types: ['src/types/**/*.{ts,tsx}', 'src/**/*.types.ts']
    };
  }
  
  /**
   * Analyzes the entire project to build context
   * This can be called by scripts or by AI agents
   */
  async analyzeProject(options = {}) {
    console.log('Analyzing project for AI context...');
    
    // Default analysis
    const analysisTypes = options.analysisTypes || [
      'components', 'hooks', 'stores', 'services', 'domain'
    ];
    
    // Perform selected analyses
    const results = {};
    
    if (analysisTypes.includes('components')) {
      results.components = await this.analyzeComponents();
    }
    
    if (analysisTypes.includes('hooks')) {
      results.hooks = await this.analyzeHooks();
    }
    
    if (analysisTypes.includes('stores')) {
      results.stores = await this.analyzeStores();
    }
    
    if (analysisTypes.includes('services')) {
      results.services = await this.analyzeServices();
    }
    
    if (analysisTypes.includes('domain')) {
      results.domainModel = await this.analyzeDomainModel();
    }
    
    console.log('Project analysis complete. Context updated.');
    
    // Either save to JSON context or return directly to AI agent
    if (options.returnResults) {
      return results;
    } else {
      // Save results to context manager in multiple formats
      this.saveResultsToContext(results);
      return this.contextManager.getAllContext();
    }
  }
  
  /**
   * Save results to both JSON and markdown contexts
   */
  saveResultsToContext(results) {
    // Update JSON context
    for (const [section, data] of Object.entries(results)) {
      this.contextManager.updateContextSection(section, data);
    }
    
    // Create markdown summaries
    if (results.components) {
      this.createComponentPatternsSummary(results.components);
    }
    
    if (results.stores) {
      this.createStateManagementSummary(results.stores);
    }
  }
  
  /**
   * Creates a markdown summary of component patterns
   */
  createComponentPatternsSummary(components) {
    let patterns = '';
    
    // Group components by type
    const groupedComponents = {
      presentation: [],
      container: [],
      composite: [],
      page: [],
      other: []
    };
    
    Object.entries(components).forEach(([name, data]) => {
      if (data.type) {
        const type = data.type.toLowerCase();
        if (groupedComponents[type]) {
          groupedComponents[type].push({name, ...data});
        } else {
          groupedComponents.other.push({name, ...data});
        }
      } else {
        groupedComponents.other.push({name, ...data});
      }
    });
    
    // Create a markdown summary
    patterns += '# Component Patterns\n\n';
    
    for (const [type, comps] of Object.entries(groupedComponents)) {
      if (comps.length > 0) {
        patterns += `## ${type.charAt(0).toUpperCase() + type.slice(1)} Components\n\n`;
        
        comps.forEach(comp => {
          patterns += `### ${comp.name}\n\n`;
          patterns += `- **Path:** \`${comp.path}\`\n`;
          if (comp.patterns && comp.patterns.length) {
            patterns += `- **Patterns:** ${comp.patterns.join(', ')}\n`;
          }
          patterns += '\n';
        });
      }
    }
    
    this.contextManager.updateMarkdownContext('component-patterns', patterns);
  }
  
  /**
   * Creates a markdown summary of state management
   */
  createStateManagementSummary(stores) {
    let summary = '# State Management\n\n';
    
    // Group by type
    const storeTypes = {};
    
    Object.entries(stores).forEach(([name, data]) => {
      if (!storeTypes[data.type]) {
        storeTypes[data.type] = [];
      }
      storeTypes[data.type].push({name, ...data});
    });
    
    for (const [type, storeList] of Object.entries(storeTypes)) {
      summary += `## ${type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;
      
      storeList.forEach(store => {
        summary += `### ${store.name}\n\n`;
        summary += `- **Path:** \`${store.path}\`\n`;
        if (store.hasPersistence) {
          summary += `- **Persistent:** Yes\n`;
        }
        summary += '\n';
      });
    }
    
    this.contextManager.updateMarkdownContext('state-management', summary);
  }
  
  /**
   * Find files matching a pattern
   */
  findFiles(pattern) {
    return new Promise((resolve, reject) => {
      glob(pattern, { cwd: this.projectRoot }, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }
  
  /**
   * Read a file and return its contents
   */
  readFile(filePath) {
    return fs.readFileSync(path.join(this.projectRoot, filePath), 'utf8');
  }
  
  /**
   * AI Agent-friendly method to analyze a specific file
   * Can be called directly by AI to understand a component
   */
  analyzeFile(filePath) {
    try {
      const content = this.readFile(filePath);
      const extension = path.extname(filePath);
      
      // Based on file path and extension, determine what kind of file it is
      if (filePath.includes('/components/') || filePath.includes('/features/')) {
        if (['.jsx', '.tsx'].includes(extension)) {
          return this.analyzeComponentContent(content, filePath);
        }
      } else if (filePath.includes('/hooks/') || filePath.match(/\/use[A-Z]\w+\.[jt]s/)) {
        return this.analyzeHookContent(content, filePath);
      } else if (filePath.includes('/store/') || filePath.includes('/stores/')) {
        return this.analyzeStoreContent(content, filePath);
      }
      
      // Default analysis
      return {
        path: filePath,
        fileType: extension.replace('.', ''),
        size: content.length,
        analysis: "This file doesn't match any of the common patterns for special analysis."
      };
    } catch (error) {
      return {
        path: filePath,
        error: error.message
      };
    }
  }
  
  /**
   * Analyzes components
   */
  async analyzeComponents() {
    console.log('Analyzing components...');
    const components = {};
    
    try {
      // Find all component files
      let componentFiles = [];
      for (const pattern of this.patterns.components) {
        componentFiles = componentFiles.concat(await this.findFiles(pattern));
      }
      
      // Process each component file
      for (const file of componentFiles) {
        try {
          const content = this.readFile(file);
          const componentName = path.basename(file).replace(/\.(jsx|tsx)$/, '');
          
          // Simple analysis of component type and patterns
          const isContainer = content.includes('useQuery') || 
                              content.includes('connect(') ||
                              content.includes('useSelector');
                              
          const isPresentation = !isContainer && (
                                 content.includes('React.memo') ||
                                 !content.includes('useState'));
                                 
          const type = file.includes('/pages/') ? 'page' :
                      isContainer ? 'container' :
                      isPresentation ? 'presentation' : 'composite';
                      
          // Identify common patterns
          const patterns = [];
          if (content.includes('React.memo')) patterns.push('Memoization');
          if (content.includes('children')) patterns.push('Composition');
          if (content.includes('useCallback')) patterns.push('Performance Optimization');
          if (content.includes('forwardRef')) patterns.push('Forwarded Refs');
          
          components[componentName] = {
            path: file,
            type,
            patterns,
            hasProps: content.includes('Props')
          };
          
        } catch (error) {
          console.error(`Error analyzing component ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('Error analyzing components:', error);
    }
    
    return components;
  }
  
  /**
   * Analyze the content of a single component
   */
  analyzeComponentContent(content, filePath) {
    const componentName = path.basename(filePath).replace(/\.(jsx|tsx)$/, '');
    
    // Simple analysis of component type and patterns
    const isContainer = content.includes('useQuery') || 
                        content.includes('connect(') ||
                        content.includes('useSelector');
                        
    const isPresentation = !isContainer && (
                          content.includes('React.memo') ||
                          !content.includes('useState'));
                          
    const type = filePath.includes('/pages/') ? 'page' :
                isContainer ? 'container' :
                isPresentation ? 'presentation' : 'composite';
                
    // Identify common patterns
    const patterns = [];
    if (content.includes('React.memo')) patterns.push('Memoization');
    if (content.includes('children')) patterns.push('Composition');
    if (content.includes('useCallback')) patterns.push('Performance Optimization');
    if (content.includes('forwardRef')) patterns.push('Forwarded Refs');
    
    return {
      name: componentName,
      path: filePath,
      type,
      patterns,
      hasProps: content.includes('Props')
    };
  }
  
  /**
   * Analyzes hooks (simplified implementation)
   */
  async analyzeHooks() {
    console.log('Analyzing hooks...');
    const hooks = {};
    
    try {
      // Find all hook files
      let hookFiles = [];
      for (const pattern of this.patterns.hooks) {
        hookFiles = hookFiles.concat(await this.findFiles(pattern));
      }
      
      // Process each hook file
      for (const file of hookFiles) {
        try {
          const content = this.readFile(file);
          const hookName = path.basename(file).replace(/\.(js|ts)$/, '');
          
          // Determine hook type
          const isStateHook = content.includes('useState') || 
                             content.includes('useReducer') ||
                             content.includes('useStore');
                             
          const isEffectHook = content.includes('useEffect') ||
                              content.includes('useLayoutEffect');
                              
          const isDataHook = content.includes('useQuery') || 
                            content.includes('useMutation') ||
                            content.includes('useFetch');
                            
          const type = isStateHook ? 'state' : 
                      isEffectHook ? 'effect' :
                      isDataHook ? 'data' : 'utility';
          
          hooks[hookName] = {
            path: file,
            type
          };
        } catch (error) {
          console.error(`Error analyzing hook ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('Error analyzing hooks:', error);
    }
    
    return hooks;
  }
  
  /**
   * Analyzes hook content
   */
  analyzeHookContent(content, filePath) {
    const hookName = path.basename(filePath).replace(/\.(js|ts)$/, '');
    
    // Determine hook type
    const isStateHook = content.includes('useState') || 
                       content.includes('useReducer') ||
                       content.includes('useStore');
                       
    const isEffectHook = content.includes('useEffect') ||
                        content.includes('useLayoutEffect');
                        
    const isDataHook = content.includes('useQuery') || 
                      content.includes('useMutation') ||
                      content.includes('useFetch');
                      
    const type = isStateHook ? 'state' : 
                isEffectHook ? 'effect' :
                isDataHook ? 'data' : 'utility';
    
    return {
      name: hookName,
      path: filePath,
      type
    };
  }
  
  /**
   * Analyzes stores (simplified implementation)
   */
  async analyzeStores() {
    console.log('Analyzing stores...');
    const stores = {};
    
    try {
      // Find all store files
      let storeFiles = [];
      for (const pattern of this.patterns.stores) {
        storeFiles = storeFiles.concat(await this.findFiles(pattern));
      }
      
      // Process each store file
      for (const file of storeFiles) {
        try {
          const content = this.readFile(file);
          let storeName = path.basename(file).replace(/\.(js|ts)$/, '');
          
          // If the file is named store.js, use directory name instead
          if (storeName === 'store') {
            storeName = path.basename(path.dirname(file));
          }
          
          // Determine store type
          const isZustand = content.includes('create(') || content.includes('createStore');
          const isRedux = content.includes('createSlice') || content.includes('createStore') ||
                         content.includes('configureStore');
          const isContext = content.includes('createContext');
          
          const type = isZustand ? 'zustand' :
                      isRedux ? 'redux' :
                      isContext ? 'context' : 'custom';
                      
          stores[storeName] = {
            path: file,
            type,
            hasPersistence: content.includes('persist') || content.includes('localStorage')
          };
        } catch (error) {
          console.error(`Error analyzing store ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('Error analyzing stores:', error);
    }
    
    return stores;
  }
  
  /**
   * Analyzes store content
   */
  analyzeStoreContent(content, filePath) {
    let storeName = path.basename(filePath).replace(/\.(js|ts)$/, '');
    
    // If the file is named store.js, use directory name instead
    if (storeName === 'store') {
      storeName = path.basename(path.dirname(filePath));
    }
    
    // Determine store type
    const isZustand = content.includes('create(') || content.includes('createStore');
    const isRedux = content.includes('createSlice') || content.includes('createStore') ||
                   content.includes('configureStore');
    const isContext = content.includes('createContext');
    
    const type = isZustand ? 'zustand' :
                isRedux ? 'redux' :
                isContext ? 'context' : 'custom';
                
    return {
      name: storeName,
      path: filePath,
      type,
      hasPersistence: content.includes('persist') || content.includes('localStorage')
    };
  }
  
  /**
   * Analyzes services (minimal implementation)
   */
  async analyzeServices() {
    console.log('Analyzing services...');
    const services = {};
    
    try {
      // Find all service files
      let serviceFiles = [];
      for (const pattern of this.patterns.services) {
        serviceFiles = serviceFiles.concat(await this.findFiles(pattern));
      }
      
      // Process each service file
      for (const file of serviceFiles) {
        try {
          const content = this.readFile(file);
          const serviceName = path.basename(file).replace(/\.(js|ts)$/, '');
          
          // Determine service type and endpoints
          const isReactQuery = content.includes('useQuery') || content.includes('useMutation');
          const isGraphQL = content.includes('gql') || content.includes('GraphQL');
          const isREST = content.includes('fetch(') || content.includes('axios');
          
          const type = isReactQuery ? 'react-query' :
                      isGraphQL ? 'graphql' :
                      isREST ? 'rest' : 'custom';
                      
          // Extract function names as potential endpoints
          const functionMatches = content.match(/function\s+([a-zA-Z0-9_]+)\s*\(/g) || [];
          const constMatches = content.match(/const\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?\(/g) || [];
          
          const functionNames = functionMatches.map(match => match.replace(/function\s+|\s*\(/g, ''));
          const constNames = constMatches.map(match => match.replace(/const\s+|\s*=\s*(?:async\s*)?\(/g, ''));
          
          const endpoints = [...functionNames, ...constNames].filter(name => 
            name.includes('fetch') || 
            name.includes('get') || 
            name.includes('post') ||
            name.includes('put') ||
            name.includes('delete') ||
            name.includes('query')
          );
          
          services[serviceName] = {
            path: file,
            type,
            endpoints
          };
        } catch (error) {
          console.error(`Error analyzing service ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('Error analyzing services:', error);
    }
    
    return services;
  }
  
  /**
   * Analyzes domain model from type files
   */
  async analyzeDomainModel() {
    console.log('Analyzing domain model...');
    const domainModel = { entities: [] };
    
    try {
      // Find type files
      let typeFiles = [];
      for (const pattern of this.patterns.types) {
        typeFiles = typeFiles.concat(await this.findFiles(pattern));
      }
      
      // Extract entities from type files
      for (const file of typeFiles) {
        try {
          const content = this.readFile(file);
          
          // Find interfaces and types
          const interfaceMatches = content.match(/interface\s+([A-Z][a-zA-Z0-9_]*)/g) || [];
          const typeMatches = content.match(/type\s+([A-Z][a-zA-Z0-9_]*)\s*=/g) || [];
          
          const interfaces = interfaceMatches.map(match => match.replace(/interface\s+/, ''));
          const types = typeMatches.map(match => match.replace(/type\s+|\s*=/g, ''));
          
          // Add to domain entities if they look like entities (starting with capital letter)
          [...interfaces, ...types].forEach(entity => {
            if (/^[A-Z]/.test(entity) && !domainModel.entities.includes(entity)) {
              domainModel.entities.push(entity);
            }
          });
        } catch (error) {
          console.error(`Error analyzing types in ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('Error analyzing domain model:', error);
    }
    
    return domainModel;
  }
}

module.exports = ContextAnalyzer; 