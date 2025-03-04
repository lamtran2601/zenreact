import { renderHook, act } from '@testing-library/react';
import { monitor } from '../../index';
import { useMetricAlert } from '../alert.hooks';

// Mock the monitor
jest.mock('../../index', () => ({
  monitor: {
    configureAlert: jest.fn(),
  },
}));

describe('useMetricAlert', () => {
  const mockAlert = {
    onTrigger: jest.fn(),
    onResolve: jest.fn(),
  };

  beforeEach(() => {
    (monitor.configureAlert as jest.Mock).mockImplementation((_, config) => {
      mockAlert.onTrigger = config.onTrigger;
      mockAlert.onResolve = config.onResolve;
      return jest.fn(); // Return unsubscribe function
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useMetricAlert('testMetric', {
        threshold: 100,
        level: 'warning',
      })
    );

    expect(result.current.isTriggered).toBe(false);
    expect(result.current.alertHistory).toEqual([]);
  });

  it('should handle alert triggers', () => {
    const onAlert = jest.fn();
    const { result } = renderHook(() =>
      useMetricAlert('testMetric', {
        threshold: 100,
        level: 'warning',
        onAlert,
      })
    );

    act(() => {
      mockAlert.onTrigger('Threshold exceeded', 'warning');
    });

    expect(result.current.isTriggered).toBe(true);
    expect(result.current.alertHistory).toHaveLength(1);
    expect(result.current.alertHistory[0]).toMatchObject({
      message: 'Threshold exceeded',
      level: 'warning',
    });
    expect(onAlert).toHaveBeenCalledWith('Threshold exceeded', 'warning');
  });

  it('should handle alert resolution', () => {
    const { result } = renderHook(() =>
      useMetricAlert('testMetric', {
        threshold: 100,
        level: 'warning',
      })
    );

    // Trigger alert first
    act(() => {
      mockAlert.onTrigger('Threshold exceeded', 'warning');
    });

    // Then resolve it
    act(() => {
      mockAlert.onResolve();
    });

    expect(result.current.isTriggered).toBe(false);
    // Alert history should still maintain the record
    expect(result.current.alertHistory).toHaveLength(1);
  });

  it('should cleanup alert configuration on unmount', () => {
    const unsubscribe = jest.fn();
    (monitor.configureAlert as jest.Mock).mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() =>
      useMetricAlert('testMetric', {
        threshold: 100,
        level: 'warning',
      })
    );
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
