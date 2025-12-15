// // // import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// // // interface User {
// // //   id: string;
// // //   username: string;
// // //   name: string;
// // //   role: 'admin' | 'receptionist';
// // // }

// // // interface AuthContextType {
// // //   user: User | null;
// // //   token: string | null;
// // //   isAuthenticated: boolean;
// // //   isLoading: boolean;
// // //   login: (username: string, password: string) => Promise<boolean>;
// // //   logout: () => void;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // // Mock credentials for demo
// // // const MOCK_USERS = [
// // //   { id: '1', username: 'admin', password: 'admin123', name: 'Dr. Admin', role: 'admin' as const },
// // //   { id: '2', username: 'reception', password: 'reception123', name: 'Reception Staff', role: 'receptionist' as const },
// // // ];

// // // export function AuthProvider({ children }: { children: ReactNode }) {
// // //   const [user, setUser] = useState<User | null>(null);
// // //   const [token, setToken] = useState<string | null>(null);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     // Check for existing session
// // //     const storedToken = localStorage.getItem('hospital_auth_token');
// // //     const storedUser = localStorage.getItem('hospital_auth_user');
    
// // //     if (storedToken && storedUser) {
// // //       try {
// // //         setToken(storedToken);
// // //         setUser(JSON.parse(storedUser));
// // //       } catch {
// // //         localStorage.removeItem('hospital_auth_token');
// // //         localStorage.removeItem('hospital_auth_user');
// // //       }
// // //     }
// // //     setIsLoading(false);
// // //   }, []);

// // //   const login = async (username: string, password: string): Promise<boolean> => {
// // //     // Simulate API call delay
// // //     await new Promise(resolve => setTimeout(resolve, 800));
    
// // //     const foundUser = MOCK_USERS.find(
// // //       u => u.username === username && u.password === password
// // //     );
    
// // //     if (foundUser) {
// // //       const { password: _, ...userWithoutPassword } = foundUser;
// // //       const mockToken = `jwt_${Date.now()}_${foundUser.id}`;
      
// // //       setUser(userWithoutPassword);
// // //       setToken(mockToken);
// // //       localStorage.setItem('hospital_auth_token', mockToken);
// // //       localStorage.setItem('hospital_auth_user', JSON.stringify(userWithoutPassword));
      
// // //       return true;
// // //     }
    
// // //     return false;
// // //   };

// // //   const logout = () => {
// // //     setUser(null);
// // //     setToken(null);
// // //     localStorage.removeItem('hospital_auth_token');
// // //     localStorage.removeItem('hospital_auth_user');
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         user,
// // //         token,
// // //         isAuthenticated: !!user && !!token,
// // //         isLoading,
// // //         login,
// // //         logout,
// // //       }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export function useAuth() {
// // //   const context = useContext(AuthContext);
// // //   if (context === undefined) {
// // //     throw new Error('useAuth must be used within an AuthProvider');
// // //   }
// // //   return context;
// // // }



// // import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// // import { authService } from '@/api/authService';

// // interface User {
// //   id: string;
// //   username: string;
// //   name: string;
// //   role: 'admin' | 'receptionist';
// // }

// // interface AuthContextType {
// //   user: User | null;
// //   token: string | null;
// //   isAuthenticated: boolean;
// //   isLoading: boolean;
// //   login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export function AuthProvider({ children }: { children: ReactNode }) {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [token, setToken] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     checkExistingSession();
// //   }, []);

// //   const checkExistingSession = async () => {
// //     try {
// //       const storedToken = localStorage.getItem('adminToken');
      
// //       if (storedToken) {
// //         // Verify token by fetching user info
// //         const response = await authService.getCurrentAdmin();
        
// //         if (response.success) {
// //           const backendUser = response.data;
          
// //           // Map backend response to your User interface
// //           const mappedUser: User = {
// //             id: backendUser._id || backendUser.id,
// //             username: backendUser.username,
// //             name: backendUser.name || backendUser.username,
// //             role: backendUser.role === 'receptionist' ? 'receptionist' : 'admin'
// //           };
          
// //           setUser(mappedUser);
// //           setToken(storedToken);
// //         } else {
// //           // Invalid token, clear storage
// //           localStorage.removeItem('adminToken');
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Session check failed:', error);
// //       localStorage.removeItem('adminToken');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
// //     try {
// //       setIsLoading(true);
// //       const response = await authService.login({ username, password });
      
// //       if (response.success) {
// //         const { token: backendToken, admin: backendUser } = response.data;
        
// //         // Map backend user to your User interface
// //         const mappedUser: User = {
// //           id: backendUser._id || backendUser.id,
// //           username: backendUser.username,
// //           name: backendUser.name || backendUser.username,
// //           role: backendUser.role === 'receptionist' ? 'receptionist' : 'admin'
// //         };
        
// //         setUser(mappedUser);
// //         setToken(backendToken);
// //         localStorage.setItem('adminToken', backendToken);
        
// //         return { success: true };
// //       } else {
// //         return { 
// //           success: false, 
// //           message: response.message || 'Invalid credentials' 
// //         };
// //       }
// //     } catch (error: any) {
// //       console.error('Login error:', error);
// //       return { 
// //         success: false, 
// //         message: error.response?.data?.message || 'Network error. Please try again.' 
// //       };
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     setToken(null);
// //     localStorage.removeItem('adminToken');
// //     window.location.href = '/login';
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         token,
// //         isAuthenticated: !!user && !!token,
// //         isLoading,
// //         login,
// //         logout,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { authService } from '@/api/authService';

