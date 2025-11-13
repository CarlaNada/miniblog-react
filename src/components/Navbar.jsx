import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuth, user, logout } = useAuth();
    return (
    <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
            <Button component={Link} to="/" color="inherit">Posts</Button>
            <Button component={Link} to="/posts/new" color="inherit">Nuevo Post</Button>

            <Box sx={{ flex: 1 }} />
            {!isAuth ? (
            <>
                <Button component={Link} to="/register" color="inherit">Registro</Button>
                <Button component={Link} to="/login" color="inherit">Login</Button>
            </>
            ) : (
            <>
                <span>Rol: {user.role}</span>
                {/* Link admin-only (ejemplo) */}
                {user.role === "admin" && <Button component={Link} to="/admin" color="inherit">Admin</Button>}
                <Button onClick={logout} color="inherit">Logout</Button>
            </>
            )}
        </Toolbar>
    </AppBar>
    );
}
