import React from 'react';
import type { Alert, AlertSeverity } from '../../core/types';

interface AlertsListProps {
  alerts: Alert[];
}

const getSeverityColor = (severity: AlertSeverity): string => {
  switch (severity) {
    case 'critical':
      return '#f44336';
    case 'error':
      return '#ff9800';
    case 'warning':
      return '#ffc107';
    case 'info':
      return '#2196f3';
    default:
      return '#9e9e9e';
  }
};

export const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="monitoring-alerts-list">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="monitoring-alert-item"
          style={{
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            border: `1px solid ${getSeverityColor(alert.severity)}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                color: getSeverityColor(alert.severity),
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '12px',
              }}
            >
              {alert.severity}
            </span>
            <span style={{ color: '#666', fontSize: '12px' }}>
              {new Date(alert.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div style={{ fontSize: '14px', color: '#333' }}>{alert.message}</div>
          {alert.value && (
            <div
              style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '4px',
              }}
            >
              Value: {alert.value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
