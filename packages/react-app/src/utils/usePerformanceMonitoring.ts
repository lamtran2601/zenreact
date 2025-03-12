/**
 * @pattern PerformanceHook
 * @rule ComponentMonitoring
 * React hook for monitoring component performance
 */
import React, { useEffect, useRef } from 'react';
import { recordMetric } from './performanceMonitoring';

/**
 * Hook to monitor component render performance
 * @param componentName Name of the component being monitored
 */
export function usePerformanceMonitoring(componentName: string): void {
  const renderStartTime = useRef<number>(0);
  const isMounted = useRef<boolean>(false);
  
  // Track initial render time
  useEffect(() => {
    const endTime = performance.now();
    
    // Only record if we have a valid start time
    if (renderStartTime.current > 0) {
      recordMetric({
        componentName,
        metricType: 'render',
        duration: endTime - renderStartTime.current,
        metadata: { renderType: 'initial' }
      });
    }
    
    isMounted.current = true;
    
    // Cleanup function to measure component lifecycle
    return () => {
      recordMetric({
        componentName,
        metricType: 'render',
        duration: performance.now() - renderStartTime.current,
        metadata: { renderType: 'lifecycle' }
      });
    };
  }, [componentName]);
  
  // Track re-renders
  useEffect(() => {
    // Skip the first render as it's handled by the mount effect
    if (isMounted.current) {
      const endTime = performance.now();
      
      recordMetric({
        componentName,
        metricType: 'render',
        duration: endTime - renderStartTime.current,
        metadata: { renderType: 're-render' }
      });
    }
    
    // Set start time for next render
    renderStartTime.current = performance.now();
  });
}

/**
 * @pattern PerformanceTracking
 * @rule HOCMonitoring
 * Higher-order component for performance monitoring
 */
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
): React.FC<P> {
  const displayName = componentName || Component.displayName || Component.name || 'UnknownComponent';
  
  const WrappedComponent: React.FC<P> = (props) => {
    usePerformanceMonitoring(displayName);
    return React.createElement(Component, props);
  };
  
  WrappedComponent.displayName = `WithPerformanceTracking(${displayName})`;
  
  return WrappedComponent;
}

/**
 * @pattern InteractionTracking
 * @rule UserInteractionMonitoring
 * Track user interaction performance
 */
export function trackInteraction<T>(
  componentName: string,
  interactionName: string,
  callback: () => T
): T {
  const startTime = performance.now();
  const result = callback();
  const duration = performance.now() - startTime;
  
  recordMetric({
    componentName,
    metricType: 'interaction',
    duration,
    metadata: { interaction: interactionName }
  });
  
  return result;
}

/**
 * @pattern NetworkTracking
 * @rule APIPerformanceMonitoring
 * Track network request performance
 */
export async function trackNetworkRequest<T>(
  componentName: string,
  requestName: string,
  requestFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = await requestFn();
    const duration = performance.now() - startTime;
    
    recordMetric({
      componentName,
      metricType: 'network',
      duration,
      metadata: { request: requestName, success: true }
    });
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    recordMetric({
      componentName,
      metricType: 'network',
      duration,
      metadata: { 
        request: requestName, 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });
    
    throw error;
  }
} 