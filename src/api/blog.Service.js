// // // import API from './axiosConfig';

// // // export const blogService = {
// // //   // Get all blogs
// // //   getBlogs: async (params = {}) => {
// // //     const { page = 1, limit = 10, status = 'all' } = params;
    
// // //     const queryParams = new URLSearchParams();
// // //     queryParams.append('page', page);
// // //     queryParams.append('limit', limit);
    
// // //     if (status && status !== 'all') queryParams.append('status', status);
    
// // //     const response = await API.get(`/admin/blogs?${queryParams}`);
// // //     return response.data;
// // //   },

// // //   // Get single blog
// // //   getBlogById: async (id) => {
// // //     const response = await API.get(`/admin/blogs/${id}`);
// // //     return response.data;
// // //   },

// // //   // Create blog
// // //   createBlog: async (data) => {
// // //     const response = await API.post('/admin/blogs', data);
// // //     return response.data;
// // //   },

// // //   // Update blog
// // //   updateBlog: async (id, data) => {
// // //     const response = await API.put(`/admin/blogs/${id}`, data);
// // //     return response.data;
// // //   },

// // //   // Delete blog
// // //   deleteBlog: async (id) => {
// // //     const response = await API.delete(`/admin/blogs/${id}`);
// // //     return response.data;
// // //   },
// // // };  

// // // blogService.js
// // import API from './axiosConfig';

// // export const blogService = {
// //   // Get all blogs
// //   getBlogs: async (params = {}) => {
// //     const { page = 1, limit = 10, status = 'all' } = params;
    
// //     const queryParams = new URLSearchParams();
// //     queryParams.append('page', page.toString());
// //     queryParams.append('limit', limit.toString());
    
// //     if (status && status !== 'all') queryParams.append('status', status);
    
// //     try {
// //       const response = await API.get(`/admin/blogs?${queryParams}`);
// //       return {
// //         success: true,
// //         data: response.data.data || response.data,
// //         pagination: response.data.pagination || {
// //           total: response.data.data?.length || 0,
// //           page: parseInt(page),
// //           limit: parseInt(limit)
// //         },
// //         message: response.data.message || 'Blogs fetched successfully'
// //       };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         message: error.response?.data?.message || 'Failed to fetch blogs',
// //         error: error.response?.data
// //       };
// //     }
// //   },

// //   // Get single blog
// //   getBlogById: async (id) => {
// //     try {
// //       const response = await API.get(`/admin/blogs/${id}`);
// //       return {
// //         success: true,
// //         data: response.data.data || response.data,
// //         message: response.data.message || 'Blog fetched successfully'
// //       };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         message: error.response?.data?.message || 'Failed to fetch blog',
// //         error: error.response?.data
// //       };
// //     }
// //   },

// //   // Create blog
// //   createBlog: async (data) => {
// //     try {
// //       const response = await API.post('/admin/blogs', data);
// //       return {
// //         success: true,
// //         data: response.data.data || response.data,
// //         message: response.data.message || 'Blog created successfully'
// //       };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         message: error.response?.data?.message || 'Failed to create blog',
// //         error: error.response?.data
// //       };
// //     }
// //   },

// //   // Update blog
// //   updateBlog: async (id, data) => {
// //     try {
// //       const response = await API.put(`/admin/blogs/${id}`, data);
// //       return {
// //         success: true,
// //         data: response.data.data || response.data,
// //         message: response.data.message || 'Blog updated successfully'
// //       };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         message: error.response?.data?.message || 'Failed to update blog',
// //         error: error.response?.data
// //       };
// //     }
// //   },

// //   // Delete blog
// //   deleteBlog: async (id) => {
// //     try {
// //       const response = await API.delete(`/admin/blogs/${id}`);
// //       return {
// //         success: true,
// //         data: response.data.data || response.data,
// //         message: response.data.message || 'Blog deleted successfully'
// //       };
// //     } catch (error) {
// //       return {
// //         success: false,
// //         message: error.response?.data?.message || 'Failed to delete blog',
// //         error: error.response?.data
// //       };
// //     }
// //   },
// // };

// import API from './axiosConfig';

// export const blogService = {
//   // Get all blogs
//   getBlogs: async (params = {}) => {
//     const { page = 1, limit = 10, status = 'all', search = '' } = params;
    
//     const queryParams = new URLSearchParams();
//     queryParams.append('page', page.toString());
//     queryParams.append('limit', limit.toString());
    
//     if (status && status !== 'all') queryParams.append('status', status);
//     if (search) queryParams.append('search', search);
    
//     try {
//       const response = await API.get(`/admin/blogs?${queryParams}`);
      
//       // Transform data for frontend: map 'title' to 'titleHindi'
//       const transformedData = (response.data.data || response.data || []).map(blog => ({
//         ...blog,
//         titleHindi: blog.title || blog.titleHindi || '',
//         titleEnglish: blog.titleEnglish || '',
//         readTime: typeof blog.readTime === 'string' ? parseInt(blog.readTime) || 5 : blog.readTime || 5
//       }));
      
