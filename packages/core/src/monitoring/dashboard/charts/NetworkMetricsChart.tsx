import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AggregatedMetrics } from '../../aggregator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NetworkMetricsChartProps {
  metrics: AggregatedMetrics['network'];
}

export function NetworkMetricsChart({ metrics }: NetworkMetricsChartProps) {
  const statusData = {
    labels: Object.keys(metrics.byStatus).map((status) =>
      status === '0' ? 'Pending/Failed' : `${status}`
    ),
    datasets: [
      {
        label: 'Requests by Status',
        data: Object.values(metrics.byStatus),
        backgroundColor: Object.keys(metrics.byStatus).map((status) => {
          if (status === '0') return 'rgba(200, 200, 200, 0.5)'; // Gray for pending/failed
          const code = parseInt(status);
          if (code < 300) return 'rgba(75, 192, 192, 0.5)'; // Green for 2xx
          if (code < 400) return 'rgba(54, 162, 235, 0.5)'; // Blue for 3xx
          if (code < 500) return 'rgba(255, 206, 86, 0.5)'; // Yellow for 4xx
          return 'rgba(255, 99, 132, 0.5)'; // Red for 5xx
        }),
        borderColor: Object.keys(metrics.byStatus).map((status) => {
          if (status === '0') return 'rgba(200, 200, 200, 1)';
          const code = parseInt(status);
          if (code < 300) return 'rgba(75, 192, 192, 1)';
          if (code < 400) return 'rgba(54, 162, 235, 1)';
          if (code < 500) return 'rgba(255, 206, 86, 1)';
          return 'rgba(255, 99, 132, 1)';
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Total Requests: ${metrics.count} | Avg Response Time: ${metrics.averageDuration.toFixed(2)}ms`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Request Count',
        },
      },
    },
  };

  return (
    <div>
      <Bar data={statusData} options={options} />
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <div>
          <strong>Response Times:</strong>
          <br />
          Max: {metrics.maxDuration.toFixed(2)}ms | Min: {metrics.minDuration.toFixed(2)}ms
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Slowest Endpoints:</strong>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
            {metrics.slowestEndpoints.map((endpoint, index) => (
              <li key={index}>
                {endpoint.url} - {endpoint.duration.toFixed(2)}ms
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
