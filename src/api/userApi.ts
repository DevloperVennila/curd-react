import axios from "axios";
import type { User } from "../types/user";
import { mockUserApi } from "../mock/userMockStore";

const API_URL = "http://localhost:3001/users";

export const getUsers = async () => {
  try {
    return await axios.get<User[]>(API_URL);
  } catch {
    return { data: await mockUserApi.getUsers() };
  }
};

export const createUser = async (data: User) => {
  try {
    return await axios.post(API_URL, data);
  } catch {
    return { data: await mockUserApi.createUser(data) };
  }
};

export const updateUser = async (id: number, data: User) => {
  try {
    return await axios.put(`${API_URL}/${id}`, data);
  } catch {
    return { data: await mockUserApi.updateUser(id, data) };
  }
};

export const deleteUser = async (id: number) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch {
    await mockUserApi.deleteUser(id);
  }
};
