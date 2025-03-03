import { MetricsCollector } from './metrics';

export interface CustomMetricOptions {
  name: string;
  value: number;
  tags?: Record<string, string>;
}

export class CustomMetricsManager {
  constructor(private collector: MetricsCollector) {}

  /**
   * Track a custom metric
   * @param options Metric details including name, value and optional tags
   */
  track(options: CustomMetricOptions): void {
    this.collector.trackCustomMetric(options.name, options.value, {
      tags: options.tags || {},
    });
  }

  /**
   * Create a timer to track duration of operations
   * @param name Name of the metric
   * @param tags Optional tags to attach to the metric
   */
  createTimer(name: string, tags?: Record<string, string>) {
    const startTime = performance.now();
    return {
      /**
       * Stop the timer and record the duration
       */
      stop: () => {
        const duration = performance.now() - startTime;
        this.track({
          name: `${name}_duration`,
          value: duration,
          tags,
        });
        return duration;
      },
    };
  }

  /**
   * Track a value over time (e.g., queue size, cache hit rate)
   * @param name Name of the metric
   * @param tags Optional tags to attach to the metric
   */
  createGauge(name: string, tags?: Record<string, string>) {
    return {
      /**
       * Set the current value of the gauge
       */
      setValue: (value: number) => {
        this.track({
          name,
          value,
          tags,
        });
      },
    };
  }

  /**
   * Track incremental values (e.g., error count, request count)
   * @param name Name of the metric
   * @param tags Optional tags to attach to the metric
   */
  createCounter(name: string, tags?: Record<string, string>) {
    return {
      /**
       * Increment the counter by a given amount
       */
      increment: (amount: number = 1) => {
        this.track({
          name,
          value: amount,
          tags,
        });
      },
    };
  }
}
