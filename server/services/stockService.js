import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";

export const fetchStockData = async (symbol) => {
  const response = await axios.get(`${API_URL}/${symbol}`);
  return response.data;
};
