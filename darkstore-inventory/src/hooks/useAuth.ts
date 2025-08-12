import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an async operation to check authentication status
        const checkAuthStatus = async () => {
            // Logic to check if user is authenticated
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    return { user, login, logout, loading };
};

export default useAuth;