import type { User } from "../types/user";

const STORAGE_KEY = "mock_users";

const getStoredUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const mockUserApi = {
  getUsers: async (): Promise<User[]> => {
    return getStoredUsers();
  },

  createUser: async (user: User): Promise<User> => {
    const users = getStoredUsers();
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  updateUser: async (id: number, data: User): Promise<User> => {
    const users = getStoredUsers().map(user =>
      user.id === id ? { ...data, id } : user
    );
    saveUsers(users);
    return { ...data, id };
  },

  deleteUser: async (id: number): Promise<void> => {
    const users = getStoredUsers().filter(user => user.id !== id);
    saveUsers(users);
  }
};
