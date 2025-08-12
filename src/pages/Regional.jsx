import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Package, 
  TrendingUp, 
  Star,
  Clock,
  Phone,
  Mail,
  Navigation,
  Warehouse,
  Activity,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const Regional = () => {
  const { isDark } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState('virar');

  const locations = {
    virar: {
      id: 'virar',
      name: 'Virar Central',
      address: 'Shop No. 15-18, Ground Floor, Virar Central Mall, Virar West, Mumbai - 401303',
      coordinates: [19.4559, 72.7933],
      capacity: 85,
      currentStock: 4283,
      maxCapacity: 5000,
      staffCount: 12,
      performanceScore: 94,
      status: 'active',
      manager: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'virar@darkstore.com',
      operatingHours: '6:00 AM - 11:00 PM',
      establishedDate: '2023-03-15',
      categories: [
        { name: 'Electronics', stock: 1245, capacity: 1500 },
        { name: 'Groceries', stock: 1890, capacity: 2000 },
        { name: 'Clothing', stock: 678, capacity: 800 },
        { name: 'Home & Garden', stock: 470, capacity: 700 }
      ]
    },
    andheri: {
      id: 'andheri',
      name: 'Andheri East',
      address: 'Unit 201-205, Andheri Trade Center, Andheri East, Mumbai - 400069',
      coordinates: [19.1136, 72.8697],
      capacity: 72,
      currentStock: 3896,
      maxCapacity: 5400,
      staffCount: 15,
      performanceScore: 89,
      status: 'active',
      manager: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'andheri@darkstore.com',
      operatingHours: '5:30 AM - 11:30 PM',
      establishedDate: '2022-11-20',
      categories: [
        { name: 'Electronics', stock: 1456, capacity: 1600 },
        { name: 'Groceries', stock: 1234, capacity: 2200 },
        { name: 'Clothing', stock: 789, capacity: 900 },
        { name: 'Home & Garden', stock: 417, capacity: 700 }
      ]
    },
    bandra: {
      id: 'bandra',
      name: 'Bandra West',
      address: '3rd Floor, Bandra Business Hub, Linking Road, Bandra West, Mumbai - 400050',
      coordinates: [19.0596, 72.8295],
      capacity: 91,
      currentStock: 4567,
      maxCapacity: 5000,
      staffCount: 18,
      performanceScore: 96,
      status: 'active',
      manager: 'Arjun Patel',
      phone: '+91 98765 43212',
      email: 'bandra@darkstore.com',
      operatingHours: '6:00 AM - 12:00 AM',
      establishedDate: '2022-08-10',
      categories: [
        { name: 'Electronics', stock: 1567, capacity: 1600 },
        { name: 'Groceries', stock: 1987, capacity: 2000 },
        { name: 'Clothing', stock: 723, capacity: 800 },
        { name: 'Home & Garden', stock: 290, capacity: 600 }
      ]
    }
  };

  const currentLocation = locations[selectedLocation];

  const performanceData = [
    { month: 'Jan', orders: 2400, efficiency: 85 },
    { month: 'Feb', orders: 1398, efficiency: 88 },
    { month: 'Mar', orders: 9800, efficiency: 92 },
    { month: 'Apr', orders: 3908, efficiency: 89 },
    { month: 'May', orders: 4800, efficiency: 94 },
    { month: 'Jun', orders: 3800, efficiency: 91 },
  ];

  const categoryData = currentLocation.categories.map(cat => ({
    ...cat,
    utilization: Math.round((cat.stock / cat.capacity) * 100)
  }));

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getCapacityColor = (capacity) => {
    if (capacity >= 90) return 'bg-danger-500';
    if (capacity >= 75) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Regional Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor darkstore locations across regions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="input-field min-w-48"
          >
            {Object.values(locations).map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
              <Warehouse className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentLocation.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
                {currentLocation.address}
              </p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentLocation.operatingHours}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {currentLocation.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {currentLocation.email}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              currentLocation.status === 'active' 
                ? 'text-success-600 bg-success-50 dark:bg-success-900/20'
                : 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
            }`}>
              {currentLocation.status.charAt(0).toUpperCase() + currentLocation.status.slice(1)}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentLocation.capacity}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Capacity Used</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${getCapacityColor(currentLocation.capacity)}`}
                style={{ width: `${currentLocation.capacity}%` }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentLocation.currentStock.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Stock</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              of {currentLocation.maxCapacity.toLocaleString()} max
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentLocation.staffCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Staff Members</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Manager: {currentLocation.manager}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${getPerformanceColor(currentLocation.performanceScore)}`}>
              {currentLocation.performanceScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Performance Score</div>
            <div className="flex items-center justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(currentLocation.performanceScore / 20)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Category-wise Stock Distribution
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.stock.toLocaleString()} / {category.capacity.toLocaleString()} units
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    category.utilization >= 90 ? 'text-danger-600' :
                    category.utilization >= 75 ? 'text-warning-600' : 'text-success-600'
                  }`}>
                    {category.utilization}%
                  </div>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        category.utilization >= 90 ? 'bg-danger-500' :
                        category.utilization >= 75 ? 'bg-warning-500' : 'bg-success-500'
                      }`}
                      style={{ width: `${category.utilization}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f3f4f6'} />
                <XAxis 
                  type="number"
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDark ? '#f3f4f6' : '#111827'
                  }}
                />
                <Bar dataKey="stock" fill="#3b82f6" name="Current Stock" radius={[0, 4, 4, 0]} />
                <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Monthly Performance Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f3f4f6'} />
                <XAxis 
                  dataKey="month" 
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
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                  name="Orders Processed"
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 6 }}
                  name="Efficiency %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Operational Metrics
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Order Fulfillment Rate</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-success-600">98.5%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                  <Clock className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Avg. Processing Time</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Per order</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12.3 min</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success-50 dark:bg-success-900/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Revenue Growth</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Month over month</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-success-600">+15.7%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-danger-600 dark:text-danger-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Active Issues</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Requiring attention</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-danger-600">3</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Regional;