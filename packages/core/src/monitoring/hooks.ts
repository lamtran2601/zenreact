import { useEffect, useRef, useState, useCallback } from 'react';
import { monitor } from './index';
import type { AlertConfig } from './alerts/AlertManager';

export interface UseMonitorOptions {
  trackRenders?: boolean;
  trackInteractions?: boolean;
  componentName?: string;
}

export function useMonitor(options: UseMonitorOptions = {}): void {
  const { trackRenders = true, trackInteractions = true, componentName = 'Unknown' } = options;

  const renderStartTime = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!trackRenders) return () => {};

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return () => {};
    }

    const renderDuration = performance.now() - renderStartTime.current;
    monitor.trackRender(componentName, renderDuration);

    return () => {};
  });

  useEffect(() => {
    if (!trackInteractions) return () => {};

    const trackInteraction = (event: Event) => {
      const startTime = performance.now();
      const rafId = requestAnimationFrame(() => {
        const duration = performance.now() - startTime;
        monitor.trackInteraction(componentName, event.type, duration);
      });

      return rafId;
    };

    const element = document.querySelector(`[data-component="${componentName}"]`);
    if (!element) {
      console.warn(`No element found with data-component="${componentName}"`);
      return () => {};
    }

    const activeRAFs = new Set<number>();

    const wrappedTrackInteraction = (event: Event) => {
      const rafId = trackInteraction(event);
      activeRAFs.add(rafId);
    };

    element.addEventListener('click', wrappedTrackInteraction);
    element.addEventListener('input', wrappedTrackInteraction);
    element.addEventListener('change', wrappedTrackInteraction);

    return () => {
      element.removeEventListener('click', wrappedTrackInteraction);
      element.removeEventListener('input', wrappedTrackInteraction);
      element.removeEventListener('change', wrappedTrackInteraction);

      activeRAFs.forEach((rafId) => cancelAnimationFrame(rafId));
      activeRAFs.clear();
    };
  }, [componentName, trackInteractions]);

  renderStartTime.current = performance.now();
}

export function useCustomMetric(name: string, initialValue?: number) {
  const [value, setValue] = useState<number | undefined>(initialValue);

  const updateMetric = useCallback(
    (newValue: number, metadata?: Record<string, unknown>) => {
      setValue(newValue);
      monitor.trackCustomMetric(name, newValue, metadata);
    },
    [name]
  );

  return [value, updateMetric] as const;
}

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

export interface AlertHookOptions extends AlertConfig {
  onAlert?: (message: string, level: 'warning' | 'error' | 'critical') => void;
}

export function useMetricAlert(metricName: string, options: AlertHookOptions) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [alertHistory, setAlertHistory] = useState<
    Array<{
      timestamp: number;
      message: string;
      level: string;
    }>
  >([]);

  useEffect(() => {
    const unsubscribe = monitor.configureAlert(metricName, {
      ...options,
      onTrigger: (message, level) => {
        setIsTriggered(true);
        setAlertHistory((prev) => [
          ...prev,
          {
            timestamp: Date.now(),
            message,
            level,
          },
        ]);
        options.onAlert?.(message, level);
      },
      onResolve: () => {
        setIsTriggered(false);
      },
    });

    return () => unsubscribe();
  }, [metricName, options]);

  return { isTriggered, alertHistory };
}

const HISTORY_STORAGE_KEY = 'zenreact_metric_history';

export interface UseMetricHistoryOptions {
  metricName: string;
  duration?: number; // How long to keep history in ms
  aggregation?: 'avg' | 'max' | 'min' | 'sum';
}

export function useMetricHistory({
  metricName,
  duration = 3600000, // 1 hour
  aggregation = 'avg',
}: UseMetricHistoryOptions) {
  const [history, setHistory] = useState<
    Array<{
      timestamp: number;
      value: number;
    }>
  >([]);

  useEffect(() => {
    // Load existing history
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed[metricName] || []);
    }

    // Subscribe to metric updates
    const unsubscribe = monitor.subscribeToMetric(metricName, (value) => {
      setHistory((prev) => {
        const now = Date.now();
        const newHistory = [
          ...prev.filter((entry) => now - entry.timestamp <= duration),
          { timestamp: now, value },
        ];

        // Save to localStorage
        const allHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '{}');
        allHistory[metricName] = newHistory;
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistory));

        return newHistory;
      });
    });

    return () => unsubscribe();
  }, [metricName, duration]);

  // Aggregate history based on specified method
  const aggregatedValue = useCallback(() => {
    if (!history.length) return 0;

    const values = history.map((h) => h.value);
    switch (aggregation) {
      case 'max':
        return Math.max(...values);
      case 'min':
        return Math.min(...values);
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      default:
        return values.reduce((a, b) => a + b, 0) / values.length;
    }
  }, [history, aggregation]);

  return { history, aggregatedValue: aggregatedValue() };
}
