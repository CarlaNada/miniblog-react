import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { List, ListItem, ListItemText, Stack, Button } from "@mui/material";

export default function ReviewsList() {
  const { id } = useParams(); // postId
  const [items, setItems] = useState([]);
  const { token, user } = useAuth();

  const cargar = async () => {
    const data = await api.listReviews(id);
    setItems(data);
  };

  useEffect(() => {
    cargar();
  }, [id]);

  const eliminar = async (rid) => {
    if (!confirm("¿Eliminar review?")) return;
    await api.deleteReview(token, rid);
    await cargar();
  };

  return (
    <Stack spacing={2}>
      <Button component={Link} to={`/posts/${id}/reviews/new`}>Nueva review</Button>
      <List>
        {items.map(r => (
          <ListItem
            key={r.id}
            secondaryAction={
              user &&
              (user.role === "admin" ||
                user.role === "moderator" ||
                user.user_id === r.user_id) && (
                <Button
                  color="error"
                  onClick={() => eliminar(r.id)}
                >
                  Eliminar
                </Button>
              )
            }
          >
            {/* el backend devuelve text y user_id */}
            <ListItemText
              primary={r.text}
              secondary={`user_id: ${r.user_id}`}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
