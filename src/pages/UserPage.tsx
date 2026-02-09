import { Container, Box, Button, CircularProgress } from "@mui/material";
import UserList from "../components/UserList";
import UserDialog from "../components/UserDialog";
import { useUsers } from "../hooks/useUsers";

export default function UserPage() {
  const {
    users,
    editingUser,
    openForm,
    loading,
    initialLoading,
    setOpenForm,
    setEditingUser,
    submitUser,
    deleteUser
  } = useUsers();

  if (initialLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={3}
      >
        <h2>User Management</h2>

        <Button
          variant="contained"
          size="small"
          disabled={loading}
          onClick={() => {
            setEditingUser(null);
            setOpenForm(true);
          }}
        >
          Create User
        </Button>
      </Box>

      <UserList
        users={users}
        onEdit={user => {
          setEditingUser(user);
          setOpenForm(true);
        }}
        onDelete={deleteUser}

      />

      <UserDialog
        open={openForm}
        editingUser={editingUser}
        loading={loading}
        onClose={() => setOpenForm(false)}
        onSubmit={submitUser}
      />
    </Container>
  );
}
