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

  test('memory impact within limits', () => {
    const startHeap = process.memoryUsage().heapUsed;

    // Simulate heavy usage
    for (let i = 0; i < 10000; i++) {
      const end = collector.trackRender(`Component${i}`);
      end();
      if (i % 100 === 0) collector.trackMemory();
      collector.trackNetwork(`/api/${i}`).complete(200);
    }

    const heapImpact = process.memoryUsage().heapUsed - startHeap;

    // Requirement: Memory impact < 1MB
    expect(heapImpact).toBeLessThan(1024 * 1024);
  });

  test('no memory leaks during continuous operation', async () => {
    const iterations = 100;
    const samples: number[] = [];

    // Run multiple collection cycles and check memory usage
    for (let i = 0; i < iterations; i++) {
      // Simulate component lifecycle
      const end = collector.trackRender(`Component${i}`);
      collector.trackMemory();
      collector.trackNetwork(`/api/${i}`).complete(200);
      end();

      if (i % 10 === 0) {
        collector.clearMetrics(); // Simulate periodic cleanup
        samples.push(process.memoryUsage().heapUsed);
      }

      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    // Calculate memory growth rate
    const memoryGrowth = samples[samples.length - 1] - samples[0];
    const averageGrowthPerOperation = memoryGrowth / iterations;

    // Memory growth should be minimal
    expect(averageGrowthPerOperation).toBeLessThan(100); // Less than 100 bytes per operation
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
