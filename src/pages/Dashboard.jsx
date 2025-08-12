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
  Filter,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StockChart from '../components/charts/StockChart';
import CategoryChart from '../components/charts/CategoryChart';
import LocationMap from '../components/charts/LocationMap';
import TrendChart from '../components/charts/TrendChart';
import { useAuth } from '../contexts/AuthContext';
import { 
  AnimatedCard, 
  AnimatedNumber, 
  AnimatedIcon, 
  AnimatedButton,
  AnimatedChartContainer,
  AnimatedStagger,
  PageTransition
} from '../components/AnimatedComponents';

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
      <PageTransition>
        <div className="space-y-6">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-primary-600" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
          </motion.div>
          
          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i} 
                className="card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="animate-shimmer h-4 rounded w-3/4 mb-4"></div>
                <div className="animate-shimmer h-8 rounded w-1/2 mb-2"></div>
                <div className="animate-shimmer h-4 rounded w-1/4"></div>
              </motion.div>
            ))}
          </AnimatedStagger>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1 
              className="text-2xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Welcome back! Here's what's happening with your inventory.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field text-sm"
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </motion.select>
            
            {hasPermission('export') && (
              <AnimatedButton variant="secondary">
                <AnimatedIcon Icon={Download} className="mr-2" />
                Export
              </AnimatedButton>
            )}
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
            const colors = getColorClasses(kpi.color, kpi.trend);
            
            return (
              <AnimatedCard
                key={kpi.title}
                delay={index * 0.1}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <motion.p 
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index * 0.1) + 0.2 }}
                    >
                      {kpi.title}
                    </motion.p>
                    <AnimatedNumber 
                      value={kpi.value}
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                      duration={1.5}
                    />
                    <motion.div 
                      className="flex items-center space-x-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + 0.4 }}
                    >
                      <motion.div
                        animate={{ 
                          y: kpi.trend === 'up' ? [-2, 2, -2] : [2, -2, 2],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <TrendIcon className={`w-4 h-4 ${colors.trend}`} />
                      </motion.div>
                      <span className={`text-sm font-medium ${colors.trend}`}>
                        {kpi.change}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        vs last period
                      </span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className={`p-3 rounded-full ${colors.bg}`}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 0 10px rgba(59, 130, 246, 0.1)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </motion.div>
                </div>
              </AnimatedCard>
            );
          })}
        </AnimatedStagger>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Movement Chart */}
          <AnimatedChartContainer className="card">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                Monthly Stock Movement
              </motion.h3>
              <motion.button 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <StockChart />
            </motion.div>
          </AnimatedChartContainer>

          {/* Category Distribution */}
          <AnimatedChartContainer className="card">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                Stock Distribution by Category
              </motion.h3>
              <motion.button 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <CategoryChart />
            </motion.div>
          </AnimatedChartContainer>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Location Map */}
          <AnimatedChartContainer className="xl:col-span-2 card">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                Darkstore Locations
              </motion.h3>
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">15 Active Stores</span>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <LocationMap />
            </motion.div>
          </AnimatedChartContainer>

          {/* Trend Chart */}
          <AnimatedChartContainer className="card">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                Sales Trend
              </motion.h3>
              <motion.button 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Details
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <TrendChart />
            </motion.div>
          </AnimatedChartContainer>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;