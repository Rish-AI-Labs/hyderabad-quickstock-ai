/// <reference types="vite/client" />
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SalesData {
  timestamp: string;
  pincode: string;
  product_category: string;
  product_id: string;
  quantity_sold: number;
  unit_price: number;
  total_revenue: number;
  store_id: string;
  weather_condition: string;
  is_festival_day: boolean;
}

export interface ForecastData {
  forecast_id: string;
  product_id: string;
  pincode: string;
  forecast_date: string;
  predicted_demand: {
    p10: number;
    p50: number;
    p90: number;
  };
  confidence_score: number;
  influencing_factors: string[];
  created_at: string;
}

export interface IntelligenceQuery {
  query: string;
  context?: any;
}

export interface IntelligenceResponse {
  query: string;
  response: string;
  timestamp: string;
}

export interface WhatIfScenario {
  type: 'rain' | 'festival' | 'heatwave';
  historical_data?: any[];
}

// API Methods
export const apiService = {
  // Health check
  health: () => api.get('/api/v1/health'),

  // Sales data
  uploadSales: (data: SalesData[]) => api.post('/api/v1/sales/upload', data),
  getSales: (pincode: string, startDate: string, endDate: string) =>
    api.get('/api/v1/sales', { params: { pincode, start_date: startDate, end_date: endDate } }),

  // Forecasting
  generateForecast: (productId: string, pincode: string, days: number = 7) =>
    api.post('/api/v1/forecast', { product_id: productId, pincode, days }),
  getForecast: (productId: string, pincode: string) =>
    api.get(`/api/v1/forecast/${productId}/${pincode}`),

  // AI Intelligence
  IntelligenceQuery: (query: IntelligenceQuery) => api.post('/api/v1/Intelligence/query', query),
  whatIfScenario: (scenario: WhatIfScenario) => api.post('/api/v1/Intelligence/what-if', { scenario }),
  getRecommendations: (forecast: any) => api.post('/api/v1/Intelligence/recommendations', { forecast }),

  // Insights
  getInsights: (forecastId: string) => api.get(`/api/v1/insights/${forecastId}`),
};

export default api;
