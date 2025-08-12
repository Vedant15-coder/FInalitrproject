import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  const { isDark } = useTheme();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Stock In',
        data: [12400, 19300, 13000, 15200, 18900, 22300, 20100, 24500, 19800, 21200, 25300, 23100],
        backgroundColor: isDark ? 'rgba(14, 165, 233, 0.8)' : 'rgba(14, 165, 233, 0.8)',
        borderColor: isDark ? 'rgba(14, 165, 233, 1)' : 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Stock Out',
        data: [11200, 17800, 12100, 14300, 17200, 20800, 18900, 22300, 18100, 19800, 23100, 21400],
        backgroundColor: isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.8)',
        borderColor: isDark ? 'rgba(34, 197, 94, 1)' : 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#f3f4f6' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} units`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? '#374151' : '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value) {
            return (value / 1000) + 'K';
          }
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockChart;