const axios = require("axios");

const API_URL = "http://localhost:5000/api/stock";

const fetchStockData = async (symbol) => {
  const response = await axios.get(`${API_URL}/${symbol}`);
  return response.data;
};

module.exports = { fetchStockData };
