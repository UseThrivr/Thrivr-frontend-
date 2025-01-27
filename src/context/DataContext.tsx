import React, { createContext, useContext, ReactNode, useCallback } from "react";
import authAxios from "../api/authAxios";
import { getUserDetails, setUserDetails } from "../api/tokenService";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// Types for updating business details
interface BusinessUpdateData {
  id?: number;
  full_name: string;
  business_name: string;
  location: string;
  email: string;
  phone_number: string;
  description: string;
  logo?: File | null | string; // j
}

// Data Context Type
interface DataContextType {
  updateBusiness: (data: BusinessUpdateData) => Promise<unknown>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = getUserDetails()
  const updateBusiness = useCallback(async (data: BusinessUpdateData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      // Make API call to update business details
      const response = await authAxios.patch("/api/v1/business", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update user details after successful API call
      setUserDetails({...response.data.user, id: user?.id});

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.error || "Unknown error";
        const status = error.response?.status || "No status";

        throw new Error(`Request failed with status ${status}: ${serverError}`);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, [user?.id]);

  return (
    <DataContext.Provider value={{ updateBusiness }}>
      {children}
      <Toaster />
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
