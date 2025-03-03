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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AggregatedMetrics } from '../../aggregator';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MemoryMetricsChartProps {
  metrics: AggregatedMetrics['memory'];
}

export function MemoryMetricsChart({ metrics }: MemoryMetricsChartProps) {
  // Convert bytes to MB for better readability
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  const data = {
    labels: ['Current'],
    datasets: [
      {
        label: 'Heap Used (MB)',
        data: [metrics.averageHeapUsed],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Heap Total (MB)',
        data: [metrics.averageHeapTotal],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: true,
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
        text: 'Memory Usage',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Memory (MB)',
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <div>
          <strong>Current Usage:</strong> {toMB(metrics.averageHeapUsed)} MB /{' '}
          {toMB(metrics.averageHeapTotal)} MB
        </div>
        <div>
          <strong>Peak Usage:</strong> {toMB(metrics.maxHeapUsed)} MB
        </div>
        <div>
          <strong>Min Usage:</strong> {toMB(metrics.minHeapUsed)} MB
        </div>
      </div>
    </div>
  );
}
