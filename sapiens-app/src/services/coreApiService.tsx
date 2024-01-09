
import axios from "axios";

const BE_BASE_API = "http://localhost:8000/api/v1/";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BE_BASE_API}users/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error:any) {
    console.error("Error on login user: ", error.message);
    return [];
  }
};

export const signUp = async (email: string, username: string, password: string) => {
  try {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(`${BE_BASE_API}users/signup`, { headers });
    return response.data;
  } catch (error:any) {
    console.error("Error on login user: ", error.message);
    return [];
  }
};

export const getAllProperties = async () => {
  try {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.get(`${BE_BASE_API}properties`, { headers });
    return response.data;
  } catch (error:any) {
    console.error("Error fetching cards:", error.message);
    return [];
  }
};
