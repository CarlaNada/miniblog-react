import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from "@mui/material";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PostForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: "", content: "", category_id: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    api.getPost(id).then((p) => setForm({
      title: p.title, content: p.content, category_id: p.category_id || ""
    }));
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) await api.updatePost(token, id, form);
    else await api.createPost(token, form);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 640 }}>
        <TextField label="Título" name="title" value={form.title} onChange={onChange} required />
        <TextField label="Contenido" name="content" value={form.content} onChange={onChange} multiline minRows={4} required />
        <TextField label="Categoría (ID)" name="category_id" value={form.category_id} onChange={onChange} />
        <Button type="submit" variant="contained">{isEdit ? "Guardar cambios" : "Crear post"}</Button>
      </Stack>
    </form>
  );
}
