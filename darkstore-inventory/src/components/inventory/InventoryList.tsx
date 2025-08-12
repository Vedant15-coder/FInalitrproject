import React from 'react';

const InventoryList: React.FC = () => {
    // Sample inventory items
    const inventoryItems = [
        { id: 1, name: 'Item 1', quantity: 10 },
        { id: 2, name: 'Item 2', quantity: 5 },
        { id: 3, name: 'Item 3', quantity: 20 },
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Inventory List</h2>
            <input
                type="text"
                placeholder="Search..."
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map(item => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 p-2">{item.id}</td>
                            <td className="border border-gray-300 p-2">{item.name}</td>
                            <td className="border border-gray-300 p-2">{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;