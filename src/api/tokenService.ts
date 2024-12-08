import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_details';

export interface UserDetails {
  id: number;
  full_name: string;
  business_name: string;
  email: string;
  role: string;
  phone_number: string;
}

export const setToken = (token: string): void => {
  // Use HttpOnly cookie for added security
  Cookies.set(TOKEN_KEY, token, { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 1 // 1 day expiration
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
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
};

export const getUserDetails = (): UserDetails | null => {
  const userDetails = Cookies.get(USER_KEY);
  return userDetails ? JSON.parse(userDetails) : null;
};