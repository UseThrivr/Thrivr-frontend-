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

// Types for registration and login
interface BusinessRegistrationData {
  fullname: string;
  business_name: string;
  location: string;
  email: string;
  phone_number: string;
  description: string;
  password: string;
  logo?: File;
}

interface LoginData {
  email: string;
  password: string;
}

// Error type for consistent error handling
interface ApiError {
  message: string;
  code?: string;
}

// Auth Context Type
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDetails | null;
  register: (data: BusinessRegistrationData) => Promise<unknown>;
  login: (data: LoginData) => Promise<unknown>;
  verifyOTP: (otp: string) => Promise<unknown>;
  resendOTP: () => Promise<unknown>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [user, setUser] = useState<UserDetails | null>(getUserDetails());

  const register = useCallback(async (data: BusinessRegistrationData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value instanceof File ? value : String(value));
      });

      const response = await axiosInstance.post('/api/v1/auth/signup/business', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      return response.data;
    } catch (error) {
      const apiError = error as { response?: { data: ApiError } };
      throw apiError.response?.data || new Error('Registration failed');
    }
  }, []);

  const login = useCallback(async (data: LoginData) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      
      // Store token and user details
      setToken(response.data.token);
      setUserDetails(response.data.user);
      
      setIsAuthenticated(true);
      setUser(response.data.user);
      
      return response.data;
    } catch (error) {
      const apiError = error as { response?: { data: ApiError } };
      throw apiError.response?.data || new Error('Login failed');
    }
  }, []);

  const verifyOTP = useCallback(async (otp: string) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/verify-otp', { otp });
      
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

  const resendOTP = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/v1/resend-otp');
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