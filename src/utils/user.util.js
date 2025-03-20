import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    await axios.post(API_URL, data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    await axios.patch(`${API_URL}/${id}`, data);
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const checkLogin = async (email, password) => {
  const response = await axios.get(
    `http://localhost:4000/users/?email=${email}&password=${password}`
  );
  if (response.data.length === 0) {
    return null;
  }
  return response.data[0];
};
