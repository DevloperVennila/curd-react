import axios from "axios";
import type { User } from "../types/user";
import { mockUserApi } from "../mock/userMockStore";

const API_URL = "http://localhost:3001/users";

// Function to check if JSON server is online
const isServerOnline = async (): Promise<boolean> => {
  try {
    await axios.get(API_URL, { timeout: 1000 });
    return true;
  } catch {
    return false;
  }
};

// Wrapper for getUsers
export const getUsers = async () => {
  const serverOnline = await isServerOnline();
  if (serverOnline) {
    try {
      const response = await axios.get<User[]>(API_URL);
      return response;
    } catch {
      console.warn("JSON server failed, fallback to mock store");
      const data = await mockUserApi.getUsers();
      return { data };
    }
  } else {
    // JSON server not running, immediately use localStorage
    const data = await mockUserApi.getUsers();
    return { data };
  }
};

export const createUser = async (data: User) => {
  const serverOnline = await isServerOnline();
  if (serverOnline) {
    try {
      const response = await axios.post<User>(API_URL, data);
      return response;
    } catch {
      console.warn("JSON server create failed, fallback to mock store");
      const mockData = await mockUserApi.createUser(data);
      return { data: mockData };
    }
  } else {
    const mockData = await mockUserApi.createUser(data);
    return { data: mockData };
  }
};

export const updateUser = async (id: number, data: User) => {
  const serverOnline = await isServerOnline();
  if (serverOnline) {
    try {
      const response = await axios.put<User>(`${API_URL}/${id}`, data);
      return response;
    } catch {
      console.warn("JSON server update failed, fallback to mock store");
      const mockData = await mockUserApi.updateUser(id, data);
      return { data: mockData };
    }
  } else {
    const mockData = await mockUserApi.updateUser(id, data);
    return { data: mockData };
  }
};

export const deleteUser = async (id: number) => {
  const serverOnline = await isServerOnline();
  if (serverOnline) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return { data: true };
    } catch {
      console.warn("JSON server delete failed, fallback to mock store");
      await mockUserApi.deleteUser(id);
      return { data: true };
    }
  } else {
    await mockUserApi.deleteUser(id);
    return { data: true };
  }
};
