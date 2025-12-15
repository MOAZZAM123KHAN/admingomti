// import API from './axiosConfig';

// export const patientService = {
//   // Get all patients
//   getPatients: async (params = {}) => {
//     const { page = 1, limit = 10, search, status } = params;
    
//     const queryParams = new URLSearchParams();
//     queryParams.append('page', page);
//     queryParams.append('limit', limit);
    
//     if (search) queryParams.append('search', search);
//     if (status && status !== 'all') queryParams.append('status', status);
    
//     const response = await API.get(`/admin/patients?${queryParams}`);
//     return response.data;
//   },

//   // Get single patient
//   getPatientById: async (id) => {
//     const response = await API.get(`/admin/patients/${id}`);
//     return response.data;
//   },

//   // Update patient
//   updatePatient: async (id, data) => {
//     const response = await API.put(`/admin/patients/${id}`, data);
//     return response.data;
//   },

//   // Create walk-in patient
//   createWalkInPatient: async (data) => {
//     const response = await API.post('/admin/patients/walkin', data);
//     return response.data;
//   },
// };


import API from './axiosConfig';

export const patientService = {
  // Get all patients (includes appointments)
  getPatients: async (params = {}) => {
    const { page = 1, limit = 10, search, status, startDate, endDate } = params;
    
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    if (search) queryParams.append('search', search);
    if (status && status !== 'all') queryParams.append('status', status);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    
    try {
      const response = await API.get(`/admin/patients?${queryParams}`);
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.pagination || {
          total: response.data.data?.length || 0,
          page: parseInt(page),
          limit: parseInt(limit)
        },
        message: response.data.message || 'Patients fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch patients',
        error: error.response?.data
      };
    }
  },

  // Get single patient
  getPatientById: async (id) => {
    try {
      const response = await API.get(`/admin/patients/${id}`);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Patient fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch patient',
        error: error.response?.data
      };
    }
  },

  // Update patient
  updatePatient: async (id, data) => {
    try {
      const response = await API.put(`/admin/patients/${id}`, data);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Patient updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update patient',
        error: error.response?.data
      };
    }
  },

  // Create walk-in patient
  createWalkInPatient: async (data) => {
    try {
      const response = await API.post('/admin/patients/walkin', data);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Walk-in patient registered successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to register walk-in patient',
        error: error.response?.data
      };
    }
  },

  // Get today's patients
  getTodayPatients: async () => {
    try {
      const response = await API.get('/admin/appointments/today');
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Today\'s patients fetched'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch today\'s patients',
        error: error.response?.data
      };
    }
  }
};