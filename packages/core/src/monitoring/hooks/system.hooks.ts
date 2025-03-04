import { useState, useEffect } from 'react';
import { monitor } from '../index';

export function useMemoryTracking(interval = 5000) {
  const [memoryStats, setMemoryStats] = useState<{
    used: number;
    total: number;
    limit: number;
  }>();

  useEffect(() => {
    const trackMemory = () => {
      const memory = monitor.trackMemory();
      setMemoryStats(memory);
    };

    trackMemory(); // Initial tracking
    const timerId = setInterval(trackMemory, interval);

    return () => clearInterval(timerId);
  }, [interval]);

  return memoryStats;
}

export interface NetworkTrackingOptions {
  urlPattern?: RegExp;
  trackTiming?: boolean;
  trackErrors?: boolean;
}

export function useNetworkTracking(options: NetworkTrackingOptions = {}) {
  const [stats, setStats] = useState<{
    requests: number;
    errors: number;
    averageTime: number;
  }>({ requests: 0, errors: 0, averageTime: 0 });

  useEffect(() => {
    const unsubscribe = monitor.trackNetwork({
      onStats: setStats,
      ...options,
    });

    return () => unsubscribe();
  }, [options.urlPattern, options.trackTiming, options.trackErrors]);

  return stats;
}
