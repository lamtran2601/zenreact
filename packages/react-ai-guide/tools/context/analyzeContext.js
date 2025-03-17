#!/usr/bin/env node
/**
 * Context Analyzer CLI
 * 
 * Provides a command-line interface for analyzing project context.
 * This is a minimal entry point that enables both direct usage by developers
 * and integration with AI agents.
 */
const path = require('path');
const ContextManager = require('./contextManager');
const ContextAnalyzer = require('./contextAnalyzer');

// Parse command line arguments
const args = process.argv.slice(2);
const projectPath = args[0] || process.cwd();
const options = {
  analysisTypes: args[1] ? args[1].split(',') : ['components', 'hooks', 'stores', 'services', 'domain'],
  outputFormat: args[2] || 'both',
  forAI: args.includes('--ai') || args.includes('-a')
};

// Create context manager with more flexible .zen directory
const contextManager = new ContextManager(projectPath, {
  contextDir: path.join(projectPath, '.zen', 'context'),
  markdownDir: path.join(projectPath, 'docs', 'context')
});

// Create analyzer
const analyzer = new ContextAnalyzer(projectPath, contextManager);

// Run analysis
analyzer.analyzeProject({
  analysisTypes: options.analysisTypes,
  returnResults: false
})
.then(context => {
  console.log('✅ Analysis complete! Context updated in:');
  console.log(`  - JSON: ${path.join(projectPath, '.zen', 'context', 'context.json')}`);
  console.log(`  - Markdown: ${path.join(projectPath, 'docs', 'context')}`);
  
  // Print AI-friendly message if requested
  if (options.forAI) {
    console.log('\nAI CONTEXT INFORMATION:');
    console.log('I\'ve analyzed your codebase and can now provide assistance based on your project\'s patterns and structure.');
    console.log('Feel free to ask me to create components, hooks, or services that follow your project\'s conventions.');
  }
})
.catch(error => {
  console.error('❌ Error analyzing project:', error);
  process.exit(1);
}); 