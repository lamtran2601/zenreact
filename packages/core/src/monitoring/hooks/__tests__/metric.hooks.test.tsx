import { renderHook, act } from '@testing-library/react';
import { monitor } from '../../index';
import { useCustomMetric, useMetricHistory } from '../metric.hooks';

// Mock the monitor
jest.mock('../../index', () => {
  const subscribers = new Map<string, Set<(value: number) => void>>();

  return {
    monitor: {
      trackCustomMetric: jest.fn(),
      subscribeToMetric: jest.fn((metricName: string, callback: (value: number) => void) => {
        if (!subscribers.has(metricName)) {
          subscribers.set(metricName, new Set());
        }
        subscribers.get(metricName)!.add(callback);

        // Return unsubscribe function
        return () => {
          const subs = subscribers.get(metricName);
          if (subs) {
            subs.delete(callback);
            if (subs.size === 0) {
              subscribers.delete(metricName);
            }
          }
        };
      }),
      // Helper to trigger metric updates in tests
      __triggerMetricUpdate: (metricName: string, value: number) => {
        const subs = subscribers.get(metricName);
        if (subs) {
          subs.forEach((callback) => callback(value));
        }
      },
    },
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key]),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useCustomMetric', () => {
  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useCustomMetric('testMetric', 42));
    expect(result.current[0]).toBe(42);
  });

  it('should update metric value and notify monitor', () => {
    const { result } = renderHook(() => useCustomMetric('testMetric'));

    act(() => {
      result.current[1](100);
    });

    expect(result.current[0]).toBe(100);
    expect(monitor.trackCustomMetric).toHaveBeenCalledWith('testMetric', 100, undefined);
  });

  it('should handle metadata when updating metric', () => {
    const { result } = renderHook(() => useCustomMetric('testMetric'));
    const metadata = { source: 'test' };

    act(() => {
      result.current[1](200, metadata);
    });

    expect(monitor.trackCustomMetric).toHaveBeenCalledWith('testMetric', 200, metadata);
  });

  it('should preserve update function reference between renders', () => {
    const { result, rerender } = renderHook(() => useCustomMetric('testMetric'));
    const initialUpdateFn = result.current[1];

    rerender();

    expect(result.current[1]).toBe(initialUpdateFn);
  });
});

describe('useMetricHistory', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should initialize with empty history', () => {
    const { result } = renderHook(() => useMetricHistory({ metricName: 'testMetric' }));

    expect(result.current.history).toEqual([]);
    expect(result.current.aggregatedValue).toBe(0);
  });

  it('should load existing history from localStorage', () => {
    const mockNow = 10000;
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockNow);

    try {
      const existingHistory = [
        {
          timestamp: mockNow - 1000,
          value: 42,
        },
      ];

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          testMetric: existingHistory,
        })
      );

      const { result } = renderHook(() => useMetricHistory({ metricName: 'testMetric' }));

      expect(result.current.history).toEqual(existingHistory);
    } finally {
      dateSpy.mockRestore();
    }
  });

  it('should update history when new metrics arrive', () => {
    // Mock Date.now to control timestamps
    const mockNow = 1000000;
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockNow);

    try {
      // Ensure localStorage is empty
      localStorageMock.clear();
      // Mock empty storage state
      localStorageMock.getItem.mockReturnValue(JSON.stringify({}));

      const { result } = renderHook(() => useMetricHistory({ metricName: 'testMetric' }));

      // Verify initial state is empty
      expect(result.current.history).toHaveLength(0);

      // Simulate metric update using helper
      act(() => {
        (
          monitor as unknown as {
            __triggerMetricUpdate: (metricName: string, value: number) => void;
          }
        ).__triggerMetricUpdate('testMetric', 42);

        // Force any state updates to complete
        jest.runAllTimers();
      });

      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0]).toEqual({
        timestamp: mockNow,
        value: 42,
      });
    } finally {
      dateSpy.mockRestore();
      jest.clearAllTimers();
    }
  });

  it('should handle different aggregation methods', () => {
    const mockNow = 10000;
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockNow);

    try {
      const history = [
        { timestamp: mockNow, value: 10 },
        { timestamp: mockNow, value: 20 },
        { timestamp: mockNow, value: 30 },
      ];

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          testMetric: history,
        })
      );

      // Test average (default)
      const { result: avgResult } = renderHook(() =>
        useMetricHistory({ metricName: 'testMetric' })
      );
      expect(avgResult.current.aggregatedValue).toBe(20); // (10 + 20 + 30) / 3

      // Test maximum
      const { result: maxResult } = renderHook(() =>
        useMetricHistory({ metricName: 'testMetric', aggregation: 'max' })
      );
      expect(maxResult.current.aggregatedValue).toBe(30);

      // Test minimum
      const { result: minResult } = renderHook(() =>
        useMetricHistory({ metricName: 'testMetric', aggregation: 'min' })
      );
      expect(minResult.current.aggregatedValue).toBe(10);

      // Test sum
      const { result: sumResult } = renderHook(() =>
        useMetricHistory({ metricName: 'testMetric', aggregation: 'sum' })
      );
      expect(sumResult.current.aggregatedValue).toBe(60);
    } finally {
      dateSpy.mockRestore();
    }
  });

  it('should respect duration limit', () => {
    const mockNow = 10000;
    jest.spyOn(Date, 'now').mockImplementation(() => mockNow);

    const oldHistory = [
      { timestamp: mockNow - 5000, value: 10 }, // Should be filtered out
      { timestamp: mockNow - 500, value: 20 }, // Should remain
      { timestamp: mockNow, value: 30 }, // Should remain
    ];

    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({
        testMetric: oldHistory,
      })
    );

    const { result } = renderHook(() =>
      useMetricHistory({
        metricName: 'testMetric',
        duration: 1000, // 1 second
      })
    );

    // Should only include entries within the last second
    expect(result.current.history).toHaveLength(2);
    expect(result.current.history.map((h) => h.value)).toEqual([20, 30]);
    expect(result.current.history).toEqual([
      { timestamp: mockNow - 500, value: 20 },
      { timestamp: mockNow, value: 30 },
    ]);
  });

  it('should cleanup subscription on unmount', () => {
    const unsubscribe = jest.fn();
    (monitor.subscribeToMetric as jest.Mock).mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useMetricHistory({ metricName: 'testMetric' }));
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
