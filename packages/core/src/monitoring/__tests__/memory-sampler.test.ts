import { MetricsCollector } from '../metrics';
import { MemorySampler } from '../memory-sampler';

describe('MemorySampler', () => {
  let collector: MetricsCollector;
  let sampler: MemorySampler;

  beforeEach(() => {
    // Enable fake timers for each test
    jest.useFakeTimers({ doNotFake: ['nextTick', 'queueMicrotask'] });

    // Mock process.memoryUsage for Node environment
    const mockMemoryUsage = {
      heapUsed: 1000000,
      heapTotal: 2000000,
    };

    jest.spyOn(process, 'memoryUsage').mockImplementation(() => ({
      heapUsed: mockMemoryUsage.heapUsed,
      heapTotal: mockMemoryUsage.heapTotal,
      external: 0,
      arrayBuffers: 0,
      rss: 0,
    }));

    collector = new MetricsCollector({ bufferSize: 1000 });
  });

  afterEach(() => {
    sampler?.destroy();
    jest.runOnlyPendingTimers(); // Flush any remaining timers
  });

  test('starts sampling when enabled', () => {
    sampler = new MemorySampler({
      collector,
      enabled: true,
      intervalMs: 1000,
    });

    // Should have initial sample
    expect(collector.getMetrics().memory.length).toBe(1);

    // Run pending timers and check for new samples
    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(2);

    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(3);
  });

  test('does not sample when disabled', () => {
    sampler = new MemorySampler({
      collector,
      enabled: false,
      intervalMs: 1000,
    });

    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(0);
  });

  test('can be stopped and started', () => {
    sampler = new MemorySampler({
      collector,
      enabled: true,
      intervalMs: 1000,
    });

    // Initial sample + 1 interval
    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(2);

    sampler.stop();
    jest.runOnlyPendingTimers();
    const samplesAfterStop = collector.getMetrics().memory.length;

    sampler.start();
    // Should get new initial sample
    expect(collector.getMetrics().memory.length).toBe(samplesAfterStop + 1);

    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(samplesAfterStop + 2);
  });

  test('cleanup stops sampling', () => {
    sampler = new MemorySampler({
      collector,
      enabled: true,
      intervalMs: 1000,
    });

    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(2);

    sampler.destroy();
    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(2); // No new samples
  });

  test('uses default interval when not specified', () => {
    sampler = new MemorySampler({ collector });

    // Should have initial sample
    expect(collector.getMetrics().memory.length).toBe(1);

    // Run one interval
    jest.runOnlyPendingTimers();
    expect(collector.getMetrics().memory.length).toBe(2);
  });

  test('multiple starts do not create multiple intervals', () => {
    sampler = new MemorySampler({
      collector,
      intervalMs: 1000,
    });

    sampler.start(); // Already started by constructor
    sampler.start(); // Should not create another interval

    jest.runOnlyPendingTimers();
    // Should only have initial sample + 1 interval
    expect(collector.getMetrics().memory.length).toBe(2);
  });
});
