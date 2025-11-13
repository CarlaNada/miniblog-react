import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActions, Button, Typography, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const { token, user } = useAuth();

  const cargar = async () => setPosts(await api.listPosts());
  useEffect(() => { cargar(); }, []);

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
            <Typography variant="h6">{p.title}</Typography>
            <Typography variant="body2">{p.content}</Typography>
            <Button component={Link} to={`/posts/${p.id}/reviews`} sx={{ mt: 1 }}>Ver Reviews</Button>
          </CardContent>
          <CardActions>
            {/* Mostrar acciones si soy autor o admin (el backend valida igual) */}
            {user && (user.role === "admin" || user.user_id === p.author_id) && (
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
