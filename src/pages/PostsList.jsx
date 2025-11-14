import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActions, Button, Typography, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const { token, user } = useAuth();

  const cargar = async () => {
    const data = await api.listPosts();
    setPosts(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar post?")) return;
    await api.deletePost(token, id);
    await cargar();
  };

  return (
    <Stack spacing={2}>
      {posts.map(p => (
      <Card key={p.id}>
        <CardContent>
          <Typography variant="h6">{p.titulo}</Typography> 
          <Typography variant="body2">{p.contenido}</Typography> 
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}> Creado: {new Date(p.fecha_creacion).toLocaleDateString()}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}> Actualizado: {new Date(p.fecha_actualizacion).toLocaleDateString()}</Typography>

          <Button component={Link} to={`/posts/${p.id}/reviews`} sx={{ mt: 1 }}>Ver Reviews</Button>
        </CardContent>

        <CardActions>
          {/* Botones de acción (Editar/Eliminar) - condicionales */}
          {user && (user.role === "admin" || user.user_id === p.usuario_id) && (
            <>
              <Button component={Link} to={`/posts/${p.id}/edit`}>Editar</Button>
              <Button color="error" onClick={() => eliminar(p.id)}>Eliminar</Button>
            </>
          )}
        </CardActions>
      </Card>
      ))}
    </Stack>
  );
}
