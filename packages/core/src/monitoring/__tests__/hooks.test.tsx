import { render, fireEvent, act } from '@testing-library/react';
import { useMonitor } from '../hooks';
import { monitor } from '../index';
import React from 'react';

jest.mock('../index', () => ({
  monitor: {
    trackRender: jest.fn(),
    trackInteraction: jest.fn(),
  },
}));

// Test component that uses the hook
const TestComponent = ({ name }: { name: string }) => {
  useMonitor({ componentName: name });
  return <button data-component={name}>Click me</button>;
};

describe('useMonitor', () => {
  // Store the original performance object
  const originalPerformance = window.performance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a proper performance mock
    // Make performance optional for testing
    delete (window as { performance?: Performance }).performance;
    Object.defineProperty(window, 'performance', {
      value: { now: jest.fn(() => 1000) },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    // Reset all mocks and timers
    jest.clearAllTimers();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    // Restore original window.performance
    Object.defineProperty(window, 'performance', {
      value: originalPerformance,
      configurable: true,
      writable: true,
    });
  });

  it('should track renders', () => {
    jest.useFakeTimers();
    const { rerender } = render(<TestComponent name="TestButton" />);

    // First render doesn't track
    expect(monitor.trackRender).not.toHaveBeenCalled();

    // Update to trigger re-render
    rerender(<TestComponent name="TestButton" />);

    expect(monitor.trackRender).toHaveBeenCalledWith('TestButton', expect.any(Number));

    jest.useRealTimers();
  });

  it('should track interactions', () => {
    jest.useFakeTimers();
    const { getByRole } = render(<TestComponent name="TestButton" />);
    const button = getByRole('button');

    fireEvent.click(button);

    // Wait for requestAnimationFrame
    act(() => {
      jest.runAllTimers();
    });

    expect(monitor.trackInteraction).toHaveBeenCalledWith(
      'TestButton',
      'click',
      expect.any(Number)
    );

    jest.useRealTimers();
  });

  it('should not track when disabled', () => {
    jest.useFakeTimers();
    // Create a test component with tracking disabled
    const DisabledTrackingComponent = ({ name }: { name: string }) => {
      useMonitor({ componentName: name, trackRenders: false, trackInteractions: false });
      return <button data-component={name}>Click me</button>;
    };

    const { rerender, getByRole } = render(<DisabledTrackingComponent name="TestButton" />);

    // Update to trigger re-render
    rerender(<DisabledTrackingComponent name="TestButton" />);

    const button = getByRole('button');
    fireEvent.click(button);

    act(() => {
      jest.runAllTimers();
    });

    expect(monitor.trackRender).not.toHaveBeenCalled();
    expect(monitor.trackInteraction).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('should handle throttled renders', () => {
    jest.useFakeTimers();
    const { rerender } = render(<TestComponent name="TestButton" />);

    // Multiple quick rerenders
    for (let i = 0; i < 5; i++) {
      rerender(<TestComponent name="TestButton" />);
    }

    expect(monitor.trackRender).toHaveBeenCalledTimes(5); // First render doesn't track, but all 5 rerenders are tracked

    jest.useRealTimers();
  });

  it('should cleanup event listeners', () => {
    jest.useFakeTimers();
    const removeEventListener = jest.fn();
    const addEventListener = jest.fn();

    const element = document.createElement('div');
    element.addEventListener = addEventListener;
    element.removeEventListener = removeEventListener;

    jest.spyOn(document, 'querySelector').mockImplementation(() => element);

    const { unmount } = render(<TestComponent name="TestButton" />);

    // Check event listeners were added
    expect(addEventListener).toHaveBeenCalledTimes(3); // click, input, change

    unmount();

    // Check cleanup
    expect(removeEventListener).toHaveBeenCalledTimes(3);

    jest.useRealTimers();
  });
});
