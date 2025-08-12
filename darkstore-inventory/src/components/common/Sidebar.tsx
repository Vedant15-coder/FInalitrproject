import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-5">
            <h2 className="text-lg font-bold mb-4">Darkstore Inventory</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                </li>
                <li className="mb-2">
                    <Link to="/inventory" className="hover:text-gray-400">Inventory</Link>
                </li>
                <li className="mb-2">
                    <Link to="/login" className="hover:text-gray-400">Login</Link>
                </li>
                <li className="mb-2">
                    <Link to="/register" className="hover:text-gray-400">Register</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;