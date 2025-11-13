import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(null); // { user_id, email, role, exp }

  useEffect(() => {
    if (!token) { setUser(null); return; }
    try {
      const claims = jwtDecode(token);
      // exp en segundos UNIX
      const isExpired = claims.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } else {
        setUser({ user_id: claims.user_id, email: claims.email, role: claims.role, exp: claims.exp });
      }
    } catch {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, logout, isAuth: !!user }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
