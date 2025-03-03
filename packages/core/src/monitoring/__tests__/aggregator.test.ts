import { MetricsAggregator } from '../aggregator';
import type { CollectedMetrics } from '../metrics';

describe('MetricsAggregator', () => {
  describe('render metrics aggregation', () => {
    test('aggregates render metrics correctly', () => {
      const metrics: CollectedMetrics = {
        renders: [
          {
            id: '1',
            timestamp: Date.now(),
            type: 'render',
            value: 100,
            metadata: { componentId: 'Button' },
          },
          {
            id: '2',
            timestamp: Date.now(),
            type: 'render',
            value: 200,
            metadata: { componentId: 'Button' },
          },
          {
            id: '3',
            timestamp: Date.now(),
            type: 'render',
            value: 150,
            metadata: { componentId: 'Card' },
          },
        ],
        memory: [],
        network: [],
        custom: [],
      };

      const aggregated = MetricsAggregator.aggregate(metrics);

      expect(aggregated.renders.count).toBe(3);
      expect(aggregated.renders.averageDuration).toBe(150);
      expect(aggregated.renders.maxDuration).toBe(200);
      expect(aggregated.renders.minDuration).toBe(100);

      // Component breakdown
      expect(aggregated.renders.componentBreakdown).toEqual({
        Button: {
          count: 2,
          averageDuration: 150, // (100 + 200) / 2
        },
        Card: {
          count: 1,
          averageDuration: 150,
        },
      });
    });

    test('handles empty render metrics', () => {
      const metrics: CollectedMetrics = {
        renders: [],
        memory: [],
        network: [],
        custom: [],
      };

      const aggregated = MetricsAggregator.aggregate(metrics);

      expect(aggregated.renders.count).toBe(0);
      expect(aggregated.renders.averageDuration).toBe(0);
      expect(aggregated.renders.maxDuration).toBe(0);
      expect(aggregated.renders.minDuration).toBe(0);
      expect(aggregated.renders.componentBreakdown).toEqual({});
    });
  });

  describe('memory metrics aggregation', () => {
    test('aggregates memory metrics correctly', () => {
      const metrics: CollectedMetrics = {
        renders: [],
        memory: [
          {
            id: '1',
            timestamp: Date.now(),
            type: 'memory',
            value: 1000,
            metadata: { heapUsed: 1000, heapTotal: 2000 },
          },
          {
            id: '2',
            timestamp: Date.now(),
            type: 'memory',
            value: 1500,
            metadata: { heapUsed: 1500, heapTotal: 2500 },
          },
        ],
        network: [],
        custom: [],
      };

      const aggregated = MetricsAggregator.aggregate(metrics);

      expect(aggregated.memory.averageHeapUsed).toBe(1250);
      expect(aggregated.memory.maxHeapUsed).toBe(1500);
      expect(aggregated.memory.minHeapUsed).toBe(1000);
      expect(aggregated.memory.averageHeapTotal).toBe(2250);
    });

    test('handles empty memory metrics', () => {
      const metrics: CollectedMetrics = {
        renders: [],
        memory: [],
        network: [],
        custom: [],
      };

      const aggregated = MetricsAggregator.aggregate(metrics);

      expect(aggregated.memory.averageHeapUsed).toBe(0);
      expect(aggregated.memory.maxHeapUsed).toBe(0);
      expect(aggregated.memory.minHeapUsed).toBe(0);
      expect(aggregated.memory.averageHeapTotal).toBe(0);
    });
  });

  describe('network metrics aggregation', () => {
    test('aggregates network metrics correctly', () => {
      const metrics: CollectedMetrics = {
        renders: [],
        memory: [],
        network: [
          {
            id: '1',
            timestamp: Date.now(),
            type: 'network',
            value: 100,
            metadata: { url: '/api/1', status: 200 },
          },
          {
            id: '2',
            timestamp: Date.now(),
            type: 'network',
            value: 300,
            metadata: { url: '/api/2', status: 200 },
          },
          {
            id: '3',
            timestamp: Date.now(),
            type: 'network',
            value: 500,
            metadata: { url: '/api/3', status: 404 },
          },
        ],
        custom: [],
      };

      const aggregated = MetricsAggregator.aggregate(metrics);

      expect(aggregated.network.count).toBe(3);
      expect(aggregated.network.averageDuration).toBe(300);
      expect(aggregated.network.maxDuration).toBe(500);
      expect(aggregated.network.minDuration).toBe(100);

      // Status codes
      expect(aggregated.network.byStatus).toEqual({
        200: 2,
        404: 1,
      });

      // Slowest endpoints
      expect(aggregated.network.slowestEndpoints).toHaveLength(3);
      expect(aggregated.network.slowestEndpoints[0]).toEqual({
        url: '/api/3',
        duration: 500,
      });
    });

    test('handles empty network metrics', () => {
      const metrics: CollectedMetrics = {
        renders: [],
        memory: [],
        network: [],
        custom: [],
      };

      const aggregated = MetricsAggregator.aggregate(metrics);

      expect(aggregated.network.count).toBe(0);
      expect(aggregated.network.averageDuration).toBe(0);
      expect(aggregated.network.maxDuration).toBe(0);
      expect(aggregated.network.minDuration).toBe(0);
      expect(aggregated.network.byStatus).toEqual({});
      expect(aggregated.network.slowestEndpoints).toHaveLength(0);
    });
  });
});
