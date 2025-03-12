#!/usr/bin/env node

/**
 * @pattern PerformanceChecking
 * @rule BuildTimeValidation
 * Script to check performance metrics during the build process
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  thresholds: {
    bundleSize: {
      total: 1000 * 1024, // 1000KB max total bundle size
      individual: 250 * 1024, // 250KB max individual chunk size
    },
    buildTime: 60 * 1000, // 60 seconds max build time
  },
  statsFile: path.resolve(__dirname, '../dist/stats.json'),
  buildLogFile: path.resolve(__dirname, '../dist/build-log.json'),
};

/**
 * @pattern MetricValidation
 * @rule ThresholdChecking
 * Check if metrics are within acceptable thresholds
 */
function checkMetrics() {
  console.log(chalk.blue('Checking performance metrics...'));

  // Check if stats file exists
  if (!fs.existsSync(config.statsFile)) {
    console.error(chalk.red('Stats file not found. Run build with stats generation first.'));
    process.exit(1);
  }

  // Read stats file
  const stats = JSON.parse(fs.readFileSync(config.statsFile, 'utf8'));

  // Check bundle sizes
  const bundleSizes = {};
  let totalSize = 0;

  stats.assets.forEach((asset) => {
    if (asset.name.endsWith('.js') || asset.name.endsWith('.css')) {
      bundleSizes[asset.name] = asset.size;
      totalSize += asset.size;
    }
  });

  // Check build time if log exists
  let buildTime = null;
  if (fs.existsSync(config.buildLogFile)) {
    const buildLog = JSON.parse(fs.readFileSync(config.buildLogFile, 'utf8'));
    buildTime = buildLog.duration;
  }

  // Report results
  console.log(chalk.blue('\nPerformance Check Results:'));

  // Bundle size check
  const totalSizeKB = (totalSize / 1024).toFixed(2);
  const totalSizeStatus = totalSize <= config.thresholds.bundleSize.total;

  console.log(
    `Total bundle size: ${totalSizeKB}KB ${totalSizeStatus ? chalk.green('✓') : chalk.red('✗')} ` +
      `(threshold: ${(config.thresholds.bundleSize.total / 1024).toFixed(2)}KB)`
  );

  // Individual bundle checks
  let hasLargeChunks = false;
  Object.entries(bundleSizes).forEach(([name, size]) => {
    const sizeKB = (size / 1024).toFixed(2);
    const status = size <= config.thresholds.bundleSize.individual;

    if (!status) {
      hasLargeChunks = true;
      console.log(
        `  ${name}: ${sizeKB}KB ${chalk.red('✗')} ` +
          `(threshold: ${(config.thresholds.bundleSize.individual / 1024).toFixed(2)}KB)`
      );
    }
  });

  if (!hasLargeChunks) {
    console.log(chalk.green('  All individual chunks are within size limits'));
  }

  // Build time check
  if (buildTime !== null) {
    const buildTimeSeconds = (buildTime / 1000).toFixed(2);
    const buildTimeStatus = buildTime <= config.thresholds.buildTime;

    console.log(
      `Build time: ${buildTimeSeconds}s ${buildTimeStatus ? chalk.green('✓') : chalk.red('✗')} ` +
        `(threshold: ${(config.thresholds.buildTime / 1000).toFixed(2)}s)`
    );
  } else {
    console.log(chalk.yellow('Build time information not available'));
  }

  // Overall status
  const overallStatus =
    totalSizeStatus &&
    !hasLargeChunks &&
    (buildTime === null || buildTime <= config.thresholds.buildTime);

  console.log(
    '\n' +
      (overallStatus
        ? chalk.green('✅ All performance checks passed!')
        : chalk.red('❌ Some performance checks failed!'))
  );

  if (!overallStatus) {
    console.log(chalk.yellow('\nRecommendations:'));

    if (!totalSizeStatus) {
      console.log(chalk.yellow('- Optimize bundle size with code splitting and tree shaking'));
      console.log(chalk.yellow('- Remove unused dependencies'));
      console.log(chalk.yellow('- Consider using dynamic imports for large components'));
    }

    if (hasLargeChunks) {
      console.log(chalk.yellow('- Split large chunks into smaller ones'));
      console.log(chalk.yellow('- Optimize images and other assets'));
      console.log(chalk.yellow('- Use lazy loading for large components'));
    }

    if (buildTime !== null && buildTime > config.thresholds.buildTime) {
      console.log(chalk.yellow('- Optimize build configuration'));
      console.log(chalk.yellow('- Consider using incremental builds'));
      console.log(chalk.yellow('- Reduce the number of plugins and loaders'));
    }

    process.exit(1);
  }
}

/**
 * @pattern MockData
 * @rule DevelopmentTesting
 * Generate mock stats for development testing
 */
function generateMockStats() {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  // Create dist directory if it doesn't exist
  const distDir = path.dirname(config.statsFile);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate mock stats
  const mockStats = {
    assets: [
      { name: 'main.js', size: 200 * 1024 },
      { name: 'vendor.js', size: 150 * 1024 },
      { name: 'styles.css', size: 50 * 1024 },
    ],
  };

  // Generate mock build log
  const mockBuildLog = {
    duration: 45 * 1000, // 45 seconds
    timestamp: Date.now(),
  };

  // Write mock files
  fs.writeFileSync(config.statsFile, JSON.stringify(mockStats, null, 2));
  fs.writeFileSync(config.buildLogFile, JSON.stringify(mockBuildLog, null, 2));

  console.log(chalk.yellow('Generated mock stats for development testing'));
}

/**
 * @pattern MainExecution
 * @rule OrganizedFlow
 * Main execution flow
 */
function main() {
  // Check if we're in development mode and need mock data
  if (process.env.NODE_ENV !== 'production' && !fs.existsSync(config.statsFile)) {
    generateMockStats();
  }

  // Check metrics
  checkMetrics();
}

// Run the script
main();
