import { PerformanceMonitor } from '../index';

describe('PerformanceMonitor', () => {
  let testMonitor: PerformanceMonitor;

  beforeEach(() => {
    PerformanceMonitor.resetInstance();
    testMonitor = PerformanceMonitor.getInstance();
  });

  it('should track component renders', () => {
    testMonitor.trackRender('TestComponent', 100);
    const metrics = testMonitor.getMetrics();

    expect(metrics.renders).toHaveLength(1);
    expect(metrics.renders[0]).toMatchObject({
      type: 'render',
      value: 100,
      metadata: {
        componentId: 'TestComponent',
      },
    });
  });

  it('should track interactions', () => {
    testMonitor.trackInteraction('TestComponent', 'click', 50);
    const metrics = testMonitor.getMetrics();

    expect(metrics.custom).toHaveLength(1);
    expect(metrics.custom[0]).toMatchObject({
      type: 'custom',
      value: 50,
      metadata: {
        name: 'interaction_click',
        component: 'TestComponent',
        type: 'click',
      },
    });
  });

  it('should support custom metrics', () => {
    testMonitor.trackCustomMetric('custom_event', 200, { tag: 'test' });
    const metrics = testMonitor.getMetrics();

    expect(metrics.custom).toHaveLength(1);
    expect(metrics.custom[0]).toMatchObject({
      type: 'custom',
      value: 200,
      metadata: {
        name: 'custom_event',
        tags: { tag: 'test' },
      },
    });
  });

  it('should respect sample rate', () => {
    // Set up spy before creating monitor instance
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.9);

    // Create options
    const options = { sampleRate: 0.5 };

    // Reset instance with options
    PerformanceMonitor.resetInstance(options);
    const sampleMonitor = PerformanceMonitor.getInstance();

    sampleMonitor.trackRender('TestComponent', 100);

    const metrics = sampleMonitor.getMetrics();
    expect(metrics.renders.length).toBe(0);

    // Cleanup
    randomSpy.mockRestore();
  });

  it('should handle invalid inputs', () => {
    // Test with invalid values
    expect(() => testMonitor.trackRender('', -100)).not.toThrow();
    expect(() => testMonitor.trackInteraction('Component', '', -50)).not.toThrow();
    expect(() => testMonitor.trackCustomMetric('', -200, {})).not.toThrow();

    // Test with very large values
    expect(() => testMonitor.trackRender('Test', Number.MAX_VALUE)).not.toThrow();
    expect(() => testMonitor.trackInteraction('Test', 'click', Number.MAX_VALUE)).not.toThrow();

    const metrics = testMonitor.getMetrics();

    // Test invalid render metrics
    const renderMetrics = metrics.renders.filter(
      (m) => m.metadata.componentId === '' || m.value < 0 || !Number.isFinite(m.value)
    );
    expect(renderMetrics.length).toBe(0); // Invalid render metrics should not be recorded

    // Test invalid custom/interaction metrics
    const customMetrics = metrics.custom.filter(
      (m) =>
        m.metadata.name === '' ||
        m.metadata.name === 'interaction_' ||
        m.value < 0 ||
        !Number.isFinite(m.value)
    );
    expect(customMetrics.length).toBe(0); // Invalid custom metrics should not be recorded
  });

  it('should handle undefined metadata', () => {
    testMonitor.trackCustomMetric('test_event', 100, undefined);
    const metrics = testMonitor.getMetrics();

    expect(metrics.custom).toHaveLength(1);
    expect(metrics.custom[0].metadata).toMatchObject({
      name: 'test_event',
      tags: {},
    });
  });

  it('should clear metrics', () => {
    testMonitor.trackRender('TestComponent', 100);
    const metrics = testMonitor.getMetrics();
    expect(metrics.renders).toHaveLength(1);

    testMonitor.clearMetrics();
    const clearedMetrics = testMonitor.getMetrics();
    expect(clearedMetrics.renders).toHaveLength(0);
  });

  // Reset singleton instance after each test
  afterEach(() => {
    // Assuming there's a reset method on PerformanceMonitor
    PerformanceMonitor.resetInstance();
  });
});
