import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { MetricsCollector } from '../core/metrics';
import { AlertManager } from '../core/alerts';

interface MonitoringContextValue {
  metrics: MetricsCollector;
  alerts: AlertManager;
}

interface ProviderProps {
  children: React.ReactNode;
  options?: {
    bufferSize?: number;
    memoryTracking?: boolean;
    memoryInterval?: number;
  };
}

const MonitoringContext = createContext<MonitoringContextValue | null>(null);

export const MonitoringProvider: React.FC<ProviderProps> = ({ children, options = {} }) => {
  const value = useMemo(() => {
    const metrics = new MetricsCollector({ bufferSize: options.bufferSize });
    const alerts = new AlertManager();
    return { metrics, alerts };
  }, [options.bufferSize]);

  useEffect(() => {
    // Start memory tracking if enabled
    if (options.memoryTracking) {
      value.metrics.startMemoryTracking(options.memoryInterval);
    }

    return () => {
      value.metrics.disable();
    };
  }, [options.memoryTracking, options.memoryInterval]);

  return <MonitoringContext.Provider value={value}>{children}</MonitoringContext.Provider>;
};

export const useMonitoring = () => {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
};
