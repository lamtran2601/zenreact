import { useEffect, useCallback, useState } from 'react';
import { useMonitoring } from '../provider';
import type { NetworkStats, AlertConfig, NetworkTrackingOptions } from '../../core/types';
import { DEFAULT_THRESHOLDS } from '../../core/constants';

export interface NetworkTrackingHookOptions extends NetworkTrackingOptions {
  alert?: AlertConfig;
}

export const useNetworkTracking = (options: NetworkTrackingHookOptions = {}) => {
  const { metrics, alerts } = useMonitoring();
  const [stats, setStats] = useState<NetworkStats>({
    requests: 0,
    errors: 0,
    averageTime: 0,
  });

  useEffect(() => {
    if (options.alert) {
      return alerts.configureAlert('network', {
        threshold: options.alert.threshold || DEFAULT_THRESHOLDS.NETWORK_TIME,
        level: options.alert.level,
        description: options.alert.description || 'Network request exceeded time threshold',
        onTrigger: options.alert.onTrigger,
        onResolve: options.alert.onResolve,
      });
    }
  }, [options.alert]);

  useEffect(() => {
    return metrics.trackNetwork({
      urlPattern: options.urlPattern,
      onStats: (newStats) => {
        setStats(newStats);
        options.onStats?.(newStats);
      },
    });
  }, [options.urlPattern]);

  const trackRequest = useCallback((url: string, duration: number, status?: number) => {
    metrics.trackNetworkRequest(url, duration, status);
  }, []);

  const getNetworkMetrics = useCallback(() => {
    return metrics.getMetrics().network;
  }, []);

  return {
    stats,
    trackRequest,
    getNetworkMetrics,
  };
};
