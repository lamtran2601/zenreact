#!/usr/bin/env node
/**
 * AI Assistant Prompt Generator CLI
 * 
 * Command-line tool to generate prompts for AI assistants based on the stored context.
 * Usage: node generatePrompt.js [path-to-project] [prompt-type] [options]
 * 
 * Example: 
 * - Generate project overview: node generatePrompt.js . overview
 * - Generate component creation prompt: node generatePrompt.js . component MyComponent "A component for displaying user profiles"
 */
const path = require('path');
const ContextPrompt = require('./contextPrompt');

// Parse command-line arguments
const args = process.argv.slice(2);
const projectPath = args[0] || '.';
const promptType = args[1] || 'overview';
const options = args.slice(2);

const absoluteProjectPath = path.resolve(projectPath);
const contextPrompt = new ContextPrompt(absoluteProjectPath);

// Generate prompt based on type
async function run() {
  console.log(`Generating ${promptType} prompt for project at: ${absoluteProjectPath}`);
  
  try {
    let result;
    
    switch (promptType.toLowerCase()) {
      case 'overview':
        result = contextPrompt.generateAndSaveProjectOverview();
        break;
      
      case 'component':
        if (options.length < 1) {
          console.error('Error: Component name is required');
          process.exit(1);
        }
        
        const componentName = options[0];
        const purpose = options[1] || `A component for the application`;
        
        result = contextPrompt.generateAndSaveComponentCreationPrompt(componentName, purpose);
        break;
      
      default:
        console.error(`Error: Unknown prompt type '${promptType}'`);
        console.log('Available prompt types: overview, component');
        process.exit(1);
    }
    
    console.log(`Prompt generated and saved to: ${result.filePath}`);
    console.log('\nGenerated Prompt Preview:');
    console.log('-------------------------');
    
    // Show a preview of the prompt (first few lines)
    const previewLines = result.prompt.split('\n').slice(0, 10);
    console.log(previewLines.join('\n') + (result.prompt.split('\n').length > 10 ? '\n...' : ''));
    
    console.log('\nUse this prompt with your AI assistant to provide project context.');
  } catch (error) {
    console.error('Error generating prompt:', error);
    process.exit(1);
  }
}

run(); 