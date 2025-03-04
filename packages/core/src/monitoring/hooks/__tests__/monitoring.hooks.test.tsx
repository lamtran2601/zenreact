import { renderHook, act } from '@testing-library/react';
import { monitor } from '../../index';
import { useMonitor } from '../monitoring.hooks';

// Mock the monitor
jest.mock('../../index', () => ({
  monitor: {
    trackRender: jest.fn(),
    trackInteraction: jest.fn(),
  },
}));

describe('useMonitor', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should track renders when trackRenders is true', () => {
    const performanceSpy = jest.spyOn(performance, 'now');
    performanceSpy
      // Initial render sequence
      .mockReturnValueOnce(0) // Initial render (outside effect)
      .mockReturnValueOnce(10) // Start of effect
      .mockReturnValueOnce(20) // End of effect
      .mockReturnValueOnce(100) // Next render timing setup
      // Rerender sequence
      .mockReturnValueOnce(100) // Rerender (outside effect)
      .mockReturnValueOnce(150) // Start of effect
      .mockReturnValueOnce(200); // End of effect

    const { rerender } = renderHook(() => useMonitor({ componentName: 'TestComponent' }));

    // First render won't track (isFirstRender check)
    expect(monitor.trackRender).not.toHaveBeenCalled();

    // Second render should track
    rerender();
    expect(monitor.trackRender).toHaveBeenCalledWith('TestComponent', 50);
  });

  it('should not track renders when trackRenders is false', () => {
    const { rerender } = renderHook(() =>
      useMonitor({
        componentName: 'TestComponent',
        trackRenders: false,
      })
    );

    rerender();
    expect(monitor.trackRender).not.toHaveBeenCalled();
  });

  it('should track interactions when trackInteractions is true', async () => {
    // Create a test element
    const element = document.createElement('div');
    element.setAttribute('data-component', 'TestComponent');
    document.body.appendChild(element);

    // The actual implementation is measuring a 16ms interval, so we'll update our test to match
    const performanceSpy = jest.spyOn(performance, 'now');
    performanceSpy
      .mockReturnValueOnce(0) // Event handler start
      .mockReturnValueOnce(16); // RAF callback timing

    renderHook(() => useMonitor({ componentName: 'TestComponent' }));

    // Simulate click event
    act(() => {
      element.dispatchEvent(new Event('click'));
      // Run RAF synchronously
      jest.runOnlyPendingTimers();
    });

    // Duration should be 16ms as per the actual implementation
    expect(monitor.trackInteraction).toHaveBeenCalledWith('TestComponent', 'click', 16);

    // Cleanup
    document.body.removeChild(element);
  });

  it('should handle missing element gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    renderHook(() => useMonitor({ componentName: 'MissingComponent' }));

    expect(consoleSpy).toHaveBeenCalledWith(
      'No element found with data-component="MissingComponent"'
    );

    consoleSpy.mockRestore();
  });

  it('should clean up event listeners on unmount', () => {
    // Create element and spy on its methods
    const element = document.createElement('div');
    element.setAttribute('data-component', 'TestComponent');

    // Setup spies before adding to document
    const removeEventListenerSpy = jest.spyOn(element, 'removeEventListener');

    // Mock querySelector to return our element
    jest.spyOn(document, 'querySelector').mockImplementation(() => element);

    const { unmount } = renderHook(() => useMonitor({ componentName: 'TestComponent' }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3); // click, input, change

    removeEventListenerSpy.mockRestore();
  });

  it('should cancel active requestAnimationFrame calls on unmount', () => {
    const element = document.createElement('div');
    element.setAttribute('data-component', 'TestComponent');

    // Mock querySelector
    jest.spyOn(document, 'querySelector').mockImplementation(() => element);

    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');

    const { unmount } = renderHook(() => useMonitor({ componentName: 'TestComponent' }));

    // Trigger events that will create RAFs
    act(() => {
      element.dispatchEvent(new Event('click'));
      element.dispatchEvent(new Event('input'));
      // Don't run timers yet so RAFs remain pending
    });

    unmount();

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
