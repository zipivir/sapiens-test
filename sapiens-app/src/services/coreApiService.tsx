
import axios from "axios";
import Error from "next/error";

const BE_BASE_API = "http://localhost:8000/api/v1/";

const setTokenInCookie = (token: string) => {
  // document.cookie = `token=${token}; HttpOnly; Secure`;
  document.cookie = `token=${token}; SameSite=Strict; Secure`;
};

const getTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';').reduce((acc: { [key: string]: string }, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});

  return cookies.token || null;
};


export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BE_BASE_API}users/login`, { username, password });
    setTokenInCookie(response.data.token);
    return response.data;
  } catch (error:any) {
    console.error("Error on login user: ", error.message);
    return [];
  }
};

export const signUp = async (email: string, username: string, password: string) => {
  try {
    const headers = {
      'Authorization': `Bearer ${getTokenFromCookie()}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${BE_BASE_API}users/signup`, { headers });
    return response.data;
  } catch (error:any) {
    console.error("Error on login user: ", error.message);
    return [];
  }
};

export const getAllProperties = async (searchTerm: String) => {
  try {
    const headers = {
      'Authorization': `Bearer ${getTokenFromCookie()}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.get(`${BE_BASE_API}properties?search=${searchTerm}`, { headers });
    return {code: response.status, data: response.data};
  } catch (error: any) {
    console.error("Error fetching properties:", error);
    return error;
  }
};
