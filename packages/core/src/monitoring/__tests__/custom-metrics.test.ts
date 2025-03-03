import { MetricsCollector } from '../metrics';
import { CustomMetricsManager } from '../custom-metrics';

describe('CustomMetricsManager', () => {
  let collector: MetricsCollector;
  let customMetrics: CustomMetricsManager;

  beforeEach(() => {
    collector = new MetricsCollector();
    customMetrics = new CustomMetricsManager(collector);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('basic tracking', () => {
    test('tracks custom metrics with name and value', () => {
      customMetrics.track({
        name: 'test_metric',
        value: 42,
      });

      const metrics = collector.getMetrics();
      expect(metrics.custom).toHaveLength(1);
      expect(metrics.custom[0].metadata.name).toBe('test_metric');
      expect(metrics.custom[0].value).toBe(42);
    });

    test('includes optional tags', () => {
      customMetrics.track({
        name: 'test_metric',
        value: 42,
        tags: { env: 'test', region: 'us-east' },
      });

      const metrics = collector.getMetrics();
      expect(metrics.custom[0].metadata.tags).toEqual({
        env: 'test',
        region: 'us-east',
      });
    });
  });

  describe('timer', () => {
    test('measures duration correctly', () => {
      const timer = customMetrics.createTimer('operation_time', { type: 'query' });

      // Simulate time passing
      jest.advanceTimersByTime(100);

      const duration = timer.stop();
      expect(duration).toBe(100);

      const metrics = collector.getMetrics();
      expect(metrics.custom).toHaveLength(1);
      expect(metrics.custom[0].metadata.name).toBe('operation_time_duration');
      expect(metrics.custom[0].value).toBe(100);
      expect(metrics.custom[0].metadata.tags).toEqual({ type: 'query' });
    });
  });

  describe('gauge', () => {
    test('tracks current value', () => {
      const gauge = customMetrics.createGauge('queue_size', { queue: 'mail' });

      gauge.setValue(5);
      gauge.setValue(10);
      gauge.setValue(3);

      const metrics = collector.getMetrics();
      expect(metrics.custom).toHaveLength(3);
      expect(metrics.custom.map((m) => m.value)).toEqual([5, 10, 3]);
      expect(metrics.custom[0].metadata.tags).toEqual({ queue: 'mail' });
    });
  });

  describe('counter', () => {
    test('tracks incremental values', () => {
      const counter = customMetrics.createCounter('error_count', { service: 'api' });

      counter.increment(); // Default increment by 1
      counter.increment(2);
      counter.increment(5);

      const metrics = collector.getMetrics();
      expect(metrics.custom).toHaveLength(3);
      expect(metrics.custom.map((m) => m.value)).toEqual([1, 2, 5]);
      expect(metrics.custom[0].metadata.tags).toEqual({ service: 'api' });
    });

    test('handles zero and negative increments', () => {
      const counter = customMetrics.createCounter('test_counter');

      counter.increment(0);
      counter.increment(-1);

      const metrics = collector.getMetrics();
      expect(metrics.custom).toHaveLength(2);
      expect(metrics.custom.map((m) => m.value)).toEqual([0, -1]);
    });
  });

  test('metrics are disabled when collector is disabled', () => {
    collector.disable();

    const counter = customMetrics.createCounter('test_counter');
    counter.increment();

    const gauge = customMetrics.createGauge('test_gauge');
    gauge.setValue(5);

    const timer = customMetrics.createTimer('test_timer');
    timer.stop();

    customMetrics.track({ name: 'test', value: 1 });

    const metrics = collector.getMetrics();
    expect(metrics.custom).toHaveLength(0);
  });
});
