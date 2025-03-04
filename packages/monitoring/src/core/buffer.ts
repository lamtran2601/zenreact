import type { Metric } from './types';
import { BUFFER_LIMITS } from './constants';

/**
 * Buffer for storing metrics with a fixed size
 */
export class MetricsBuffer {
  private data: Metric[];
  private maxSize: number;

  constructor(size: number = BUFFER_LIMITS.DEFAULT_SIZE) {
    this.data = [];
    this.maxSize = Math.min(Math.max(size, BUFFER_LIMITS.MIN_SIZE), BUFFER_LIMITS.MAX_SIZE);
  }

  /**
   * Add a metric to the buffer
   * @param metric The metric to add
   */
  push(metric: Metric): void {
    if (this.data.length >= this.maxSize) {
      this.data.shift(); // Remove oldest metric if buffer is full
    }
    this.data.push(metric);
  }

  /**
   * Clear all metrics from the buffer
   */
  clear(): void {
    this.data = [];
  }

  /**
   * Get all metrics in the buffer
   * @returns A copy of the buffer data
   */
  getData(): Metric[] {
    return [...this.data];
  }

  /**
   * Get the current size of the buffer
   */
  getSize(): number {
    return this.data.length;
  }

  /**
   * Get the maximum size of the buffer
   */
  getMaxSize(): number {
    return this.maxSize;
  }
}
