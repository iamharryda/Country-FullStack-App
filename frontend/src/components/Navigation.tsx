import { AppBar, Button, Toolbar, Box, Typography, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DarkMode, Favorite, LightMode, Lock } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useCustomTheme } from "../theme/useTheme";

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const { mode, toggleMode } = useCustomTheme();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        {/* Left-side buttons */}
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/test">
          Test
        </Button>
        <Button color="inherit" component={RouterLink} to="/countries">
          Countries
        </Button>
        {user && (
          <Button
            color="inherit"
            component={RouterLink}
            to="/favorites"
            startIcon={<Favorite />}
          >
            Favourites
          </Button>
        )}
        <Button
          color="inherit"
          component={RouterLink}
          to="/protected"
          startIcon={<Lock />}
        >
          ProtectedData
        </Button>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right-side: user info + auth buttons */}
        {user && (
          <Typography variant="body1" sx={{ mr: 2 }}>
            Hello👋 {user.user_metadata.name}
          </Typography>
        )}



        {user ? (
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
        <IconButton color="inherit" onClick={toggleMode}>
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
      </Toolbar>
    </AppBar>
  );
};
