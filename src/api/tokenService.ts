import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_details";

export interface UserDetails {
  id: number;
  full_name: string;
  business_name: string;
  location: string;
  email: string;
  phone_number: string;
  description: string;
  image_path: string;
  tagline: string;
  role: string;
  settings: 
    {
      id: number;
      banner_image: string;
      theme: string;
      working_days: string;
      opening_hours: string;
      currency: string;
      store_id: number;
      createdAt: string;
      updatedAt: string;
    }
  Groups: [
    //customer groups
    {
      id: number;
      name: string;
      store_id: 1;
      createdAt: string;
      updatedAt: string;
    }
  ];
  products: [
    {
      id: number;
      name: string;
      price: number;
      category: string;
      description: string;
      purchaseDate: string;
      supplier: string;
      business_id: number;
      amount_left: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

export const setToken = (token: string): void => {
  // Use HttpOnly cookie for added security
  Cookies.set(TOKEN_KEY, token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 1, // 1 day expiration
  });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
};

export const setUserDetails = (userDetails: UserDetails): void => {
  // Store user details securely
  Cookies.set(USER_KEY, JSON.stringify(userDetails), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const getUserDetails = (): UserDetails | null => {
  const userDetails = Cookies.get(USER_KEY);
  return userDetails ? JSON.parse(userDetails) : null;
};
