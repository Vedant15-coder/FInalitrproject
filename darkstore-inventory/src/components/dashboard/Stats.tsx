import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';

interface StatsCardProps {
  title: string;
  value: number | string;
  trend: 'up' | 'down';
  percentage: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, percentage }) => {
  return (
    <div className="bg-white dark:bg-dark-light p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
          <span className="ml-1">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="Total Inventory" value={150} trend="up" percentage={10} />
            <StatsCard title="Low Stock Alerts" value={5} trend="down" percentage={5} />
            <StatsCard title="Total Sales" value="$12,000" trend="up" percentage={15} />
            <StatsCard title="New Orders" value={20} trend="up" percentage={8} />
        </div>
    );
};

export default Stats;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        dark: {
          DEFAULT: '#1f2937',
          light: '#374151'
        }
      }
    }
  },
  plugins: [],
}