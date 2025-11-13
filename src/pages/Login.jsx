import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await api.login(form);
    login(data.access_token);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 420 }}>
        <TextField label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
        <TextField label="Password" name="password" type="password" value={form.password} onChange={onChange} required />
        <Button type="submit" variant="contained">Ingresar</Button>
      </Stack>
    </form>
  );
}
