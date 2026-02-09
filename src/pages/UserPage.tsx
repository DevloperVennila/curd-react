import { Container, Box, Button } from "@mui/material";
import UserList from "../components/UserList";
import UserDialog from "../components/UserDialog";
import { useUsers } from "../hooks/useUsers";

export default function UserPage() {
  const {
    users,
    editingUser,
    openForm,
    setOpenForm,
    setEditingUser,
    submitUser,
    deleteUser
  } = useUsers();

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
        onClose={() => setOpenForm(false)}
        onSubmit={submitUser}
      />
    </Container>
  );
}
