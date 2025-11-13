import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import PostsList from "./pages/PostsList";
import PostForm from "./pages/PostForm";
import ReviewsList from "./pages/ReviewsList";
import ReviewForm from "./pages/ReviewForm";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/posts/new"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/posts/:id/edit"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />

          <Route path="/posts/:id/reviews" element={<ReviewsList />} />

          <Route
            path="/posts/:id/reviews/new"
            element={
              <PrivateRoute>
                <ReviewForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}
