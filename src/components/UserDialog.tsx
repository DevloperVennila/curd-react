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
    onClose: () => void;
    onSubmit: (data: User) => void;
}

export default function UserDialog({
    open,
    editingUser,
    onClose,
    onSubmit
}: Props) {
    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <DialogTitle>
                {editingUser ? "Edit User" : "Create User"}
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <UserForm
                    onSubmit={onSubmit}
                    defaultValues={editingUser || undefined}
                />
            </DialogContent>
        </Dialog>
    );
}
