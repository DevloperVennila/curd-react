import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { User } from "../types/user";
import * as api from "../api/userApi";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const [loading, setLoading] = useState(false); // create/update/delete
  const [initialLoading, setInitialLoading] = useState(true); // fetch list

  /* Load Users */
  const loadUsers = async () => {
    try {
      const res = await api.getUsers();
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const checkDuplicate = (data: User) => {
    for (const user of users) {
      if (editingUser && user.id === editingUser.id) continue;

      if (user.email === data.email) return "Email already exists";
      if (user.phone === data.phone) return "Phone already exists";
      if (user.firstName === data.firstName)
        return "First name already exists";
    }
    return null;
  };

  const submitUser = async (data: User) => {
    if (loading) return;

    const error = checkDuplicate(data);
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      editingUser
        ? await api.updateUser(editingUser.id!, data)
        : await api.createUser(data);

      toast.success(editingUser ? "User updated" : "User created");
      setEditingUser(null);
      setOpenForm(false);
      loadUsers();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    if (loading) return;

    setLoading(true);
    try {
      await api.deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    editingUser,
    openForm,
    loading,
    initialLoading,
    setOpenForm,
    setEditingUser,
    submitUser,
    deleteUser
  };
}
