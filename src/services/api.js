const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, { method = "GET", token, body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": body ? "application/json" : undefined,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
  return data;
}

export const api = {
  // Auth
  register: (payload) => request("/api/register", { method: "POST", body: payload }),
  login: (payload) => request("/api/login", { method: "POST", body: payload }),

  // Posts
  listPosts: () => request("/api/posts"),
  getPost: (id) => request(`/api/posts/${id}`),
  createPost: (token, payload) => request("/api/posts", { method: "POST", token, body: payload }),
  updatePost: (token, id, payload) => request(`/api/posts/${id}`, { method: "PUT", token, body: payload }),
  deletePost: (token, id) => request(`/api/posts/${id}`, { method: "DELETE", token }),

  // Reviews (comentarios) asociados a un post
  listReviews: (postId) => request(`/api/posts/${postId}/comments`),
  createReview: (token, postId, payload) =>
    request(`/api/posts/${postId}/comments`, { method: "POST", token, body: payload }),
  deleteReview: (token, reviewId) => request(`/api/comments/${reviewId}`, { method: "DELETE", token }),
};
