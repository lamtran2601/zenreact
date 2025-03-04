import { useEffect, useRef } from 'react';
import { useMonitoring } from '../provider';
import type { AlertConfig } from '../../core/types';

export interface RenderTrackingOptions {
  componentId?: string;
  onRender?: (duration: number) => void;
  alert?: AlertConfig;
}

export const useRenderTracking = (options: RenderTrackingOptions = {}) => {
  const { metrics, alerts } = useMonitoring();
  const componentId = options.componentId || 'anonymous';
  const renderCount = useRef(0);

  useEffect(() => {
    if (options.alert) {
      return alerts.configureAlert(`render_${componentId}`, options.alert);
    }
  }, [componentId, options.alert]);

  useEffect(() => {
    renderCount.current++;
    const endTracking = metrics.trackRender(componentId);

    return () => {
      endTracking();
      options.onRender?.(performance.now()); // Provide render duration in callback
    };
  });

  return {
    renderCount: renderCount.current,
    getMetrics: () => {
      const allMetrics = metrics.getMetrics();
      return allMetrics.renders.filter((metric) => metric.metadata.componentId === componentId);
    },
  };
};
