import React from 'react';

interface InventoryItemProps {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description?: string;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ id, name, quantity, price, description }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">ID: {id}</p>
            <p className="text-gray-600">Quantity: {quantity}</p>
            <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
            {description && <p className="text-gray-600">Description: {description}</p>}
        </div>
    );
};

export default InventoryItem;