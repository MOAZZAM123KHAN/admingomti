// import API from './axiosConfig';

// export const authService = {
//   // Admin login
//   login: async (data) => {
//     const response = await API.post('/admin/login', data);
//     return response.data;
//   },

//   // Get current admin info
//   getCurrentAdmin: async () => {
//     const response = await API.get('/admin/me');
//     return response.data;
//   },

//   // Change password
//   changePassword: async (data) => {
//     const response = await API.put('/admin/change-password', data);
//     return response.data;
//   },

//   // Logout
//   logout: () => {
//     localStorage.removeItem('adminToken');
//   },
// };

import API from './axiosConfig';

export const authService = {
  // Admin login
  login: async (data) => {
    try {
      console.log('🔧 AuthService: Making login request to /admin/login');
      console.log('🔧 Request data:', data);
      
      const response = await API.post('/admin/login', data);
      console.log('🔧 AuthService: Response received');
      console.log('🔧 Response status:', response.status);
      console.log('🔧 Response data structure:', Object.keys(response.data));
      
      return response.data;
    } catch (error) {
      console.error('🔧 AuthService Error Details:');
      console.error('- Error message:', error.message);
      console.error('- Error code:', error.code);
      console.error('- Has response?', !!error.response);
      console.error('- Has request?', !!error.request);
      
      if (error.response) {
        console.error('- Response status:', error.response.status);
        console.error('- Response data:', error.response.data);
      }
      
      throw error;
    }
  },

  // Get current admin info
  getCurrentAdmin: async () => {
    const response = await API.get('/admin/me');
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await API.put('/admin/change-password', data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
  },
};