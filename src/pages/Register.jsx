import { useState } from "react";
import { api } from "../services/api";
import { TextField, Button, Stack, MenuItem } from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // si tu backend permite role en /api/register, enviá role; si no, sacalo
    await api.register({ username: form.username, email: form.email, password: form.password });
    alert("Usuario creado. Ahora logueate.");
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 420 }}>
        <TextField label="Nombre" name="username" value={form.username} onChange={onChange} required />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={onChange} required />
        <TextField select label="Rol" name="role" value={form.role} onChange={onChange}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="moderator">Moderator</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">Registrarme</Button>
      </Stack>
    </form>
  );
}
