// dashboardService.js
import API from './axiosConfig';

export const dashboardService = {
  // Get dashboard statistics with recent data
  getDashboardStats: async () => {
    try {
      const response = await API.get('/admin/dashboard/stats');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Dashboard stats fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch dashboard stats',
        error: error.response?.data
      };
    }
  },

  // Get quick stats
  getQuickStats: async () => {
    try {
      const response = await API.get('/admin/dashboard/quick-stats');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Quick stats fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch quick stats',
        error: error.response?.data
      };
    }
  }
};