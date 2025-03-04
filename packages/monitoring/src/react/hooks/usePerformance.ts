import { useEffect, useCallback } from 'react';
import { useMonitoring } from '../provider';
import type { AlertConfig } from '../../core/types';

export interface PerformanceOptions {
  componentId?: string;
  memoryTracking?: boolean;
  memoryInterval?: number;
  alerts?: {
    renderTime?: AlertConfig;
    memoryUsage?: AlertConfig;
  };
}

export const usePerformance = (options: PerformanceOptions = {}) => {
  const { metrics, alerts } = useMonitoring();
  const componentId = options.componentId || 'unknown';

  // Setup render time tracking
  useEffect(() => {
    if (options.alerts?.renderTime) {
      return alerts.configureAlert(`render_${componentId}`, options.alerts.renderTime);
    }
  }, [componentId, options.alerts?.renderTime]);

  // Setup memory tracking
  useEffect(() => {
    if (options.memoryTracking) {
      metrics.startMemoryTracking(options.memoryInterval);

      if (options.alerts?.memoryUsage) {
        return alerts.configureAlert('memory', options.alerts.memoryUsage);
      }
    }

    return () => {
      if (options.memoryTracking) {
        metrics.stopMemoryTracking();
      }
    };
  }, [options.memoryTracking, options.memoryInterval, options.alerts?.memoryUsage]);

  // Track render times
  const trackRender = useCallback(() => {
    return metrics.trackRender(componentId);
  }, [componentId]);

  return {
    trackRender,
    getMetrics: metrics.getMetrics.bind(metrics),
    startMemoryTracking: metrics.startMemoryTracking.bind(metrics),
    stopMemoryTracking: metrics.stopMemoryTracking.bind(metrics),
  };
};
