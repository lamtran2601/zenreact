import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Alert, AlertManager, createThresholds } from '../alerts/AlertManager';
import { AggregatedMetrics } from '../aggregator';

const AlertContainer = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

const AlertHeader = styled.div`
  background: #f8f9fa;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: #495057;
  }
`;

const AlertList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const AlertItem = styled.div<{ severity: 'info' | 'warning' | 'error' }>`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #dee2e6;
  background: ${({ severity }) => {
    switch (severity) {
      case 'error':
        return '#fff5f5';
      case 'warning':
        return '#fff9db';
      default:
        return '#f8f9fa';
    }
  }};

  &:last-child {
    border-bottom: none;
  }
`;

const AlertTime = styled.span`
  color: #868e96;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

interface AlertDisplayProps {
  metrics: AggregatedMetrics;
}

export function AlertDisplay({ metrics }: AlertDisplayProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertManager] = useState(() => {
    const manager = new AlertManager({ maxAlertHistory: 50 });

    // Add default thresholds
    manager.addThreshold(
      createThresholds.highMemoryUsage(100) // Alert when memory usage > 100MB
    );

    manager.addThreshold(
      createThresholds.slowNetwork(1000) // Alert when average network requests > 1s
    );

    manager.addThreshold(
      createThresholds.highErrorRate(10) // Alert when error rate > 10%
    );

    // Add slow render thresholds for each component
    Object.keys(metrics.renders.componentBreakdown).forEach((componentId) => {
      manager.addThreshold(
        createThresholds.slowRender(componentId, 100) // Alert when render time > 100ms
      );
    });

    return manager;
  });

  useEffect(() => {
    // Check metrics against thresholds
    alertManager.checkMetrics(metrics);

    // Update alerts state
    setAlerts(alertManager.getAlerts());
  }, [metrics, alertManager]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <AlertContainer>
      <AlertHeader>
        <h3>Active Alerts ({alerts.length})</h3>
      </AlertHeader>
      <AlertList>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} severity={alert.severity}>
            <strong>{alert.message}</strong>
            <AlertTime>{new Date(alert.timestamp).toLocaleTimeString()}</AlertTime>
          </AlertItem>
        ))}
      </AlertList>
    </AlertContainer>
  );
}