// interface User {
//   id: string;
//   username: string;
//   name: string;
//   role: 'admin' | 'receptionist';
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkExistingSession();
//   }, []);

//   const checkExistingSession = async () => {
//     try {
//       const storedToken = localStorage.getItem('adminToken');
      
//       if (storedToken) {
//         // Verify token by fetching user info
//         const response = await authService.getCurrentAdmin();
        
//         if (response.success) {
//           const backendUser = response.data;
          
//           // Map backend response to your User interface
//           const mappedUser: User = {
//             id: backendUser._id || backendUser.id,
//             username: backendUser.username,
//             name: backendUser.name || backendUser.username,
//             role: backendUser.role === 'receptionist' ? 'receptionist' : 'admin'
//           };
          
//           setUser(mappedUser);
//           setToken(storedToken);
//         } else {
//           // Invalid token, clear storage
//           localStorage.removeItem('adminToken');
//         }
//       }
//     } catch (error) {
//       console.error('Session check failed:', error);
//       localStorage.removeItem('adminToken');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
//     try {
//       setIsLoading(true);
//       const response = await authService.login({ username, password });
      
//       if (response.success) {
//         const { token: backendToken, admin: backendUser } = response.data;
        
//         // Map backend user to your User interface
//         const mappedUser: User = {
//           id: backendUser._id || backendUser.id,
//           username: backendUser.username,
//           name: backendUser.name || backendUser.username,
//           role: backendUser.role === 'receptionist' ? 'receptionist' : 'admin'
//         };
        
//         setUser(mappedUser);
//         setToken(backendToken);
//         localStorage.setItem('adminToken', backendToken);
        
//         return { success: true };
//       } else {
//         return { 
//           success: false, 
//           message: response.message || 'Invalid credentials' 
//         };
//       }
//     } catch (error: any) {
//       console.error('Login error:', error);
//       // Check if it's a network error or API error
//       if (error.response) {
//         // API responded with error
//         return { 
//           success: false, 
//           message: error.response.data?.message || 'Invalid credentials' 
//         };
//       } else if (error.request) {
//         // Request made but no response
//         return { 
//           success: false, 
//           message: 'Network error. Please check your connection.' 
//         };
//       } else {
//         // Other errors
//         return { 
//           success: false, 
//           message: error.message || 'An error occurred' 
//         };
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     authService.logout(); // Clear token from storage
//     setUser(null);
//     setToken(null);
//     window.location.href = '/login';
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated: !!user && !!token,
//         isLoading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/api/authService';

interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'receptionist';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const storedToken = localStorage.getItem('adminToken');
      
      if (storedToken) {
        // Verify token by fetching user info
        const response = await authService.getCurrentAdmin();
        
        if (response && response.success) {
          const backendUser = response.data;
          
          // Map backend response to your User interface
          const mappedUser: User = {
            id: backendUser._id || backendUser.id || '',
            username: backendUser.username,
            name: backendUser.name || backendUser.username,
            role: backendUser.role === 'receptionist' ? 'receptionist' : 'admin'
          };
          
          setUser(mappedUser);
          setToken(storedToken);
        } else {
          // Invalid token, clear storage
          localStorage.removeItem('adminToken');
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      console.log('🔄 Starting login process...');
      
      const response = await authService.login({ username, password });
      console.log('📦 Login response:', response);
      
      if (!response) {
        console.error('❌ No response received');
        return { 
          success: false, 
          message: 'No response from server' 
        };
      }
      
      // FIXED: Handle response structure properly
      // Your backend returns: { success, message, token, admin }
      if (response.success) {
        // Get token - could be in response.token or response.data?.token
        const backendToken = response.token || response.data?.token;
        // Get admin - could be in response.admin or response.data?.admin
        const backendUser = response.admin || response.data?.admin;
        
        console.log('✅ Token found:', !!backendToken);
        console.log('✅ Admin found:', !!backendUser);
        
        if (!backendToken || !backendUser) {
          console.error('❌ Missing token or admin in response');
          console.log('Response structure:', JSON.stringify(response, null, 2));
          return { 
            success: false, 
            message: 'Server error: Missing authentication data' 
          };
        }
        
        // Map backend user to your User interface
        const mappedUser: User = {
          id: backendUser._id || backendUser.id || '',
          username: backendUser.username,
          name: backendUser.name || backendUser.username,
          role: backendUser.role === 'receptionist' ? 'receptionist' : 'admin'
        };
        
        console.log('✅ Mapped user:', mappedUser);
        
        setUser(mappedUser);
        setToken(backendToken);
        localStorage.setItem('adminToken', backendToken);
        
        console.log('✅ Login successful!');
        return { success: true };
      } else {
        console.warn('⚠️ Login failed:', response.message);
        return { 
          success: false, 
          message: response.message || 'Invalid credentials' 
        };
      }
    } catch (error: any) {
      console.error('🔴 Login error details:');
      console.error('Error:', error);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      
      // Handle different types of errors
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        console.error('🌐 Network error detected');
        return { 
          success: false, 
          message: 'Cannot connect to server. Please check: \n1. Backend is running on http://localhost:5000\n2. No CORS blocking the request' 
        };
      }
      
      if (error.response) {
        console.error('📡 Server error response:', error.response.status, error.response.data);
        return { 
          success: false, 
          message: error.response.data?.message || `Server error: ${error.response.status}` 
        };
      } else if (error.request) {
        console.error('📭 Request made but no response received');
        return { 
          success: false, 
          message: 'No response from server. Backend might be down.' 
        };
      } else {
        console.error('⚙️ Setup error:', error.message);
        return { 
          success: false, 
          message: error.message || 'An unexpected error occurred' 
        };
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}