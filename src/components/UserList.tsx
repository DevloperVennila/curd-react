import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
  TableSortLabel,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useMemo } from "react";
import type { User } from "../types/user";
import { userFields } from "../schemas/userSchema";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof User>("firstName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // fields shown in table (schema-driven)
  const tableFields = userFields.filter(f => f.showInTable);

  const handleSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const valA = a[orderBy] ?? "";
      const valB = b[orderBy] ?? "";
      return order === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }, [users, order, orderBy]);

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (!users.length) {
    return <Box textAlign="center" p={2}>No data found</Box>;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f4ff" }}>
              <TableCell sx={{ fontWeight: "bold" }}>S.NO</TableCell>

              {tableFields.map(field => (
                <TableCell key={field.name} sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === field.name}
                    direction={orderBy === field.name ? order : "asc"}
                    onClick={() => handleSort(field.name as keyof User)}
                  >
                    {field.label.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}

              <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  {page * rowsPerPage + index + 1}
                </TableCell>

                {tableFields.map(field => (
                  <TableCell key={field.name}>
                    {user[field.name as keyof User]}
                  </TableCell>
                ))}

                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(user.id!)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
