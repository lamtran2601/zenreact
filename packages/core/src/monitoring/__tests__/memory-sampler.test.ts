import { MetricsCollector } from '../metrics';
import { MemorySampler } from '../memory-sampler';

describe('MemorySampler', () => {
  let collector: MetricsCollector;
  let sampler: MemorySampler;

  beforeEach(() => {
    collector = new MetricsCollector({ bufferSize: 1000 });
    jest.useFakeTimers();
  });

  afterEach(() => {
    sampler?.destroy();
    jest.useRealTimers();
  });

  test('starts sampling when enabled', () => {
    sampler = new MemorySampler({
      collector,
      enabled: true,
      intervalMs: 1000,
    });

    // Should have initial sample
    expect(collector.getMetrics().memory.length).toBe(1);

    // Advance timer and check for new samples
    jest.advanceTimersByTime(2000);
    expect(collector.getMetrics().memory.length).toBe(3);
  });

  test('does not sample when disabled', () => {
    sampler = new MemorySampler({
      collector,
      enabled: false,
      intervalMs: 1000,
    });

    jest.advanceTimersByTime(2000);
    expect(collector.getMetrics().memory.length).toBe(0);
  });

  test('can be stopped and started', () => {
    sampler = new MemorySampler({
      collector,
      enabled: true,
      intervalMs: 1000,
    });

    // Initial sample + 1 interval
    jest.advanceTimersByTime(1000);
    expect(collector.getMetrics().memory.length).toBe(2);

    sampler.stop();
    jest.advanceTimersByTime(2000);
    const samplesAfterStop = collector.getMetrics().memory.length;

    sampler.start();
    // Should get new initial sample
    expect(collector.getMetrics().memory.length).toBe(samplesAfterStop + 1);

    jest.advanceTimersByTime(1000);
    expect(collector.getMetrics().memory.length).toBe(samplesAfterStop + 2);
  });

  test('cleanup stops sampling', () => {
    sampler = new MemorySampler({
      collector,
      enabled: true,
      intervalMs: 1000,
    });

    jest.advanceTimersByTime(1000);
    expect(collector.getMetrics().memory.length).toBe(2);

    sampler.destroy();
    jest.advanceTimersByTime(2000);
    expect(collector.getMetrics().memory.length).toBe(2); // No new samples
  });

  test('uses default interval when not specified', () => {
    sampler = new MemorySampler({ collector });

    // Default interval is 60000ms (1 minute)
    jest.advanceTimersByTime(60000);
    // Initial sample + 1 interval
    expect(collector.getMetrics().memory.length).toBe(2);
  });

  test('multiple starts do not create multiple intervals', () => {
    sampler = new MemorySampler({
      collector,
      intervalMs: 1000,
    });

    sampler.start(); // Already started by constructor
    sampler.start(); // Should not create another interval

    jest.advanceTimersByTime(1000);
    // Should only have initial sample + 1 interval
    expect(collector.getMetrics().memory.length).toBe(2);
  });
});
