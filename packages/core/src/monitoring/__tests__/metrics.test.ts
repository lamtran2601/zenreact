import { MetricsCollector, MetricsBuffer } from '../metrics';

describe('MetricsBuffer', () => {
  let buffer: MetricsBuffer;

  beforeEach(() => {
    buffer = new MetricsBuffer(2); // Small size for testing
  });

  test('respects buffer size limit', () => {
    buffer.push({ id: '1', timestamp: 1, type: 'render', value: 1 });
    buffer.push({ id: '2', timestamp: 2, type: 'render', value: 2 });
    buffer.push({ id: '3', timestamp: 3, type: 'render', value: 3 });

    const data = buffer.getData();
    expect(data.length).toBe(2);
    expect(data[0].id).toBe('2'); // First item should be removed
    expect(data[1].id).toBe('3');
  });

  test('clear removes all data', () => {
    buffer.push({ id: '1', timestamp: 1, type: 'render', value: 1 });
    buffer.clear();
    expect(buffer.getData().length).toBe(0);
  });
});

describe('MetricsCollector', () => {
  let collector: MetricsCollector;
  let originalPerformanceNow: () => number;

  beforeEach(() => {
    collector = new MetricsCollector({ bufferSize: 1000 });
    originalPerformanceNow = performance.now;
    let time = 0;
    performance.now = jest.fn(() => (time += 100));
  });

  afterEach(() => {
    performance.now = originalPerformanceNow;
  });

  describe('render tracking', () => {
    test('tracks render time', () => {
      const end = collector.trackRender('TestComponent');
      end();

      const metrics = collector.getMetrics();
      expect(metrics.renders.length).toBe(1);
      expect(metrics.renders[0].value).toBe(100);
      expect(metrics.renders[0].metadata.componentId).toBe('TestComponent');
    });

    test('does not track when disabled', () => {
      collector.disable();
      const end = collector.trackRender('TestComponent');
      end();

      const metrics = collector.getMetrics();
      expect(metrics.renders.length).toBe(0);
    });
  });

  describe('network tracking', () => {
    test('tracks network call duration', () => {
      let receivedStats: { requests: number; errors: number; averageTime: number } | undefined;
      const unsubscribe = collector.trackNetwork({
        urlPattern: /api\.example\.com/,
        onStats: (stats) => {
          receivedStats = stats;
        },
      });

      // Simulate a network request using proper network tracking
      collector.trackNetworkRequest('https://api.example.com', 100, 200);

      // Verify the onStats callback was called with correct stats
      expect(receivedStats).toBeDefined();
      if (!receivedStats) throw new Error('Stats should be defined');

      expect(receivedStats.requests).toBe(1);
      expect(receivedStats.errors).toBe(0);
      expect(receivedStats.averageTime).toBe(100);

      unsubscribe(); // Clean up subscription
    });
  });

  describe('memory tracking', () => {
    test('tracks memory usage', () => {
      collector.trackMemory();

      const metrics = collector.getMetrics();
      expect(metrics.memory.length).toBe(1);
      expect(metrics.memory[0].metadata).toHaveProperty('heapUsed');
      expect(metrics.memory[0].metadata).toHaveProperty('heapTotal');
    });
  });

  describe('metrics management', () => {
    test('clearMetrics removes all metrics', () => {
      const end = collector.trackRender('TestComponent');
      end();
      collector.trackMemory();

      collector.clearMetrics();
      const metrics = collector.getMetrics();

      expect(metrics.renders.length).toBe(0);
      expect(metrics.memory.length).toBe(0);
      expect(metrics.network.length).toBe(0);
    });

    test('enable/disable controls collection', () => {
      collector.disable();
      const end = collector.trackRender('TestComponent');
      end();

      let metrics = collector.getMetrics();
      expect(metrics.renders.length).toBe(0);

      collector.enable();
      const end2 = collector.trackRender('TestComponent');
      end2();

      metrics = collector.getMetrics();
      expect(metrics.renders.length).toBe(1);
    });
  });
});
