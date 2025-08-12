import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import StatsCard from '../common/StatsCard';
import { MapContainer } from '../common/MapContainer';

const Dashboard: React.FC = () => {
  const statsData = {
    totalProducts: 1234,
    inventoryValue: '$123,456',
    averageStock: 89,
    outOfStock: 12,
    discounts: 5,
    lowStock: 23
  };

  return (
    <div className="p-6 space-y-6">
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
    }   <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard 
          title="Total Products" 
          value={statsData.totalProducts}
          trend="up"
          percentage={12}
        />
        {/* Add other stat cards */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-light p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Stock Movement</h3>
          <Bar data={/* chart data */} options={/* chart options */} />
        </div>
        
        <div className="bg-white dark:bg-dark-light p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <Doughnut data={/* chart data */} options={/* chart options */} />
        </div>
      </div>

      <div className="bg-white dark:bg-dark-light p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Darkstore Locations</h3>
        <MapContainer />
      </div>
    </div>
  );
};

export default Dashboard;