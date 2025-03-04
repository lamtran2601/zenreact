import { useState, useCallback, useEffect, useRef } from 'react';
import { monitor } from '../index';

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
  const lastUpdateRef = useRef<{ timestamp: number; value: number }>();

  useEffect(() => {
    // Load existing history with duration filtering
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      const now = Date.now();
      const filteredHistory = (parsed[metricName] || []).filter(
        (entry: { timestamp: number }) => now - entry.timestamp <= duration
      );
      setHistory(filteredHistory);
    }
    const unsubscribe = monitor.subscribeToMetric(metricName, (value) => {
      const now = Date.now();

      // Skip if same value recently added
      if (lastUpdateRef.current) {
        const timeDiff = now - lastUpdateRef.current.timestamp;
        if (timeDiff < 1000 && lastUpdateRef.current.value === value) {
          return;
        }
      }

      const newEntry = { timestamp: now, value };
      lastUpdateRef.current = newEntry;

      setHistory((prev) => {
        const filteredHistory = prev.filter((entry) => now - entry.timestamp <= duration);
        const newHistory = [...filteredHistory, newEntry];

        try {
          const allHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '{}');
          allHistory[metricName] = newHistory;
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistory));
        } catch (error) {
          console.error('Failed to save metric history:', error);
        }

        return newHistory;
      });
    });

    return () => unsubscribe();
  }, [metricName, duration]);

  // Compute aggregated value
  const computeAggregatedValue = useCallback(() => {
    if (history.length === 0) return 0;

    const values = history.map((entry) => entry.value);
    switch (aggregation) {
      case 'max':
        return Math.max(...values);
      case 'min':
        return Math.min(...values);
      case 'sum':
        return values.reduce((a, b) => a + b, 0);
      default: // 'avg'
        return values.reduce((a, b) => a + b, 0) / values.length;
    }
  }, [history, aggregation]);

  return {
    history,
    aggregatedValue: computeAggregatedValue(),
  };
}
