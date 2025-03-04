import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js/auto';
import { Metric } from '../../core/types';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MetricsChartProps {
  data: Metric[];
  type: 'render' | 'memory' | 'network';
  valueKey: string;
  labelKey?: string;
  formatValue?: (value: number) => string;
}

const getMetricValue = (metric: Metric, path: string): unknown => {
  const keys = path.split('.');
  let value: unknown = metric;

  for (const key of keys) {
    if (value === null || typeof value !== 'object') {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }

  return value;
};

export const MetricsChart: React.FC<MetricsChartProps> = ({
  data,
  type,
  valueKey,
  labelKey,
  formatValue = (value: number) => value.toString(),
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const labels = data.map((item) => {
      if (labelKey) {
        const value = getMetricValue(item, labelKey);
        return value ? String(value) : '';
      }
      return new Date(item.timestamp).toLocaleTimeString();
    });

    const values = data.map((item) => {
      const value = getMetricValue(item, valueKey);
      return typeof value === 'number' ? value : 0;
    });

    const chartData: ChartData<'line'> = {
      labels,
      datasets: [
        {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          data: values,
          borderColor: getColorForType(type),
          tension: 0.1,
          fill: false,
        },
      ],
    };

    const options: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: unknown) => {
              if (typeof value === 'number' || typeof value === 'string') {
                return formatValue(Number(value));
              }
              return '';
            },
          },
        },
      },
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, {
      type: 'line',
      data: chartData,
      options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, valueKey, labelKey, formatValue]);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

function getColorForType(type: string): string {
  switch (type) {
    case 'render':
      return '#4CAF50';
    case 'memory':
      return '#2196F3';
    case 'network':
      return '#FFC107';
    default:
      return '#9E9E9E';
  }
}
