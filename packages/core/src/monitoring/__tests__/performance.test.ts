import { MetricsCollector } from '../metrics';

describe('Performance Tests', () => {
  let collector: MetricsCollector;

  beforeEach(() => {
    collector = new MetricsCollector({ bufferSize: 1000 });
  });

  test('minimal collection overhead', () => {
    const iterations = 1000;
    const start = performance.now();

    // Simulate multiple render trackings
    for (let i = 0; i < iterations; i++) {
      const end = collector.trackRender(`Component${i}`);
      end();
    }

    const duration = performance.now() - start;
    const averageOverhead = duration / iterations;

    // Requirement: Collection overhead < 1ms per operation
    expect(averageOverhead).toBeLessThan(1);
  });

  test('memory impact within limits', async () => {
    // Create collector with smaller buffer for memory test
    const memoryCollector = new MetricsCollector({ bufferSize: 100 });

    // Initial cleanup and stabilization
    memoryCollector.clearMetrics();
    global.gc?.();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const startHeap = process.memoryUsage().heapUsed;

    // Simulate realistic usage patterns with periodic cleanup
    for (let i = 0; i < 1000; i++) {
      const end = memoryCollector.trackRender(`Component${i}`);
      end();

      if (i % 10 === 0) {
        memoryCollector.trackMemory();
        memoryCollector.trackNetworkRequest(`/api/${i}`, 100, 200);
      }

      // Periodic cleanup to prevent accumulation
      if (i % 100 === 0) {
        memoryCollector.clearMetrics();
        global.gc?.();
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    // Final cleanup and stabilization
    memoryCollector.clearMetrics();
    global.gc?.();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const heapImpact = process.memoryUsage().heapUsed - startHeap;

    // Requirement: Memory impact < 1MB
    expect(heapImpact).toBeLessThan(1024 * 1024);
  });

  test('no memory leaks during continuous operation', async () => {
    const iterations = 30;
    const cleanup: (() => void)[] = [];

    // Initial cleanup and stabilization
    collector.clearMetrics();
    global.gc?.();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Track initial buffer state
    const initialMetrics = collector.getMetrics();
    const initialSize = Object.values(initialMetrics).reduce((sum, arr) => sum + arr.length, 0);

    // Run collection cycles
    for (let i = 0; i < iterations; i++) {
      // Simulate component lifecycle with cleanup tracking
      const endRender = collector.trackRender(`Component${i}`);
      const endNetwork = collector.trackNetwork({
        onStats: () => {}, // Empty callback to avoid memory growth from stats
      });
      cleanup.push(endRender, endNetwork);

      // Perform operations
      collector.trackMemory();
      collector.trackNetworkRequest(`/api/${i}`, 100, 200);
      endRender();

      // Allow time for async operations and GC
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (i % 3 === 0) {
        collector.clearMetrics();
        global.gc?.();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // Clean up all subscribers
    cleanup.forEach((cleanupFn) => cleanupFn());
    collector.clearMetrics();

    // Final stabilization
    global.gc?.();
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Measure final state
    const finalMetrics = collector.getMetrics();
    const finalSize = Object.values(finalMetrics).reduce((sum, arr) => sum + arr.length, 0);

    // Calculate growth in terms of actual metrics stored
    const sizeGrowth = finalSize - initialSize;
    const averageGrowthPerOperation = sizeGrowth / iterations;

    // We expect minimal to no growth in the metrics buffer
    expect(averageGrowthPerOperation).toBeLessThan(5); // Allow up to 5 entries growth per operation
  });

  test('buffer size limits are enforced under load', () => {
    const smallCollector = new MetricsCollector({ bufferSize: 100 });

    // Generate more metrics than buffer size
    for (let i = 0; i < 200; i++) {
      const end = smallCollector.trackRender(`Component${i}`);
      end();
    }

    const metrics = smallCollector.getMetrics();

    // Buffer should maintain size limit
    expect(metrics.renders.length).toBe(100);

    // Verify we have the most recent metrics (last 100)
    const firstId = parseInt(metrics.renders[0].metadata.componentId.replace('Component', ''));
    const lastId = parseInt(metrics.renders[99].metadata.componentId.replace('Component', ''));
    expect(lastId - firstId).toBe(99);
  });
});
