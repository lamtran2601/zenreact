import React, { useEffect } from 'react';
import { AggregatedMetrics } from '../aggregator';
import { RenderMetricsChart, MemoryMetricsChart, NetworkMetricsChart } from './charts';
import { AlertDisplay } from './AlertDisplay';
import { useRealTimeMetrics } from '../real-time';
import styled from '@emotion/styled';

const DashboardContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #2c3e50;
  }
`;

// Local storage keys for metric persistence
const STORAGE_KEYS = {
  METRICS_HISTORY: 'zenreact_metrics_history',
};

interface MetricsHistory {
  timestamp: number;
  metrics: AggregatedMetrics;
}

export interface MetricsDashboardProps {
  endpoint: string;
  updateInterval?: number;
  historyDuration?: number; // How long to keep history (in ms), default 1 hour
}

export function MetricsDashboard({
  endpoint,
  updateInterval = 1000,
  historyDuration = 60 * 60 * 1000, // 1 hour
}: MetricsDashboardProps) {
  const metrics = useRealTimeMetrics({ endpoint, updateInterval });

  useEffect(() => {
    if (!metrics) return;

    // Load existing history
    const historyStr = localStorage.getItem(STORAGE_KEYS.METRICS_HISTORY);
    const history: MetricsHistory[] = historyStr ? JSON.parse(historyStr) : [];

    // Add current metrics
    const now = Date.now();
    history.push({
      timestamp: now,
      metrics,
    });

    // Remove old entries
    const cutoff = now - historyDuration;
    const filteredHistory = history.filter((entry) => entry.timestamp >= cutoff);

    // Save back to local storage
    localStorage.setItem(STORAGE_KEYS.METRICS_HISTORY, JSON.stringify(filteredHistory));
  }, [metrics, historyDuration]);

  if (!metrics) {
    return (
      <DashboardContainer>
        <MetricCard>Loading metrics...</MetricCard>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <MetricCard>
        <AlertDisplay metrics={metrics} />
      </MetricCard>

      <MetricCard>
        <CardHeader>
          <h2>Component Render Times</h2>
        </CardHeader>
        <RenderMetricsChart metrics={metrics.renders} />
      </MetricCard>

      <MetricCard>
        <CardHeader>
          <h2>Memory Usage</h2>
        </CardHeader>
        <MemoryMetricsChart metrics={metrics.memory} />
      </MetricCard>

      <MetricCard>
        <CardHeader>
          <h2>Network Performance</h2>
        </CardHeader>
        <NetworkMetricsChart metrics={metrics.network} />
      </MetricCard>
    </DashboardContainer>
  );
}
