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
  Box,
  TextField
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
  loading?: boolean;
}


export default function UserList({ users, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof User>("firstName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  // fields shown in table
  const tableFields = userFields.filter(f => f.showInTable);

  const handleSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // 🔍 SEARCH FILTER
  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();

    return users.filter(user =>
      user.firstName?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  }, [users, search]);

  // ↕️ SORT
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const valA = a[orderBy] ?? "";
      const valB = b[orderBy] ?? "";
      return order === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }, [filteredUsers, order, orderBy]);

  // 📄 PAGINATION
  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (!filteredUsers.length) {
    return (
      <Box textAlign="center" p={2}>
        <TextField
          label="Search by name or email"
          size="small"
          fullWidth
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ mb: 2 }}
        />
        No data found
      </Box>
    );
  }

  return (
    <Paper>
      {/* 🔎 SEARCH BOX */}
      <Box p={2}>
        <TextField
          label="Search by first name or email"
          size="small"
          fullWidth
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      <TableContainer>
        <Table>
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

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={filteredUsers.length}
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
