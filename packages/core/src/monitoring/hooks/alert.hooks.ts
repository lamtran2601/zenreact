import { useState, useEffect } from 'react';
import { monitor } from '../index';
import type { AlertConfig } from '../alerts/AlertManager';

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
