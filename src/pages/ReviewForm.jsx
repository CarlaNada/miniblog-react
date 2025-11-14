import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from "@mui/material";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ReviewForm() {
  const { id } = useParams(); // postId
  const [texto, setTexto] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.createReview(token, id, { texto });
    navigate(`/posts/${id}/reviews`);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 640 }}>
        <TextField label="Tu reseña" value={texto} onChange={(e) => setTexto(e.target.value)}
          required />
        <Button type="submit" variant="contained">Publicar</Button>
      </Stack>
    </form>
  );
}
