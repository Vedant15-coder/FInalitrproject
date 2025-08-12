// src/types/index.ts

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    description?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: User) => Promise<void>;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}