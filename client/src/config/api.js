// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://stock-inventory-z8ce.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  },
  COMPANIES: {
    BASE: `${API_BASE_URL}/api/dashboard/companies`,
    STOCKS: (companyId) => `${API_BASE_URL}/api/dashboard/companies/${companyId}/stocks`,
    DATA: (companyId) => `${API_BASE_URL}/api/dashboard/companies/${companyId}/data`,
    PREDICTION: (companyId) => `${API_BASE_URL}/api/dashboard/companies/${companyId}/prediction`,
    CHAT: (companyId) => `${API_BASE_URL}/api/dashboard/companies/${companyId}/chat`,
  }
};

export default API_BASE_URL;

