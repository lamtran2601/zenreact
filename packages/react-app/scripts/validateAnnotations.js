#!/usr/bin/env node

/**
 * @pattern AnnotationValidation
 * @rule ComponentCompliance
 * Script to validate component annotations for pattern compliance
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  componentsDir: path.resolve(__dirname, '../src/components'),
  storeDir: path.resolve(__dirname, '../src/store'),
  hooksDir: path.resolve(__dirname, '../src/hooks'),
  utilsDir: path.resolve(__dirname, '../src/utils'),
  fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  requiredAnnotations: {
    components: ['@pattern', '@rule'],
    store: ['@pattern', '@rule'],
    hooks: ['@pattern', '@rule'],
    utils: ['@pattern'],
  },
};

/**
 * @pattern FileScanning
 * @rule EfficientIO
 * Scan directories for files to validate
 */
function scanDirectories() {
  console.log(chalk.blue('Scanning directories for files...'));

  const files = {
    components: glob.sync(
      `${config.componentsDir}/**/*.{${config.fileExtensions.map((ext) => ext.slice(1)).join(',')}}`
    ),
    store: glob.sync(
      `${config.storeDir}/**/*.{${config.fileExtensions.map((ext) => ext.slice(1)).join(',')}}`
    ),
    hooks: glob.sync(
      `${config.hooksDir}/**/*.{${config.fileExtensions.map((ext) => ext.slice(1)).join(',')}}`
    ),
    utils: glob.sync(
      `${config.utilsDir}/**/*.{${config.fileExtensions.map((ext) => ext.slice(1)).join(',')}}`
    ),
  };

  const totalFiles = Object.values(files).reduce((acc, arr) => acc + arr.length, 0);
  console.log(chalk.green(`Found ${totalFiles} files to validate`));

  return files;
}

/**
 * @pattern AnnotationChecking
 * @rule PatternValidation
 * Check if a file has the required annotations
 */
function checkAnnotations(filePath, requiredAnnotations) {
  const content = fs.readFileSync(filePath, 'utf8');
  const missingAnnotations = [];

  requiredAnnotations.forEach((annotation) => {
    if (!content.includes(annotation)) {
      missingAnnotations.push(annotation);
    }
  });

  return {
    valid: missingAnnotations.length === 0,
    missingAnnotations,
  };
}

/**
 * @pattern ResultsReporting
 * @rule ClearOutput
 * Report validation results
 */
function reportResults(results) {
  console.log(chalk.blue('\nAnnotation Validation Results:'));

  let totalFiles = 0;
  let validFiles = 0;

  Object.entries(results).forEach(([category, categoryResults]) => {
    const categoryTotal = categoryResults.length;
    const categoryValid = categoryResults.filter((r) => r.valid).length;

    totalFiles += categoryTotal;
    validFiles += categoryValid;

    console.log(
      chalk.blue(`\n${category.toUpperCase()} (${categoryValid}/${categoryTotal} valid):`)
    );

    const invalidResults = categoryResults.filter((r) => !r.valid);

    if (invalidResults.length === 0) {
      console.log(chalk.green('  All files have required annotations'));
    } else {
      invalidResults.forEach((result) => {
        console.log(chalk.red(`  ${result.file}:`));
        console.log(chalk.red(`    Missing annotations: ${result.missingAnnotations.join(', ')}`));
      });
    }
  });

  const complianceRate = (validFiles / totalFiles) * 100;

  console.log(chalk.blue(`\nOverall compliance rate: ${complianceRate.toFixed(2)}%`));

  if (validFiles === totalFiles) {
    console.log(chalk.green('\n✅ All files have required annotations!'));
    return true;
  } else {
    console.log(
      chalk.red(`\n❌ ${totalFiles - validFiles} files are missing required annotations!`)
    );
    return false;
  }
}

/**
 * @pattern MainExecution
 * @rule OrganizedFlow
 * Main execution flow
 */
function main() {
  console.log(chalk.blue('Starting annotation validation...'));

  // Scan directories for files
  const files = scanDirectories();

  // Check annotations for each file
  const results = {};

  Object.entries(files).forEach(([category, categoryFiles]) => {
    results[category] = categoryFiles.map((file) => {
      const requiredAnnotations = config.requiredAnnotations[category] || [];
      const result = checkAnnotations(file, requiredAnnotations);

      return {
        file: path.relative(process.cwd(), file),
        valid: result.valid,
        missingAnnotations: result.missingAnnotations,
      };
    });
  });

  // Report results
  const success = reportResults(results);

  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}

// Run the script
main();
