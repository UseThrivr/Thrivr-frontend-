import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import authAxios from "../api/authAxios";
import { setUserDetails, UserDetails } from "../api/tokenService";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./AuthContext";

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

interface updateSettingsData {
  theme: string;
  banner_image: File | null | string;
  working_days: string;
  opening_hours: string;
  currency: string; //format: +234XXX-XXXX-XXX
}

interface createTaskData {
  status: string;
  title: string;
  details: string;
  due_date: string;
  time: string;
  reminder: string;
}

interface addProductsData {
  name: string;
  price: string;
  category: string;
  description: string;
  purchase_date: string;
  supplier: string;
  logos: [];
}

interface addCustomerData {
  name: string;
  email: string;
  phone_number: string;
  group?: string;
  instagram?: string;
}

interface addStaffData {
  name: string;
  email: string;
  role: string;
  permissions: {
    products: boolean;
    manage_payments: boolean;
    edit_store_settings: boolean;
    order: boolean;
    customers: boolean;
    business_reports: boolean;
  };
}

interface forgetPasswordData {
  email: string;
  url: string; //url of the frontend website
}

interface resetPasswordData {
  signature: string;
  password: string; //url of the frontend website
}

interface makeOrderData {
  product_id: number[]; // [12, 10, 9]
  business_id: string;
  role: string;
  customer_name: string;
  customers_contact: string;
  sales_channel: string;
  payment_channel: string;
  order_date: string;
  payment_status: string;
  note: string;
}

// Data Context Type
interface DataContextType {
  updateBusiness: (data: BusinessUpdateData) => Promise<unknown>;
  getBusiness: (id?: string) => Promise<{
    data: UserDetails
  }>;
  addProducts: (data: addProductsData) => Promise<unknown>;
  createTask: (data: createTaskData) => Promise<unknown>;
  getProducts: (id?: string) => Promise<unknown>;
  updateSettings: (data: updateSettingsData) => Promise<unknown>;
  addCustomer: (data: addCustomerData) => Promise<unknown>;
  addStaff: (data: addStaffData) => Promise<unknown>;
  addGroup: (name: string) => Promise<unknown>;
  getTask: () => Promise<unknown>;
  markTaskDone: (id: string) => Promise<unknown>;
  makeOrder: (data: makeOrderData) => Promise<unknown>;
  forgetPassword: (data: forgetPasswordData) => Promise<unknown>;
  resetPassword: (data: resetPasswordData) => Promise<unknown>;
  deleteAccount: () => Promise<unknown>;
  updateOrder: ({
    id,
    payment_status,
  }: {
    id: string;
    payment_status: string;
  }) => Promise<unknown>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  // Post or Patch request
  const updateBusiness = useCallback(
    async (data: BusinessUpdateData) => {
      try {
        const formData = new FormData();

        // Append all fields to FormData
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value as string);
          }
        });

        // Make API call to update business details
        const response = await authAxios.patch("/api/v1/business", formData);

        // Update user details after successful API call
        setUserDetails({ ...user, ...response.data.user});

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }

        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred. Please try again.");
      }
    },
    []
  );
  const addProducts = useCallback(async (data: addProductsData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/products", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const createTask = useCallback(async (data: createTaskData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/tasks", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const updateSettings = useCallback(async (data: updateSettingsData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.patch(
        "/api/v1/business/settings",
        formData
      );

      setUserDetails({ ...response.data.user, id: user?.id });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const addCustomer = useCallback(async (data: addCustomerData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/customer", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const addStaff = useCallback(async (data: addStaffData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/staff", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const makeOrder = useCallback(async (data: makeOrderData) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/order", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const addGroup = useCallback(async (name: string) => {
    try {
      const response = await authAxios.post("/api/v1/group", name);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const forgetPassword = useCallback(async (data: forgetPasswordData) => {
    const formData = new FormData();
    try {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/forgot-password", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const resetPassword = useCallback(async (data: resetPasswordData) => {
    const formData = new FormData();
    try {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await authAxios.post("/api/v1/reset-password", formData);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  // Get resqusts

  const getBusiness = useCallback(async (id?: string) => {
    try {
      const response = await authAxios.get(`/api/v1/business/${user?.id || id}`);

      // Update user details after successful API call
      setUserDetails({ ...response.data.data, id: user?.id });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, [user?.id]);

  const getProducts = useCallback(async (id?: string) => {
    try {
      const response = await authAxios.get(`/api/v1/products/${id ? id : ""}`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);
  const getTask = useCallback(async (id?: string) => {
    try {
      const response = await authAxios.get(`/api/v1/tasks/${id ? id : ""}`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const markTaskDone = useCallback(async (id: string) => {
    try {
      const response = await authAxios.patch(`/api/v1/tasks/${id}/done`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  const updateOrder = useCallback(
    async ({ id, payment_status }: { id: string; payment_status: string }) => {
      try {
        const response = await authAxios.patch(`/api/v1/order/${id}`, {
          payment_status,
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }

        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred. Please try again.");
      }
    },
    []
  );

  const deleteAccount = useCallback(async () => {
    try {
      const response = await authAxios.delete(`/api/v1/user/`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        updateBusiness,
        getBusiness,
        addProducts,
        getProducts,
        createTask,
        updateSettings,
        addCustomer,
        addStaff,
        addGroup,
        getTask,
        markTaskDone,
        makeOrder,
        updateOrder,
        deleteAccount,
        forgetPassword,
        resetPassword,
      }}
    >
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
