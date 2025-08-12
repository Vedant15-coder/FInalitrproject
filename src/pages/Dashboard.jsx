import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  Store, 
  AlertTriangle,
  Percent,
  AlertCircle,
  Download,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import StockChart from '../components/charts/StockChart';
import CategoryChart from '../components/charts/CategoryChart';
import LocationMap from '../components/charts/LocationMap';
import TrendChart from '../components/charts/TrendChart';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { hasPermission } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const kpiData = [
    {
      title: 'Total Products',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'primary'
    },
    {
      title: 'Total Inventory Value',
      value: '₹2,45,67,890',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Average Stock per Store',
      value: '4,283',
      change: '-2.1%',
      trend: 'down',
      icon: Store,
      color: 'warning'
    },
    {
      title: 'Out-of-Stock Alerts',
      value: '23',
      change: '-15.3%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'danger'
    },
    {
      title: 'Discounts & Offers Applied',
      value: '1,456',
      change: '+25.7%',
      trend: 'up',
      icon: Percent,
      color: 'primary'
    },
    {
      title: 'Low Stock Warnings',
      value: '87',
      change: '+5.4%',
      trend: 'up',
      icon: AlertCircle,
      color: 'warning'
    }
  ];

  const getColorClasses = (color, trend) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        icon: 'text-primary-600 dark:text-primary-400',
        trend: trend === 'up' ? 'text-success-600' : 'text-danger-600'
      },
      success: {
        bg: 'bg-success-50 dark:bg-success-900/20',
        icon: 'text-success-600 dark:text-success-400',
        trend: trend === 'up' ? 'text-success-600' : 'text-danger-600'
      },
      warning: {
        bg: 'bg-warning-50 dark:bg-warning-900/20',
        icon: 'text-warning-600 dark:text-warning-400',
        trend: trend === 'up' ? 'text-success-600' : 'text-danger-600'
      },
      danger: {
        bg: 'bg-danger-50 dark:bg-danger-900/20',
        icon: 'text-danger-600 dark:text-danger-400',
        trend: trend === 'up' ? 'text-success-600' : 'text-danger-600'
      }
    };
    return colors[color];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your inventory.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          {hasPermission('export') && (
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const colors = getColorClasses(kpi.color, kpi.trend);
          
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-hover group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {kpi.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className={`w-4 h-4 ${colors.trend}`} />
                    <span className={`text-sm font-medium ${colors.trend}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      vs last period
                    </span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-full ${colors.bg} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Movement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Stock Movement
            </h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              View Details
            </button>
          </div>
          <StockChart />
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Stock Distribution by Category
            </h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              View All
            </button>
          </div>
          <CategoryChart />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="xl:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Darkstore Locations
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">15 Active Stores</span>
            </div>
          </div>
          <LocationMap />
        </motion.div>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sales Trend
            </h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              Details
            </button>
          </div>
          <TrendChart />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;