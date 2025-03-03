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

interface RenderMetricsChartProps {
  metrics: AggregatedMetrics['renders'];
}

export function RenderMetricsChart({ metrics }: RenderMetricsChartProps) {
  const data = {
    labels: Object.keys(metrics.componentBreakdown),
    datasets: [
      {
        label: 'Average Render Time (ms)',
        data: Object.values(metrics.componentBreakdown).map((comp) => comp.averageDuration),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Render Count',
        data: Object.values(metrics.componentBreakdown).map((comp) => comp.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
        text: `Total Renders: ${metrics.count} | Avg Duration: ${metrics.averageDuration.toFixed(2)}ms`,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
      <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
        <strong>Max Duration:</strong> {metrics.maxDuration.toFixed(2)}ms |{' '}
        <strong>Min Duration:</strong> {metrics.minDuration.toFixed(2)}ms
      </div>
    </div>
  );
}
