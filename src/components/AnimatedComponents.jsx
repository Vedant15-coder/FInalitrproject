import React from 'react';
import { motion } from 'framer-motion';

// Animated Card Component
export const AnimatedCard = ({ children, className = '', delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`card card-hover ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated Button Component
export const AnimatedButton = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseClass} ${className}`}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

// Animated Icon Component
export const AnimatedIcon = ({ Icon, className = '', size = 'w-5 h-5', ...props }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.2, 
        rotate: 10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      className={`inline-block ${className}`}
      {...props}
    >
      <Icon className={`${size} transition-colors duration-200`} />
    </motion.div>
  );
};

// Animated Number Counter
export const AnimatedNumber = ({ value, duration = 2, className = '' }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  
  React.useEffect(() => {
    const numericValue = typeof value === 'string' 
      ? parseInt(value.replace(/[^0-9]/g, '')) 
      : value;
    
    let startTime;
    let startValue = 0;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (numericValue - startValue) * easeOutQuart);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);
  
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {typeof value === 'string' && value.includes('₹') 
        ? `₹${displayValue.toLocaleString()}`
        : displayValue.toLocaleString()
      }
    </motion.span>
  );
};

// Animated Progress Bar
export const AnimatedProgressBar = ({ progress, className = '', color = 'bg-primary-500' }) => {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-2 rounded-full ${color}`}
      />
    </div>
  );
};

// Animated Badge
export const AnimatedBadge = ({ children, className = '', color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20',
    success: 'text-success-600 bg-success-50 dark:bg-success-900/20',
    warning: 'text-warning-600 bg-warning-50 dark:bg-warning-900/20',
    danger: 'text-danger-600 bg-danger-50 dark:bg-danger-900/20',
  };
  
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorClasses[color]} ${className}`}
    >
      {children}
    </motion.span>
  );
};

// Animated List Item
export const AnimatedListItem = ({ children, index = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated Modal/Dialog
export const AnimatedModal = ({ isOpen, onClose, children, className = '' }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Animated Loading Spinner
export const AnimatedSpinner = ({ size = 'w-8 h-8', className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${size} ${className}`}
    >
      <div className="w-full h-full border-4 border-gray-200 border-t-primary-600 rounded-full"></div>
    </motion.div>
  );
};

// Animated Notification Toast
export const AnimatedToast = ({ message, type = 'info', isVisible, onClose }) => {
  const typeClasses = {
    success: 'bg-success-50 border-success-200 text-success-800',
    error: 'bg-danger-50 border-danger-200 text-danger-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    info: 'bg-primary-50 border-primary-200 text-primary-800',
  };
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.3 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-4 right-4 p-4 rounded-lg border shadow-lg z-50 ${typeClasses[type]}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="ml-4 text-lg font-bold opacity-70 hover:opacity-100"
        >
          ×
        </motion.button>
      </div>
    </motion.div>
  );
};

// Animated Page Transition
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// Animated Stagger Container
export const AnimatedStagger = ({ children, staggerDelay = 0.1, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Animated Floating Action Button
export const AnimatedFAB = ({ Icon, onClick, className = '' }) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 ${className}`}
    >
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
};

// Animated Chart Container
export const AnimatedChartContainer = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`chart-container ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default {
  AnimatedCard,
  AnimatedButton,
  AnimatedIcon,
  AnimatedNumber,
  AnimatedProgressBar,
  AnimatedBadge,
  AnimatedListItem,
  AnimatedModal,
  AnimatedSpinner,
  AnimatedToast,
  PageTransition,
  AnimatedStagger,
  AnimatedFAB,
  AnimatedChartContainer,
};