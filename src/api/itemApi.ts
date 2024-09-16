import axios from 'axios';

const API_URL = 'https://api.example.com/items'; // Replace with your API endpoint

export interface Item {
  id: string;
  name: string;
}

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addItem = async (item: Item): Promise<Item> => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (
  id: string,
  updatedItem: Item,
): Promise<Item> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
