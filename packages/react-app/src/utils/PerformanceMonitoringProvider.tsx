/**
 * @pattern PerformanceProvider
 * @rule ApplicationIntegration
 * Provider component for application-wide performance monitoring
 */
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  initializeMonitoring, 
  configureMonitoring, 
  PerformanceMetric, 
  getMetrics 
} from './performanceMonitoring';

// Context type
interface PerformanceMonitoringContextType {
  isEnabled: boolean;
  toggleMonitoring: (enabled: boolean) => void;
  toggleSampling: (enabled: boolean) => void;
  getPerformanceMetrics: () => PerformanceMetric[];
}

// Create context with default values
const PerformanceMonitoringContext = createContext<PerformanceMonitoringContextType>({
  isEnabled: process.env.NODE_ENV !== 'test',
  toggleMonitoring: () => {},
  toggleSampling: () => {},
  getPerformanceMetrics: () => [],
});

// Provider props
interface PerformanceMonitoringProviderProps {
  children: ReactNode;
  initialEnabled?: boolean;
  initialSampling?: boolean;
}

/**
 * @pattern ProviderComponent
 * @rule ApplicationWideMonitoring
 * Provider component that initializes and manages performance monitoring
 */
export const PerformanceMonitoringProvider = ({
  children,
  initialEnabled = process.env.NODE_ENV !== 'test',
  initialSampling = true,
}: PerformanceMonitoringProviderProps) => {
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isSampling, setIsSampling] = useState(initialSampling);
  
  // Initialize monitoring on mount
  useEffect(() => {
    // Configure initial state
    configureMonitoring({
      enabled: isEnabled,
      sampling: isSampling,
    });
    
    // Initialize and get cleanup function
    const cleanup = initializeMonitoring();
    
    // Clean up on unmount
    return cleanup;
  }, [isEnabled, isSampling]);
  
  // Toggle monitoring on/off
  const toggleMonitoring = (enabled: boolean) => {
    setIsEnabled(enabled);
    configureMonitoring({ enabled });
  };
  
  // Toggle sampling on/off
  const toggleSampling = (enabled: boolean) => {
    setIsSampling(enabled);
    configureMonitoring({ sampling: enabled });
  };
  
  // Get current metrics
  const getPerformanceMetrics = () => getMetrics();
  
  // Context value
  const contextValue: PerformanceMonitoringContextType = {
    isEnabled,
    toggleMonitoring,
    toggleSampling,
    getPerformanceMetrics,
  };
  
  return (
    <PerformanceMonitoringContext.Provider value={contextValue}>
      {children}
    </PerformanceMonitoringContext.Provider>
  );
};

/**
 * @pattern ContextHook
 * @rule ContextAccess
 * Hook to access performance monitoring context
 */
export const usePerformanceMonitoringContext = (): PerformanceMonitoringContextType => {
  const context = useContext(PerformanceMonitoringContext);
  
  if (context === undefined) {
    throw new Error('usePerformanceMonitoringContext must be used within a PerformanceMonitoringProvider');
  }
  
  return context;
}; 