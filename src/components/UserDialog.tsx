import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserForm from "./UserForm";
import type { User } from "../types/user";

interface Props {
  open: boolean;
  editingUser: User | null;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
}

export default function UserDialog({
  open,
  editingUser,
  loading,
  onClose,
  onSubmit
}: Props) {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && !loading) {
          onClose();
        }
      }}
    >
      <DialogTitle>
        {editingUser ? "Edit User" : "Create User"}
        <IconButton
          onClick={onClose}
          disabled={loading}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <UserForm
          onSubmit={onSubmit}
          defaultValues={editingUser || undefined}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
