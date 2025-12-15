// import API from './axiosConfig';

// export const appointmentService = {
//   // Get appointments with filters
//   getAppointments: async (params = {}) => {
//     const { page = 1, limit = 10, search, status, dateFrom, dateTo } = params;
    
//     const queryParams = new URLSearchParams();
//     queryParams.append('page', page);
//     queryParams.append('limit', limit);
    
//     if (search) queryParams.append('search', search);
//     if (status && status !== 'all') queryParams.append('status', status);
//     if (dateFrom) queryParams.append('dateFrom', dateFrom);
//     if (dateTo) queryParams.append('dateTo', dateTo);
    
//     const response = await API.get(`/admin/appointments?${queryParams}`);
//     return response.data;
//   },

//   // Get today's appointments
//   getTodayAppointments: async () => {
//     const response = await API.get('/admin/appointments/today');
//     return response.data;
//   },

//   // Update appointment status
//   updateStatus: async (appointmentId, data) => {
//     const response = await API.put(`/admin/appointments/${appointmentId}/status`, data);
//     return response.data;
//   },
// };  

// appointmentService.js - Updated
import API from './axiosConfig';

export const appointmentService = {
  // Get appointments by date
  getAppointmentsByDate: async (date, status) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('date', date);
      if (status) queryParams.append('status', status);
      
      const response = await API.get(`/admin/appointments?${queryParams}`);
      return {
        success: true,
        data: response.data.data || response.data,
        total: response.data.count || response.data.data?.length || 0,
        message: response.data.message || 'Appointments fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointments',
        error: error.response?.data
      };
    }
  },

  // Get today's appointments
  getTodayAppointments: async () => {
    try {
      const response = await API.get('/admin/appointments/today');
      return {
        success: true,
        data: response.data.data || response.data,
        total: response.data.count || response.data.data?.length || 0,
        message: response.data.message || 'Today\'s appointments fetched'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch today\'s appointments',
        error: error.response?.data
      };
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (id, data) => {
    try {
      const response = await API.put(`/admin/appointments/${id}/status`, data);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Appointment status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update status',
        error: error.response?.data
      };
    }
  },

  // Book appointment (public route)
  bookAppointment: async (data) => {
    try {
      const response = await API.post('/appointments', data);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Appointment booked successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to book appointment',
        error: error.response?.data
      };
    }
  },

  // Get appointment status (public route)
  getAppointmentStatus: async (phone) => {
    try {
      const response = await API.get(`/appointments/status?phone=${phone}`);
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Appointment status fetched'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointment status',
        error: error.response?.data
      };
    }
  }
};