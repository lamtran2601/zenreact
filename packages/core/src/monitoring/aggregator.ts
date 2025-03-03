import {
  RenderMetric,
  MemoryMetric,
  NetworkMetric,
  CustomMetric,
  CollectedMetrics,
} from './metrics';

export interface AggregatedMetrics {
  renders: {
    count: number;
    averageDuration: number;
    maxDuration: number;
    minDuration: number;
    componentBreakdown: Record<
      string,
      {
        count: number;
        averageDuration: number;
      }
    >;
  };
  memory: {
    averageHeapUsed: number;
    maxHeapUsed: number;
    minHeapUsed: number;
    averageHeapTotal: number;
  };
  network: {
    count: number;
    averageDuration: number;
    maxDuration: number;
    minDuration: number;
    byStatus: Record<number, number>;
    slowestEndpoints: Array<{
      url: string;
      duration: number;
    }>;
  };
  custom: {
    byName: Record<
      string,
      {
        count: number;
        latest: number;
        average: number;
        max: number;
        min: number;
      }
    >;
  };
}

export class MetricsAggregator {
  /**
   * Aggregates raw metrics into summary statistics
   */
  static aggregate(metrics: CollectedMetrics): AggregatedMetrics {
    return {
      renders: this.aggregateRenderMetrics(metrics.renders),
      memory: this.aggregateMemoryMetrics(metrics.memory),
      network: this.aggregateNetworkMetrics(metrics.network),
      custom: this.aggregateCustomMetrics(metrics.custom),
    };
  }

  private static aggregateCustomMetrics(metrics: CustomMetric[]) {
    const byName: Record<
      string,
      {
        values: number[];
        latest: number;
      }
    > = {};

    // Group values by metric name
    metrics.forEach((metric) => {
      const name = metric.metadata.name;
      if (!byName[name]) {
        byName[name] = {
          values: [],
          latest: metric.value,
        };
      }
      byName[name].values.push(metric.value);
      byName[name].latest = metric.value; // Last value will be the latest
    });

    // Calculate statistics for each metric
    return {
      byName: Object.entries(byName).reduce(
        (acc, [name, data]) => {
          acc[name] = {
            count: data.values.length,
            latest: data.latest,
            average: data.values.reduce((sum, val) => sum + val, 0) / data.values.length,
            max: Math.max(...data.values),
            min: Math.min(...data.values),
          };
          return acc;
        },
        {} as Record<
          string,
          {
            count: number;
            latest: number;
            average: number;
            max: number;
            min: number;
          }
        >
      ),
    };
  }

  private static aggregateRenderMetrics(metrics: RenderMetric[]) {
    const componentMetrics: Record<string, number[]> = {};

    // Group durations by component
    metrics.forEach((metric) => {
      const componentId = metric.metadata.componentId;
      if (!componentMetrics[componentId]) {
        componentMetrics[componentId] = [];
      }
      componentMetrics[componentId].push(metric.value);
    });

    // Calculate component-level statistics
    const componentBreakdown = Object.entries(componentMetrics).reduce(
      (acc, [component, durations]) => {
        acc[component] = {
          count: durations.length,
          averageDuration: durations.reduce((sum, val) => sum + val, 0) / durations.length,
        };
        return acc;
      },
      {} as Record<string, { count: number; averageDuration: number }>
    );

    // Calculate overall statistics
    const allDurations = metrics.map((m) => m.value);

    return {
      count: metrics.length,
      averageDuration: metrics.length
        ? allDurations.reduce((sum, val) => sum + val, 0) / metrics.length
        : 0,
      maxDuration: metrics.length ? Math.max(...allDurations) : 0,
      minDuration: metrics.length ? Math.min(...allDurations) : 0,
      componentBreakdown,
    };
  }

  private static aggregateMemoryMetrics(metrics: MemoryMetric[]) {
    const heapUsed = metrics.map((m) => m.metadata.heapUsed);
    const heapTotal = metrics.map((m) => m.metadata.heapTotal);

    return {
      averageHeapUsed: metrics.length
        ? heapUsed.reduce((sum, val) => sum + val, 0) / metrics.length
        : 0,
      maxHeapUsed: metrics.length ? Math.max(...heapUsed) : 0,
      minHeapUsed: metrics.length ? Math.min(...heapUsed) : 0,
      averageHeapTotal: metrics.length
        ? heapTotal.reduce((sum, val) => sum + val, 0) / metrics.length
        : 0,
    };
  }

  private static aggregateNetworkMetrics(metrics: NetworkMetric[]) {
    // Count responses by status code
    const byStatus = metrics.reduce(
      (acc, metric) => {
        const status = metric.metadata.status || 0;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    );

    // Find slowest endpoints
    const slowestEndpoints = metrics
      .map((m) => ({
        url: m.metadata.url,
        duration: m.value,
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);

    const durations = metrics.map((m) => m.value);

    return {
      count: metrics.length,
      averageDuration: metrics.length
        ? durations.reduce((sum, val) => sum + val, 0) / metrics.length
        : 0,
      maxDuration: metrics.length ? Math.max(...durations) : 0,
      minDuration: metrics.length ? Math.min(...durations) : 0,
      byStatus,
      slowestEndpoints,
    };
  }
}
