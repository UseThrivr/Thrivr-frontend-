import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode, 
  useCallback 
} from 'react';
import axiosInstance from '../api/axios';
import { 
  setToken, 
  removeToken, 
  setUserDetails, 
  getUserDetails,
  getToken,
  UserDetails 
} from '../api/tokenService';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

// Types for registration and login
interface BusinessRegistrationData {
  full_name: string;
  business_name: string;
  location: string;
  email: string;
  phone_number: string;
  description: string;
  password?: string;
  oauth: boolean;
  logo?: File | null | string;
}

interface LoginData {
  email: string | null;
  password?: string;
  oauth: boolean
}

// Error type for consistent error handling
interface ApiError {
  message: string;
  code?: string;
}

interface OtpData {
  otp: string;
  email: string;
}

interface resendOtpData {
  email: string;
}

// Auth Context Type
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDetails | null;
  register: (data: BusinessRegistrationData) => Promise<unknown>;
  login: (data: LoginData) => Promise<unknown>;
  verifyOTP: (data: OtpData) => Promise<unknown>;
  resendOTP: (data: resendOtpData) => Promise<unknown>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [user, setUser] = useState<UserDetails | null>(getUserDetails());

  const register = useCallback(async (data: BusinessRegistrationData) => {
    try {
      // Create FormData for file upload
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   formData.append(key, value instanceof File ? value : String(value));
      // });
  
      const response = await axiosInstance.post('/api/v1/auth/signup/business', {...data});
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const serverError = error.response.data?.error || 'Unknown error from server';
  
          if (status === 422) {
            // Handle 422 specific errors like email already registered
            if (serverError.includes('Email already exists.')) {
              throw new Error('The email address is already registered. Please use a different email or Login.');
            }
  
            throw new Error(`Validation failed: ${serverError}`);
          }
  
          throw new Error(serverError);
        } else if (error.request) {
          // Handle cases where no response was received
          console.error('No response received:', error.request);
          throw new Error('No response from the server. Please try again later.');
        }
      }
  
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }, []);
  

  const login = useCallback(async (data: LoginData) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', {...data});
      
      // Store token and user details
      setToken(response.data.token);
      setUserDetails(response.data.user);
      
      setIsAuthenticated(true);
      setUser(response.data.user);
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const serverError = error.response.data?.error || 'Unknown error from server';
  
          if (status === 422 || status === 404) {
            // Handle 422 specific errors like email already registered
            if (serverError.includes('Invalid credentials.')) {
              throw new Error('The Email or Password is incorrect');
            }
  
            throw new Error(`Validation failed: ${serverError}`);
          }
  
          throw new Error(serverError);
        } else if (error.request) {
          // Handle cases where no response was received
          console.error('No response received:', error.request);
          throw new Error('No response from the server. Please try again later.');
        }
      }
  
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }, []);

  const verifyOTP = useCallback(async (data: OtpData) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/verify-otp', data);
      
      // Store token and user details after OTP verification
      setToken(response.data.token);
      setUserDetails(response.data.user);
      
      setIsAuthenticated(true);
      setUser(response.data.user);
      
      return response.data;
    } catch (error) {
      const apiError = error as { response?: { data: ApiError } };
      throw apiError.response?.data || new Error('OTP verification failed');
    }
  }, []);

  const resendOTP = useCallback(async (data: resendOtpData) => {
    try {
      const response = await axiosInstance.post('/api/v1/resend-otp', data);
      return response.data;
    } catch (error) {
      const apiError = error as { response?: { data: ApiError } };
      throw apiError.response?.data || new Error('Resend OTP failed');
    }
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      register,
      login,
      verifyOTP,
      resendOTP,
      logout
    }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;