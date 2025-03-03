import { MetricsCollector } from './metrics';

export interface MemorySamplerOptions {
  enabled?: boolean;
  intervalMs?: number;
  collector: MetricsCollector;
}

export class MemorySampler {
  private intervalId?: NodeJS.Timeout;
  private options: Required<MemorySamplerOptions>;

  constructor(options: MemorySamplerOptions) {
    this.options = {
      enabled: options.enabled ?? true,
      intervalMs: options.intervalMs ?? 60000, // Default: sample every minute
      collector: options.collector,
    };

    if (this.options.enabled) {
      this.start();
    }
  }

  /**
   * Starts periodic memory sampling
   */
  start(): void {
    if (this.intervalId) {
      return; // Already running
    }

    this.intervalId = setInterval(() => {
      this.sample();
    }, this.options.intervalMs);

    // Take initial sample
    this.sample();
  }

  /**
   * Stops periodic memory sampling
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /**
   * Takes a single memory sample
   */
  private sample(): void {
    this.options.collector.trackMemory();
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stop();
  }
}
