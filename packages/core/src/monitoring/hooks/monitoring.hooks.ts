import { useEffect, useRef } from 'react';
import { monitor } from '../index';

export interface UseMonitorOptions {
  trackRenders?: boolean;
  trackInteractions?: boolean;
  componentName?: string;
}

export function useMonitor(options: UseMonitorOptions = {}): void {
  const { trackRenders = true, trackInteractions = true, componentName = 'Unknown' } = options;

  const renderStartTime = useRef<number>(performance.now());
  const isFirstRender = useRef(true);

  // Effect for tracking renders
  useEffect(() => {
    if (!trackRenders) return;

    const renderEndTime = performance.now();
    const renderDuration = renderEndTime - renderStartTime.current;

    if (!isFirstRender.current) {
      monitor.trackRender(componentName, renderDuration);
    } else {
      isFirstRender.current = false;
    }

    // Start timing the next render
    renderStartTime.current = performance.now();
  });

  // Effect for tracking interactions
  useEffect(() => {
    if (!trackInteractions) return () => {};

    const trackInteraction = (event: Event) => {
      const startTime = performance.now();
      const rafId = requestAnimationFrame(() => {
        const duration = performance.now() - startTime;
        monitor.trackInteraction(componentName, event.type, duration);
      });

      return rafId;
    };

    const element = document.querySelector(`[data-component="${componentName}"]`);
    if (!element) {
      console.warn(`No element found with data-component="${componentName}"`);
      return () => {};
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
      element.removeEventListener('click', wrappedTrackInteraction);
      element.removeEventListener('input', wrappedTrackInteraction);
      element.removeEventListener('change', wrappedTrackInteraction);

      activeRAFs.forEach((rafId) => cancelAnimationFrame(rafId));
      activeRAFs.clear();
    };
  }, [componentName, trackInteractions]);

  renderStartTime.current = performance.now();
}
