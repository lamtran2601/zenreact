/**
 * Context Prompt Generator for AI Assistant
 * 
 * Generates prompts for AI assistants based on the stored context,
 * helping them understand the project structure and make better decisions.
 */
const fs = require('fs');
const path = require('path');
const ContextManager = require('./contextManager');

class ContextPrompt {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.contextManager = new ContextManager(projectRoot);
  }
  
  /**
   * Generates a project overview prompt based on context
   */
  generateProjectOverview() {
    const context = this.contextManager.getContext();
    
    const components = Object.keys(context.components);
    const hooks = Object.keys(context.hooks);
    const stores = Object.keys(context.stores);
    const services = Object.keys(context.services);
    const entities = context.domainModel.entities;
    
    let prompt = `# Project Context Overview\n\n`;
    prompt += `Last updated: ${new Date(context.lastUpdated).toLocaleString()}\n\n`;
    
    // Components summary
    prompt += `## Components (${components.length})\n\n`;
    if (components.length > 0) {
      const presentational = Object.entries(context.components)
        .filter(([_, data]) => data.type === 'presentation')
        .map(([name, _]) => name);
      
      const container = Object.entries(context.components)
        .filter(([_, data]) => data.type === 'container')
        .map(([name, _]) => name);
      
      const composite = Object.entries(context.components)
        .filter(([_, data]) => data.type === 'composite')
        .map(([name, _]) => name);
      
      if (presentational.length > 0) {
        prompt += `### Presentational Components\n`;
        prompt += presentational.map(name => `- ${name}`).join('\n');
        prompt += '\n\n';
      }
      
      if (container.length > 0) {
        prompt += `### Container Components\n`;
        prompt += container.map(name => `- ${name}`).join('\n');
        prompt += '\n\n';
      }
      
      if (composite.length > 0) {
        prompt += `### Composite Components\n`;
        prompt += composite.map(name => `- ${name}`).join('\n');
        prompt += '\n\n';
      }
    } else {
      prompt += `No components found in the project.\n\n`;
    }
    
    // Hooks summary
    prompt += `## Hooks (${hooks.length})\n\n`;
    if (hooks.length > 0) {
      hooks.forEach(hookName => {
        const hook = context.hooks[hookName];
        prompt += `- ${hookName} (${hook.type})\n`;
      });
      prompt += '\n';
    } else {
      prompt += `No hooks found in the project.\n\n`;
    }
    
    // Stores summary
    prompt += `## State Management (${stores.length})\n\n`;
    if (stores.length > 0) {
      stores.forEach(storeName => {
        const store = context.stores[storeName];
        prompt += `- ${storeName} (${store.type}${store.hasPersistence ? ', persistent' : ''})\n`;
      });
      prompt += '\n';
    } else {
      prompt += `No stores found in the project.\n\n`;
    }
    
    // Services summary
    prompt += `## Services (${services.length})\n\n`;
    if (services.length > 0) {
      services.forEach(serviceName => {
        const service = context.services[serviceName];
        prompt += `- ${serviceName} (${service.type})\n`;
        if (service.endpoints && service.endpoints.length > 0) {
          prompt += `  Endpoints: ${service.endpoints.join(', ')}\n`;
        }
      });
      prompt += '\n';
    } else {
      prompt += `No services found in the project.\n\n`;
    }
    
    // Domain model summary
    prompt += `## Domain Model (${entities.length})\n\n`;
    if (entities.length > 0) {
      prompt += `Entities: ${entities.join(', ')}\n\n`;
    } else {
      prompt += `No domain entities found in the project.\n\n`;
    }
    
    // Patterns used
    prompt += `## Project Patterns\n\n`;
    if (context.patterns && context.patterns.length > 0) {
      prompt += context.patterns.map(pattern => `- ${pattern}`).join('\n');
      prompt += '\n\n';
    } else {
      prompt += `No specific patterns identified.\n\n`;
    }
    
    return prompt;
  }
  
  /**
   * Generates a component creation prompt based on context
   */
  generateComponentCreationPrompt(componentName, purpose) {
    const context = this.contextManager.getContext();
    
    let prompt = `# Create Component: ${componentName}\n\n`;
    prompt += `Purpose: ${purpose}\n\n`;
    
    // Add project patterns for reference
    prompt += `## Project Component Patterns\n\n`;
    
    // Find similar components for reference
    const similarComponents = Object.keys(context.components)
      .filter(name => {
        const comp = context.components[name];
        return comp.type === 'presentation' || comp.type === 'container';
      })
      .slice(0, 5);
    
    if (similarComponents.length > 0) {
      prompt += `### Reference Components\n`;
      prompt += `Consider these existing components as references:\n`;
      similarComponents.forEach(name => {
        const comp = context.components[name];
        prompt += `- ${name} (${comp.path}): ${comp.type} component\n`;
      });
      prompt += '\n';
    }
    
    // Add hook patterns
    if (Object.keys(context.hooks).length > 0) {
      prompt += `### Project Hook Patterns\n`;
      prompt += `Consider using these existing hooks if relevant:\n`;
      Object.keys(context.hooks).slice(0, 5).forEach(name => {
        const hook = context.hooks[name];
        prompt += `- ${name} (${hook.path}): ${hook.type} hook\n`;
      });
      prompt += '\n';
    }
    
    // Add domain entities that might be relevant
    if (context.domainModel.entities.length > 0) {
      prompt += `### Relevant Domain Entities\n`;
      prompt += `Consider using these domain entities if relevant:\n`;
      prompt += context.domainModel.entities.map(entity => `- ${entity}`).join('\n');
      prompt += '\n\n';
    }
    
    return prompt;
  }
  
  /**
   * Saves the generated prompt to a file
   */
  savePromptToFile(prompt, filename) {
    const promptDir = path.join(this.projectRoot, '.ai-assistant', 'prompts');
    
    // Ensure directory exists
    if (!fs.existsSync(promptDir)) {
      fs.mkdirSync(promptDir, { recursive: true });
    }
    
    const filePath = path.join(promptDir, filename);
    fs.writeFileSync(filePath, prompt);
    
    return filePath;
  }
  
  /**
   * Generates the project overview prompt and saves it to a file
   */
  generateAndSaveProjectOverview() {
    const prompt = this.generateProjectOverview();
    const filename = 'project-overview.md';
    const filePath = this.savePromptToFile(prompt, filename);
    
    return {
      prompt,
      filePath
    };
  }
  
  /**
   * Generates a component creation prompt and saves it to a file
   */
  generateAndSaveComponentCreationPrompt(componentName, purpose) {
    const prompt = this.generateComponentCreationPrompt(componentName, purpose);
    const filename = `create-component-${componentName.toLowerCase()}.md`;
    const filePath = this.savePromptToFile(prompt, filename);
    
    return {
      prompt,
      filePath
    };
  }
}

module.exports = ContextPrompt; 