//       return {
//         success: true,
//         data: transformedData,
//         pagination: response.data.pagination || {
//           total: response.data.data?.length || 0,
//           page: parseInt(page),
//           limit: parseInt(limit)
//         },
//         message: response.data.message || 'Blogs fetched successfully'
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to fetch blogs',
//         error: error.response?.data
//       };
//     }
//   },

//   // Get single blog
//   getBlogById: async (id) => {
//     try {
//       const response = await API.get(`/admin/blogs/${id}`);
//       const blog = response.data.data || response.data;
      
//       // Transform data for frontend: map 'title' to 'titleHindi'
//       const transformedBlog = {
//         ...blog,
//         titleHindi: blog.title || blog.titleHindi || '',
//         titleEnglish: blog.titleEnglish || '',
//         readTime: typeof blog.readTime === 'string' ? parseInt(blog.readTime) || 5 : blog.readTime || 5
//       };
      
//       return {
//         success: true,
//         data: transformedBlog,
//         message: response.data.message || 'Blog fetched successfully'
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to fetch blog',
//         error: error.response?.data
//       };
//     }
//   },

//   // Create blog
//   createBlog: async (data) => {
//     try {
//       // Transform data for backend: map 'titleHindi' to 'title'
//       const transformedData = {
//         title: data.titleHindi || data.titleEnglish || '', // Map titleHindi to title (required field)
//         titleEnglish: data.titleEnglish || '',
//         content: data.content || '',
//         excerpt: data.excerpt || '',
//         category: data.category || '',
//         readTime: data.readTime ? data.readTime.toString() : '5', // Convert to string
//         isPublished: data.isPublished || false
//       };
      
//       const response = await API.post('/admin/blogs', transformedData);
      
//       // Transform response data for frontend
//       const blog = response.data.data || response.data;
//       const transformedResponse = {
//         ...blog,
//         titleHindi: blog.title || blog.titleHindi || '',
//         titleEnglish: blog.titleEnglish || '',
//         readTime: typeof blog.readTime === 'string' ? parseInt(blog.readTime) || 5 : blog.readTime || 5
//       };
      
//       return {
//         success: true,
//         data: transformedResponse,
//         message: response.data.message || 'Blog created successfully'
//       };
//     } catch (error) {
//       console.error('Create blog error:', error.response?.data);
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to create blog',
//         error: error.response?.data
//       };
//     }
//   },

//   // Update blog
//   updateBlog: async (id, data) => {
//     try {
//       // Transform data for backend: map 'titleHindi' to 'title'
//       const transformedData = {
//         title: data.titleHindi || data.titleEnglish || '', // Map titleHindi to title
//         titleEnglish: data.titleEnglish || '',
//         content: data.content || '',
//         excerpt: data.excerpt || '',
//         category: data.category || '',
//         readTime: data.readTime ? data.readTime.toString() : '5', // Convert to string
//         isPublished: data.isPublished || false
//       };
      
//       const response = await API.put(`/admin/blogs/${id}`, transformedData);
      
//       // Transform response data for frontend
//       const blog = response.data.data || response.data;
//       const transformedResponse = {
//         ...blog,
//         titleHindi: blog.title || blog.titleHindi || '',
//         titleEnglish: blog.titleEnglish || '',
//         readTime: typeof blog.readTime === 'string' ? parseInt(blog.readTime) || 5 : blog.readTime || 5
//       };
      
//       return {
//         success: true,
//         data: transformedResponse,
//         message: response.data.message || 'Blog updated successfully'
//       };
//     } catch (error) {
//       console.error('Update blog error:', error.response?.data);
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to update blog',
//         error: error.response?.data
//       };
//     }
//   },

//   // Delete blog
//   deleteBlog: async (id) => {
//     try {
//       const response = await API.delete(`/admin/blogs/${id}`);
//       return {
//         success: true,
//         data: response.data.data || response.data,
//         message: response.data.message || 'Blog deleted successfully'
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to delete blog',
//         error: error.response?.data
//       };
//     }
//   },
// };

import API from './axiosConfig';

export const blogService = {
  getBlogs: async (params = {}) => {
    try {
      const response = await API.get('/admin/blogs', { params });
      return {
        success: true,
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch blogs',
      };
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await API.get(`/admin/blogs/${id}`);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch blog',
      };
    }
  },

  createBlog: async (data) => {
    try {
      const response = await API.post('/admin/blogs', data);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  updateBlog: async (id, data) => {
    try {
      const response = await API.put(`/admin/blogs/${id}`, data);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      };
    }
  },

  deleteBlog: async (id) => {
    try {
      await API.delete(`/admin/blogs/${id}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  },
};