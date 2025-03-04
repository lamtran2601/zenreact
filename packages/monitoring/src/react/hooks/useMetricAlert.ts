import { useEffect, useCallback } from 'react';
import { useMonitoring } from '../provider';
import type { AlertConfig, AlertSeverity } from '../../core/types';

export interface MetricAlertOptions extends Omit<AlertConfig, 'level'> {
  name: string;
  severity?: AlertSeverity;
}

export const useMetricAlert = (options: MetricAlertOptions) => {
  const { alerts } = useMonitoring();

  useEffect(() => {
    return alerts.configureAlert(options.name, {
      threshold: options.threshold,
      level: options.severity || 'warning',
      description: options.description,
      onTrigger: options.onTrigger,
      onResolve: options.onResolve,
    });
  }, [
    options.name,
    options.threshold,
    options.severity,
    options.description,
    options.onTrigger,
    options.onResolve,
  ]);

  const getCurrentAlerts = useCallback(() => {
    return alerts
      .getActiveAlerts()
      .filter((alert) => alert.message.toLowerCase().includes(options.name.toLowerCase()));
  }, [options.name]);

  return {
    getCurrentAlerts,
  };
};
