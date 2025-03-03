import { monitor, PerformanceMonitor } from '../index';

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    monitor.clearMetrics();
  });

  it('should track component renders', () => {
    monitor.trackRender('TestComponent', 100);
    const metrics = monitor.getMetrics();

    expect(metrics).toHaveLength(1);
    expect(metrics[0]).toMatchObject({
      name: 'component_render',
      component: 'TestComponent',
      value: 100,
    });
  });

  it('should track interactions', () => {
    monitor.trackInteraction('TestComponent', 'click', 50);
    const metrics = monitor.getMetrics();

    expect(metrics).toHaveLength(1);
    expect(metrics[0]).toMatchObject({
      name: 'interaction',
      component: 'TestComponent',
      value: 50,
      metadata: { type: 'click' },
    });
  });

  it('should support custom metrics', () => {
    monitor.addCustomMetric('custom_event', 200, { tag: 'test' });
    const metrics = monitor.getMetrics();

    expect(metrics).toHaveLength(1);
    expect(metrics[0]).toMatchObject({
      name: 'custom_event',
      value: 200,
      metadata: { tag: 'test' },
    });
  });

  it('should respect sample rate', () => {
    // Set up spy before creating monitor instance
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.9);

    // Create options
    const options = { sampleRate: 0.5 };

    // Reset instance with options
    PerformanceMonitor.resetInstance(options);

    // Get the instance (should use the same options)
    const monitor = PerformanceMonitor.getInstance();
    monitor.trackRender('TestComponent', 100);

    expect(monitor.getMetrics()).toHaveLength(0);

    // Cleanup
    randomSpy.mockRestore();
    PerformanceMonitor.resetInstance();
  });

  it('should handle invalid inputs', () => {
    // Test with invalid values
    expect(() => monitor.trackRender('', -100)).not.toThrow();
    expect(() => monitor.trackInteraction('Component', '', -50)).not.toThrow();
    expect(() => monitor.addCustomMetric('', -200, {})).not.toThrow();

    // Test with very large values
    expect(() => monitor.trackRender('Test', Number.MAX_VALUE)).not.toThrow();
    expect(() => monitor.trackInteraction('Test', 'click', Number.MAX_VALUE)).not.toThrow();

    const metrics = monitor.getMetrics();
    expect(metrics).toHaveLength(0); // Invalid metrics should be ignored
  });

  it('should handle undefined metadata', () => {
    monitor.addCustomMetric('test_event', 100, undefined);
    const metrics = monitor.getMetrics();

    expect(metrics).toHaveLength(1);
    expect(metrics[0].metadata).toEqual({});
  });

  it('should clear metrics', () => {
    monitor.trackRender('TestComponent', 100);
    expect(monitor.getMetrics()).toHaveLength(1);

    monitor.clearMetrics();
    expect(monitor.getMetrics()).toHaveLength(0);
  });

  // Reset singleton instance after each test
  afterEach(() => {
    // Assuming there's a reset method on PerformanceMonitor
    PerformanceMonitor.resetInstance();
  });
});
