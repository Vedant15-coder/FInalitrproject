import axios from 'axios';

const API_URL = 'https://api.example.com/inventory'; // Replace with your actual API URL

export const fetchInventory = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching inventory: ' + error.message);
    }
};

export const addInventoryItem = async (item) => {
    try {
        const response = await axios.post(API_URL, item);
        return response.data;
    } catch (error) {
        throw new Error('Error adding inventory item: ' + error.message);
    }
};

export const updateInventoryItem = async (id, item) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, item);
        return response.data;
    } catch (error) {
        throw new Error('Error updating inventory item: ' + error.message);
    }
};

export const deleteInventoryItem = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error('Error deleting inventory item: ' + error.message);
    }
};