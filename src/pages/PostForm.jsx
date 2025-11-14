import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PostForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  //nombres back
  const [form, setForm] = useState({ titulo: "", contenido: "", categoria_id: "" });

  const [categories, setCategories] = useState([]);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const { token } = useAuth();
  const navigate = useNavigate();

  //lista de categorias
  useEffect(() => {
    api.listCategories().then(setCategories);
  }, []);

  //datos del post para editar
  useEffect(() => {
    if (!isEdit) return;
    api.getPost(id).then((p) => setForm({
      titulo: p.titulo, contenido: p.contenido, categoria_id: p.categoria_id ? String(p.categoria_id) : "",
    }));
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // convertir category_id de vuelta a número
    const payload = {
      titulo: form.titulo,
      contenido: form.contenido,
      categoria_id: form.categoria_id
        ? Number(form.categoria_id)
        : null,
    };

    if (isEdit) {
      await api.updatePost(token, id, form);
    }else {
      await api.createPost(token, form);
    }
    navigate("/");
  };


  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 640 }}>
        <TextField label="Título" name="titulo" value={form.titulo} onChange={onChange} required />
        <TextField label="Contenido" name="contenido" value={form.contenido} onChange={onChange} multiline minRows={4} required />
        <TextField 
          select 
          label="Categoría" 
          name="categoria_id" 
          value={form.categoria_id} 
          onChange={onChange}
          required
        >
          <MenuItem value="">Seleccionar Categoría</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={String(cat.id)}> 
              {cat.nombre} 
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">{isEdit ? "Guardar cambios" : "Crear post"}</Button>
      </Stack>
    </form>
  );
}
