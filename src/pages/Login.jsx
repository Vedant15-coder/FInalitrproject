import React, { useState } from 'react';
import { Warehouse, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const { mockLogin } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const roles = [
    { id: 'admin', name: 'Administrator', description: 'Full access to all features' },
    { id: 'manager', name: 'Manager', description: 'Access to inventory and reports' },
    { id: 'staff', name: 'Staff', description: 'View-only access' },
  ];

  const handleLogin = () => {
    mockLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full">
              <Warehouse className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Darkstore Inventory
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Modern inventory management system
          </p>
        </div>
        
        <div className="card space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Select Your Role
            </h3>
            <div className="space-y-3">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedRole === role.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 mr-3 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {role.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {role.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full btn-primary py-3 text-lg font-medium"
          >
            Continue as {roles.find(r => r.id === selectedRole)?.name}
          </button>
          
          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            This is a demo application. Click continue to access the dashboard.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;