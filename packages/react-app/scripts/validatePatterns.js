#!/usr/bin/env node

/**
 * @pattern AutomatedValidation
 * @rule PatternCompliance
 * Script to validate pattern compliance across the codebase
 */
import { readFileSync } from 'fs';
import { sync } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'chalk';
const { blue, green, red } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  srcDir: path.resolve(__dirname, '../src'),
  patternsDir: path.resolve(__dirname, '../ai-tooling/patterns'),
  rulesDir: path.resolve(__dirname, '../ai-tooling/rules'),
  fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  requiredAnnotations: {
    components: ['pattern', 'rule'],
    hooks: ['pattern', 'rule'],
    store: ['pattern', 'rule'],
    utils: ['pattern'],
  },
  excludeDirs: ['node_modules', 'dist', 'build', 'coverage'],
};

// Pattern and rule definitions
const patterns = {};
const rules = {};

/**
 * @pattern FileScanning
 * @rule EfficientIO
 * Load patterns and rules from files
 */
function loadPatternsAndRules() {
  console.log(blue('Loading patterns and rules...'));

  // Load patterns
  const patternFiles = sync(`${config.patternsDir}/**/*.md`);
  patternFiles.forEach((file) => {
    const content = readFileSync(file, 'utf8');
    const patternMatches = content.match(/@pattern\s+([A-Za-z0-9]+)/g) || [];

    patternMatches.forEach((match) => {
      const patternName = match.replace('@pattern', '').trim();
      patterns[patternName] = true;
    });
  });

  // Load rules
  const ruleFiles = sync(`${config.rulesDir}/**/*.md`);
  ruleFiles.forEach((file) => {
    const content = readFileSync(file, 'utf8');
    const ruleMatches = content.match(/@rule\s+([A-Za-z0-9]+)/g) || [];

    ruleMatches.forEach((match) => {
      const ruleName = match.replace('@rule', '').trim();
      rules[ruleName] = true;
    });
  });

  console.log(
    green(`Loaded ${Object.keys(patterns).length} patterns and ${Object.keys(rules).length} rules`)
  );
}

/**
 * @pattern FileValidation
 * @rule ComprehensiveChecks
 * Validate pattern and rule annotations in a file
 */
function validateFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const fileType = getFileType(filePath);
  const requiredAnnotations = config.requiredAnnotations[fileType] || [];

  if (requiredAnnotations.length === 0) {
    return { valid: true, errors: [] };
  }

  const errors = [];

  // Check for pattern annotations
  const patternMatches = content.match(/@pattern\s+([A-Za-z0-9]+)/g) || [];
  const patternAnnotations = patternMatches.map((match) => match.replace('@pattern', '').trim());

  // Check for rule annotations
  const ruleMatches = content.match(/@rule\s+([A-Za-z0-9]+)/g) || [];
  const ruleAnnotations = ruleMatches.map((match) => match.replace('@rule', '').trim());

  // Validate required annotations
  if (requiredAnnotations.includes('pattern') && patternAnnotations.length === 0) {
    errors.push(`Missing pattern annotation`);
  }

  if (requiredAnnotations.includes('rule') && ruleAnnotations.length === 0) {
    errors.push(`Missing rule annotation`);
  }

  // Validate pattern references
  patternAnnotations.forEach((pattern) => {
    if (!patterns[pattern]) {
      errors.push(`Unknown pattern: ${pattern}`);
    }
  });

  // Validate rule references
  ruleAnnotations.forEach((rule) => {
    if (!rules[rule]) {
      errors.push(`Unknown rule: ${rule}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    patterns: patternAnnotations,
    rules: ruleAnnotations,
  };
}

/**
 * @pattern FileClassification
 * @rule AccurateTyping
 * Determine the type of file based on its path and content
 */
function getFileType(filePath) {
  const relativePath = path.relative(config.srcDir, filePath);

  if (relativePath.includes('/components/')) {
    return 'components';
  } else if (relativePath.includes('/hooks/')) {
    return 'hooks';
  } else if (relativePath.includes('/store/')) {
    return 'store';
  } else if (relativePath.includes('/utils/')) {
    return 'utils';
  }

  // Default to components for .tsx files with React imports
  if (filePath.endsWith('.tsx')) {
    const content = readFileSync(filePath, 'utf8');
    if (content.includes('import React') || content.includes("from 'react'")) {
      return 'components';
    }
  }

  return 'other';
}

/**
 * @pattern DirectoryScanning
 * @rule RecursiveSearch
 * Scan directory for files to validate
 */
function scanDirectory() {
  console.log(blue('Scanning directory for files...'));

  const excludePattern = config.excludeDirs.map((dir) => `**/${dir}/**`).join('|');
  const extensions = config.fileExtensions.join(',');

  const files = sync(`${config.srcDir}/**/*.{${extensions.replace(/\./g, '')}}`, {
    ignore: excludePattern,
  });

  console.log(green(`Found ${files.length} files to validate`));
  return files;
}

/**
 * @pattern ResultsReporting
 * @rule ClearOutput
 * Report validation results
 */
function reportResults(results) {
  const validFiles = results.filter((r) => r.valid);
  const invalidFiles = results.filter((r) => !r.valid);

  console.log(green(`\n✅ ${validFiles.length} files passed validation`));

  if (invalidFiles.length > 0) {
    console.log(red(`\n❌ ${invalidFiles.length} files failed validation:`));

    invalidFiles.forEach((result) => {
      console.log(red(`\n${result.file}:`));
      result.errors.forEach((error) => {
        console.log(red(`  - ${error}`));
      });
    });

    process.exit(1);
  } else {
    console.log(green('\nAll files passed pattern validation!'));
  }
}

/**
 * @pattern MetricsCollection
 * @rule ComplianceTracking
 * Collect and report pattern compliance metrics
 */
function collectMetrics(results) {
  const totalFiles = results.length;
  const validFiles = results.filter((r) => r.valid).length;
  const complianceRate = (validFiles / totalFiles) * 100;

  const patternCounts = {};
  const ruleCounts = {};

  results.forEach((result) => {
    if (result.patterns) {
      result.patterns.forEach((pattern) => {
        patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
      });
    }

    if (result.rules) {
      result.rules.forEach((rule) => {
        ruleCounts[rule] = (ruleCounts[rule] || 0) + 1;
      });
    }
  });

  console.log(blue('\nPattern Compliance Metrics:'));
  console.log(blue(`Overall compliance rate: ${complianceRate.toFixed(2)}%`));

  console.log(blue('\nTop 5 Patterns:'));
  Object.entries(patternCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([pattern, count]) => {
      console.log(blue(`  ${pattern}: ${count} uses`));
    });

  console.log(blue('\nTop 5 Rules:'));
  Object.entries(ruleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([rule, count]) => {
      console.log(blue(`  ${rule}: ${count} uses`));
    });
}

/**
 * @pattern MainExecution
 * @rule OrganizedFlow
 * Main execution flow
 */
function main() {
  console.log(blue('Starting pattern validation...'));

  // Load patterns and rules
  loadPatternsAndRules();

  // Scan directory for files
  const files = scanDirectory();

  // Validate files
  const results = files.map((file) => {
    const result = validateFile(file);
    return {
      file,
      ...result,
    };
  });

  // Report results
  reportResults(results);

  // Collect metrics
  collectMetrics(results);
}

// Run the script
main();
