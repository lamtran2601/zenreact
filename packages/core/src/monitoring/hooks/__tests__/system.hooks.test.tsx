import { renderHook, act } from '@testing-library/react';
import { monitor } from '../../index';
import { useMemoryTracking, useNetworkTracking } from '../system.hooks';

// Mock the monitor
jest.mock('../../index', () => ({
  monitor: {
    trackMemory: jest.fn(),
    trackNetwork: jest.fn(),
  },
}));

describe('useMemoryTracking', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should track memory immediately on mount', () => {
    const mockMemoryStats = { used: 100, total: 1000, limit: 2000 };
    (monitor.trackMemory as jest.Mock).mockReturnValue(mockMemoryStats);

    const { result } = renderHook(() => useMemoryTracking());

    expect(monitor.trackMemory).toHaveBeenCalled();
    expect(result.current).toEqual(mockMemoryStats);
  });

  it('should track memory at specified intervals', () => {
    const mockMemoryStats = { used: 100, total: 1000, limit: 2000 };
    (monitor.trackMemory as jest.Mock).mockReturnValue(mockMemoryStats);

    renderHook(() => useMemoryTracking(1000));

    // Clear initial call
    jest.clearAllMocks();

    // Advance timers and verify periodic tracking
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(monitor.trackMemory).toHaveBeenCalledTimes(2);
  });

  it('should clean up interval on unmount', () => {
    const { unmount } = renderHook(() => useMemoryTracking(1000));

    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});

describe('useNetworkTracking', () => {
  const defaultStats = { requests: 0, errors: 0, averageTime: 0 };

  beforeEach(() => {
    (monitor.trackNetwork as jest.Mock).mockImplementation(({ onStats }) => {
      onStats(defaultStats);
      return jest.fn(); // Return unsubscribe function
    });
  });

  it('should initialize with default stats', () => {
    const { result } = renderHook(() => useNetworkTracking());
    expect(result.current).toEqual(defaultStats);
  });

  it('should pass options to monitor.trackNetwork', () => {
    const options = {
      urlPattern: /api/,
      trackTiming: true,
      trackErrors: true,
    };

    renderHook(() => useNetworkTracking(options));

    expect(monitor.trackNetwork).toHaveBeenCalledWith(expect.objectContaining(options));
  });

  it('should update stats when monitor calls onStats', () => {
    const { result } = renderHook(() => useNetworkTracking());
    const newStats = { requests: 1, errors: 0, averageTime: 100 };

    act(() => {
      const onStats = (monitor.trackNetwork as jest.Mock).mock.calls[0][0].onStats;
      onStats(newStats);
    });

    expect(result.current).toEqual(newStats);
  });

  it('should cleanup subscription on unmount', () => {
    const unsubscribe = jest.fn();
    (monitor.trackNetwork as jest.Mock).mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useNetworkTracking());
    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
