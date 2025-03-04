import React, { useEffect, useState } from 'react';
import { useMonitoring } from '../../react/provider';
import { Alert, CollectedMetrics } from '../../core/types';
import { MetricsChart } from './MetricsChart';
import { AlertsList } from './AlertsList';

interface DashboardProps {
  refreshInterval?: number;
  showAlerts?: boolean;
  showCharts?: {
    render?: boolean;
    memory?: boolean;
    network?: boolean;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({
  refreshInterval = 5000,
  showAlerts = true,
  showCharts = {
    render: true,
    memory: true,
    network: true,
  },
}) => {
  const { metrics, alerts } = useMonitoring();
  const [data, setData] = useState<CollectedMetrics>(metrics.getMetrics());
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const updateData = () => {
      setData(metrics.getMetrics());
      setActiveAlerts(alerts.getActiveAlerts());
    };

    // Initial update
    updateData();

    // Set up periodic updates
    const interval = setInterval(updateData, refreshInterval);

    return () => {
      clearInterval(interval);
    };
  }, [refreshInterval]);

  return (
    <div className="monitoring-dashboard">
      {showAlerts && activeAlerts.length > 0 && (
        <div className="monitoring-alerts">
          <h3>Active Alerts</h3>
          <AlertsList alerts={activeAlerts} />
        </div>
      )}

      {showCharts.render && (
        <div className="monitoring-chart">
          <h3>Component Render Times</h3>
          <MetricsChart
            data={data.renders}
            type="render"
            valueKey="value"
            labelKey="metadata.componentId"
          />
        </div>
      )}

      {showCharts.memory && (
        <div className="monitoring-chart">
          <h3>Memory Usage</h3>
          <MetricsChart
            data={data.memory}
            type="memory"
            valueKey="value"
            formatValue={(value) => `${(value / (1024 * 1024)).toFixed(2)} MB`}
          />
        </div>
      )}

      {showCharts.network && (
        <div className="monitoring-chart">
          <h3>Network Response Times</h3>
          <MetricsChart
            data={data.network}
            type="network"
            valueKey="value"
            labelKey="metadata.url"
            formatValue={(value) => `${value.toFixed(2)}ms`}
          />
        </div>
      )}
    </div>
  );
};
