import { AppBar, Button, Toolbar } from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import { Favorite, Lock } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import CountriesList from "./Countries/CountriesList";
 
export const Navigation = () => {
  const { user, signOut } = useAuth();
 
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/test">
          Test
        </Button>
        <Button color="inherit" component={RouterLink} to="/countries">Countries</Button>
        {user && (
          <Button color="inherit" component={RouterLink} to="/favorites" startIcon={<Favorite/>}>
            Favourites
          </Button>
        )}
        <Button color="inherit" component={RouterLink} to="/protected" startIcon={<Lock/>}>ProtectedData</Button>
 
        {user ? (
            <Button color="inherit" onClick={signOut}>Logout</Button>
        ) : (
            <Button color="inherit" component = {RouterLink} to="/login">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};