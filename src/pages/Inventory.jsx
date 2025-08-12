import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Package, 
  Warehouse, 
  Clock,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Inventory = () => {
  const { hasPermission } = useAuth();
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const inventoryMetrics = [
    {
      title: 'Total Stock Value',
      value: '₹2,45,67,890',
      change: '+5.2%',
      trend: 'up',
      icon: Package,
      color: 'primary'
    },
    {
      title: 'Overstock Items',
      value: '127',
      change: '+12.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'warning'
    },
    {
      title: 'Understock Items',
      value: '43',
      change: '-8.7%',
      trend: 'down',
      icon: TrendingDown,
      color: 'danger'
    },
    {
      title: 'Stock Turnover Rate',
      value: '2.4x',
      change: '+0.3',
      trend: 'up',
      icon: RefreshCw,
      color: 'success'
    }
  ];

  const weeklyTrendData = [
    { name: 'Mon', inbound: 2400, outbound: 2100, net: 300 },
    { name: 'Tue', inbound: 1398, outbound: 2210, net: -812 },
    { name: 'Wed', inbound: 9800, outbound: 2290, net: 7510 },
    { name: 'Thu', inbound: 3908, outbound: 2000, net: 1908 },
    { name: 'Fri', inbound: 4800, outbound: 2181, net: 2619 },
    { name: 'Sat', inbound: 3800, outbound: 2500, net: 1300 },
    { name: 'Sun', inbound: 4300, outbound: 2100, net: 2200 },
  ];

  const monthlyTrendData = [
    { name: 'Jan', stock: 65000, target: 60000 },
    { name: 'Feb', stock: 59000, target: 62000 },
    { name: 'Mar', stock: 80000, target: 65000 },
    { name: 'Apr', stock: 81000, target: 68000 },
    { name: 'May', stock: 56000, target: 70000 },
    { name: 'Jun', stock: 55000, target: 72000 },
    { name: 'Jul', stock: 40000, target: 75000 },
  ];

  const categoryDistribution = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Groceries', value: 28, color: '#22c55e' },
    { name: 'Clothing', value: 18, color: '#f59e0b' },
    { name: 'Home & Garden', value: 12, color: '#ef4444' },
    { name: 'Others', value: 7, color: '#8b5cf6' },
  ];

  const alerts = [
    {
      id: 1,
      type: 'overstock',
      product: 'Samsung Galaxy S23',
      sku: 'SGS23-128-BLK',
      current: 145,
      optimal: 45,
      severity: 'high',
      location: 'Virar Central'
    },
    {
      id: 2,
      type: 'understock',
      product: 'iPhone 15 Pro',
      sku: 'IP15P-256-NAT',
      current: 3,
      optimal: 25,
      severity: 'critical',
      location: 'Andheri East'
    },
    {
      id: 3,
      type: 'expiring',
      product: 'Organic Milk',
      sku: 'OM-1L-001',
      current: 23,
      expiryDays: 2,
      severity: 'medium',
      location: 'Bandra West'
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory Assessment</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time inventory tracking and analytics
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          {hasPermission('export') && (
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const colors = getColorClasses(metric.color, metric.trend);
          
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-hover group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {metric.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className={`w-4 h-4 ${colors.trend}`} />
                    <span className={`text-sm font-medium ${colors.trend}`}>
                      {metric.change}
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
        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Stock Movement
            </h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field text-sm py-1"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f3f4f6'} />
                <XAxis 
                  dataKey="name" 
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                />
                <YAxis 
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDark ? '#f3f4f6' : '#111827'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  stackId="1"
                  stroke="#22c55e"
                  fill="rgba(34, 197, 94, 0.3)"
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stackId="2"
                  stroke="#ef4444"
                  fill="rgba(239, 68, 68, 0.3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Inventory by Category
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDark ? '#f3f4f6' : '#111827'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Monthly Stock vs Target
          </h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f3f4f6'} />
              <XAxis 
                dataKey="name" 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: isDark ? '#f3f4f6' : '#111827'
                }}
              />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stock" fill="#3b82f6" name="Actual Stock" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Stock Alerts
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {alerts.length} active alerts
          </span>
        </div>
        
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {alert.product}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SKU: {alert.sku} • {alert.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {alert.type === 'overstock' && `Current: ${alert.current}, Optimal: ${alert.optimal}`}
                    {alert.type === 'understock' && `Current: ${alert.current}, Optimal: ${alert.optimal}`}
                    {alert.type === 'expiring' && `${alert.current} units expiring in ${alert.expiryDays} days`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
                <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 text-sm font-medium">
                  Resolve
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Inventory;