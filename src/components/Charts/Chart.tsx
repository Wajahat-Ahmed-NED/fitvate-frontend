import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ChartData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: ChartData;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({ type, data, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    } : undefined,
  };

  const chartProps = {
    data,
    options,
    height,
  };

  switch (type) {
    case 'line':
      return <Line {...chartProps} />;
    case 'bar':
      return <Bar {...chartProps} />;
    case 'doughnut':
      return <Doughnut {...chartProps} />;
    default:
      return null;
  }
};