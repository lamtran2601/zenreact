import { useEffect, useRef } from 'react';
import { monitor } from './index';

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
    if (!trackRenders) return () => {}; // Return empty cleanup

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return () => {}; // Return empty cleanup
    }

    const renderDuration = performance.now() - renderStartTime.current;
    monitor.trackRender(componentName, renderDuration);

    return () => {}; // Return empty cleanup
  });

  useEffect(() => {
    if (!trackInteractions) return () => {}; // Return empty cleanup

    const trackInteraction = (event: Event) => {
      const startTime = performance.now();
      const rafId = requestAnimationFrame(() => {
        const duration = performance.now() - startTime;
        monitor.trackInteraction(componentName, event.type, duration);
      });

      // Return RAF ID for cleanup
      return rafId;
    };

    const element = document.querySelector(`[data-component="${componentName}"]`);
    if (!element) {
      console.warn(`No element found with data-component="${componentName}"`);
      return () => {}; // Return empty cleanup
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
      // Clean up event listeners
      element.removeEventListener('click', wrappedTrackInteraction);
      element.removeEventListener('input', wrappedTrackInteraction);
      element.removeEventListener('change', wrappedTrackInteraction);

      // Cancel any pending RAFs
      activeRAFs.forEach((rafId) => cancelAnimationFrame(rafId));
      activeRAFs.clear();
    };
  }, [componentName, trackInteractions]);

  // Set render start time before each render
  renderStartTime.current = performance.now();
}
