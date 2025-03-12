#!/usr/bin/env node

/**
 * @pattern PerformanceReporting
 * @rule BuildPerformanceAnalysis
 * Script to generate a comprehensive performance report
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  statsFile: path.resolve(__dirname, '../dist/stats.json'),
  buildLogFile: path.resolve(__dirname, '../dist/build-log.json'),
  outputFile: path.resolve(__dirname, '../dist/performance-report.json'),
  thresholds: {
    bundleSize: {
      total: 1000 * 1024, // 1000KB max total bundle size
      individual: 250 * 1024, // 250KB max individual chunk size
    },
    buildTime: 60 * 1000, // 60 seconds max build time
  },
};

/**
 * @pattern MetricCollection
 * @rule PerformanceDataCollection
 * Collect performance metrics from various sources
 */
async function collectMetrics() {
  console.log(chalk.blue('Collecting performance metrics...'));

  const metrics = {
    bundleSize: {
      total: 0,
      chunks: {},
    },
    buildTime: 0,
    timestamp: Date.now(),
  };

  // Read stats file if it exists
  if (fs.existsSync(config.statsFile)) {
    const stats = JSON.parse(fs.readFileSync(config.statsFile, 'utf8'));

    // Collect bundle size metrics
    stats.assets.forEach((asset) => {
      if (asset.name.endsWith('.js') || asset.name.endsWith('.css')) {
        metrics.bundleSize.chunks[asset.name] = asset.size;
        metrics.bundleSize.total += asset.size;
      }
    });

    console.log(
      chalk.green(`Total bundle size: ${(metrics.bundleSize.total / 1024).toFixed(2)}KB`)
    );
  } else {
    console.log(chalk.yellow('Stats file not found. Bundle size metrics not available.'));
  }

  // Read build log if it exists
  if (fs.existsSync(config.buildLogFile)) {
    const buildLog = JSON.parse(fs.readFileSync(config.buildLogFile, 'utf8'));
    metrics.buildTime = buildLog.duration;

    console.log(chalk.green(`Build time: ${(metrics.buildTime / 1000).toFixed(2)}s`));
  } else {
    console.log(chalk.yellow('Build log not found. Build time metrics not available.'));
  }

  return metrics;
}

/**
 * @pattern MetricAnalysis
 * @rule PerformanceEvaluation
 * Analyze metrics against thresholds
 */
function analyzeMetrics(metrics) {
  console.log(chalk.blue('Analyzing performance metrics...'));

  const analysis = {
    bundleSize: {
      status: 'pass',
      details: {},
    },
    buildTime: {
      status: 'pass',
      details: {},
    },
    timestamp: Date.now(),
  };

  // Analyze bundle size
  if (metrics.bundleSize.total > config.thresholds.bundleSize.total) {
    analysis.bundleSize.status = 'fail';
    analysis.bundleSize.details.totalSize = {
      actual: metrics.bundleSize.total,
      threshold: config.thresholds.bundleSize.total,
      message: `Total bundle size (${(metrics.bundleSize.total / 1024).toFixed(2)}KB) exceeds threshold (${(config.thresholds.bundleSize.total / 1024).toFixed(2)}KB)`,
    };
  }

  // Check individual chunks
  Object.entries(metrics.bundleSize.chunks).forEach(([name, size]) => {
    if (size > config.thresholds.bundleSize.individual) {
      analysis.bundleSize.status = 'fail';
      analysis.bundleSize.details[name] = {
        actual: size,
        threshold: config.thresholds.bundleSize.individual,
        message: `Chunk "${name}" (${(size / 1024).toFixed(2)}KB) exceeds threshold (${(config.thresholds.bundleSize.individual / 1024).toFixed(2)}KB)`,
      };
    }
  });

  // Analyze build time
  if (metrics.buildTime > config.thresholds.buildTime) {
    analysis.buildTime.status = 'fail';
    analysis.buildTime.details.duration = {
      actual: metrics.buildTime,
      threshold: config.thresholds.buildTime,
      message: `Build time (${(metrics.buildTime / 1000).toFixed(2)}s) exceeds threshold (${(config.thresholds.buildTime / 1000).toFixed(2)}s)`,
    };
  }

  return analysis;
}

/**
 * @pattern ReportGeneration
 * @rule PerformanceReporting
 * Generate a comprehensive performance report
 */
function generateReport(metrics, analysis) {
  console.log(chalk.blue('Generating performance report...'));

  const report = {
    metrics,
    analysis,
    summary: {
      status: 'pass',
      issues: [],
    },
    timestamp: Date.now(),
  };

  // Generate summary
  if (analysis.bundleSize.status === 'fail') {
    report.summary.status = 'fail';
    Object.values(analysis.bundleSize.details).forEach((detail) => {
      report.summary.issues.push(detail.message);
    });
  }

  if (analysis.buildTime.status === 'fail') {
    report.summary.status = 'fail';
    Object.values(analysis.buildTime.details).forEach((detail) => {
      report.summary.issues.push(detail.message);
    });
  }

  // Write report to file
  fs.writeFileSync(config.outputFile, JSON.stringify(report, null, 2));

  console.log(chalk.green(`Performance report generated at ${config.outputFile}`));

  // Log summary
  if (report.summary.status === 'pass') {
    console.log(chalk.green('✅ All performance metrics are within acceptable thresholds.'));
  } else {
    console.log(chalk.red('❌ Some performance metrics exceed thresholds:'));
    report.summary.issues.forEach((issue) => {
      console.log(chalk.red(`  - ${issue}`));
    });
  }

  return report;
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
 * @rule ScriptExecution
 * Main execution flow
 */
async function main() {
  try {
    console.log(chalk.blue('Generating performance report...'));

    // Check if we're in development mode and need mock data
    if (process.env.NODE_ENV !== 'production' && !fs.existsSync(config.statsFile)) {
      generateMockStats();
    }

    const metrics = await collectMetrics();
    const analysis = analyzeMetrics(metrics);
    const report = generateReport(metrics, analysis);

    // Exit with appropriate code
    if (report.summary.status === 'fail') {
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('Error generating performance report:'), error);
    process.exit(1);
  }
}

// Run the script
main();
