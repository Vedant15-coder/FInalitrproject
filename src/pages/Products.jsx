import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Package, 
  Calendar, 
  User, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  AnimatedCard, 
  AnimatedButton, 
  AnimatedIcon, 
  AnimatedBadge,
  AnimatedStagger,
  PageTransition
} from '../components/AnimatedComponents';

const Products = () => {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 10;

  const products = [
    {
      id: 'PRD001',
      name: 'Samsung Galaxy S23',
      sku: 'SGS23-128-BLK',
      category: 'Electronics',
      quantity: 45,
      price: 79999,
      expiryDate: '2025-12-31',
      supplier: 'Samsung India',
      qualityScore: 95,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
      status: 'in-stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'PRD002',
      name: 'Apple iPhone 15',
      sku: 'IP15-256-BLU',
      category: 'Electronics',
      quantity: 23,
      price: 89999,
      expiryDate: '2026-03-15',
      supplier: 'Apple Inc.',
      qualityScore: 98,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
      status: 'low-stock',
      lastUpdated: '2024-01-14'
    },
    {
      id: 'PRD003',
      name: 'Organic Basmati Rice',
      sku: 'OBR-5KG-001',
      category: 'Groceries',
      quantity: 0,
      price: 899,
      expiryDate: '2024-06-30',
      supplier: 'Organic Foods Ltd',
      qualityScore: 87,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
      status: 'out-of-stock',
      lastUpdated: '2024-01-13'
    },
    {
      id: 'PRD004',
      name: 'Nike Air Max 270',
      sku: 'NAM270-42-WHT',
      category: 'Clothing',
      quantity: 67,
      price: 12999,
      expiryDate: '2025-08-20',
      supplier: 'Nike India',
      qualityScore: 92,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      status: 'in-stock',
      lastUpdated: '2024-01-16'
    },
    {
      id: 'PRD005',
      name: 'Philips Air Fryer',
      sku: 'PAF-HD9252-BLK',
      category: 'Home & Garden',
      quantity: 12,
      price: 8999,
      expiryDate: '2025-11-10',
      supplier: 'Philips Electronics',
      qualityScore: 89,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
      status: 'low-stock',
      lastUpdated: '2024-01-15'
    },
    // Add more products...
    {
      id: 'PRD006',
      name: 'Protein Powder Vanilla',
      sku: 'PPV-1KG-001',
      category: 'Sports',
      quantity: 34,
      price: 2499,
      expiryDate: '2024-09-15',
      supplier: 'Nutri Supplements',
      qualityScore: 85,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      status: 'in-stock',
      lastUpdated: '2024-01-12'
    }
  ];

  const categories = ['all', 'Electronics', 'Groceries', 'Clothing', 'Home & Garden', 'Sports', 'Books'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredProducts, sortBy, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'text-success-600 bg-success-50 dark:bg-success-900/20';
      case 'low-stock': return 'text-warning-600 bg-warning-50 dark:bg-warning-900/20';
      case 'out-of-stock': return 'text-danger-600 bg-danger-50 dark:bg-danger-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getQualityScoreColor = (score) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-warning-600';
    return 'text-danger-600';
  };

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
              Products
            </motion.h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Manage your product catalog and inventory
            </motion.p>
          </div>
          
          {hasPermission('write') && (
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {hasPermission('export') && (
                <AnimatedButton variant="secondary">
                  <AnimatedIcon Icon={Download} className="mr-2" />
                  Export
                </AnimatedButton>
              )}
              <AnimatedButton variant="primary">
                <AnimatedIcon Icon={Plus} className="mr-2" />
                Add Product
              </AnimatedButton>
            </motion.div>
          )}
        </motion.div>

        {/* Filters and Search */}
        <AnimatedCard delay={0.5}>
          <motion.div 
            className="flex flex-col lg:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <motion.div
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </motion.div>
                <motion.input
                  type="text"
                  placeholder="Search products, SKU, or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <motion.select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </motion.select>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <motion.select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="input-field"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="quantity-desc">Stock High-Low</option>
                <option value="quantity-asc">Stock Low-High</option>
                <option value="price-desc">Price High-Low</option>
                <option value="price-asc">Price Low-High</option>
                <option value="qualityScore-desc">Quality High-Low</option>
              </motion.select>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div 
            className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-400"
              animate={{ 
                color: sortedProducts.length > 0 ? "#10b981" : "#6b7280"
              }}
              transition={{ duration: 0.3 }}
            >
              Showing {paginatedProducts.length} of {sortedProducts.length} products
            </motion.p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Items per page:</span>
              <motion.select 
                className="input-field text-sm py-1"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </motion.select>
            </div>
          </motion.div>
        </AnimatedCard>

        {/* Products Table */}
        <AnimatedCard delay={0.8} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <motion.thead 
                className="bg-gray-50 dark:bg-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <tr>
                  {['Product', 'SKU', 'Category', 'Stock', 'Price', 'Quality', 'Status', 'Actions'].map((header, index) => (
                    <motion.th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (index * 0.05), duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </motion.thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence mode="wait">
                  {paginatedProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="table-row"
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <motion.img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <div>
                            <motion.div 
                              className="text-sm font-medium text-gray-900 dark:text-white"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {product.name}
                            </motion.div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {product.supplier}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                        >
                          {product.sku}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <motion.span
                          animate={{ 
                            color: product.quantity === 0 ? "#ef4444" : 
                                   product.quantity < 25 ? "#f59e0b" : "#10b981"
                          }}
                          className="font-semibold"
                        >
                          {product.quantity}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ₹{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${getQualityScoreColor(product.qualityScore)}`}>
                            {product.qualityScore}%
                          </span>
                          <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div 
                              className={`h-2 rounded-full ${
                                product.qualityScore >= 90 ? 'bg-success-500' :
                                product.qualityScore >= 80 ? 'bg-warning-500' : 'bg-danger-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${product.qualityScore}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AnimatedBadge 
                          color={
                            product.status === 'in-stock' ? 'success' :
                            product.status === 'low-stock' ? 'warning' : 'danger'
                          }
                          className="status-badge"
                        >
                          {product.status.replace('-', ' ')}
                        </AnimatedBadge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <motion.button 
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          {hasPermission('write') && (
                            <motion.button 
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                          )}
                          {hasPermission('delete') && (
                            <motion.button 
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              className="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              <div className="flex items-center">
                <motion.p 
                  className="text-sm text-gray-700 dark:text-gray-300"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </motion.p>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Previous
                </motion.button>
                <motion.button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatedCard>
      </div>
    </PageTransition>
  );
};

export default Products;