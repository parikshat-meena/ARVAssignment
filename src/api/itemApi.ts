import axios from 'axios';

const API_URL = 'https://dummyjson.com/products'; // Replace with your API endpoint

export interface Item {
  id: string;
  name: string;
}

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
