import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { userFields } from "../schemas/userSchema";
import type { User } from "../types/user";

interface UserFormProps {
  onSubmit: (data: User) => void;
  defaultValues?: User;
  loading?: boolean;
}

export default function UserForm({
  onSubmit,
  defaultValues,
  loading = false
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({ defaultValues });

  const formFields = userFields.filter(f => f.showInForm);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {formFields.map(field => {
        const error = errors[field.name as keyof User];

        return (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            fullWidth
            margin="normal"
            {...register(field.name as keyof User, field.validation)}
            error={!!error}
            helperText={error?.message as string}
            slotProps={{
              inputLabel:
                field.type === "date" ? { shrink: true } : undefined
            }}
          />
        );
      })}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save User"}
      </Button>

    </Box>
  );
}
