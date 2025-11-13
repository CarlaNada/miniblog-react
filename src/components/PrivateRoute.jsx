import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// roles?: array opcional, si se pasa exige que el rol del user esté incluido
export default function PrivateRoute({ children, roles }) {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
