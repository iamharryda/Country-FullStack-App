import { Box } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedTestData } from "./components/Auth/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import { Navigation } from "./components/Navigation";
import CountriesList from "./components/Countries/CountriesList";
import CountryDetail from "./components/Countries/CountryDetail";
import { Favourites } from "./components/Favourites";
 
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
            <Route path="/login" element={
                <>
                <AuthRedirect/>
                <Login/>
                </>
              } />
              <Route path="/test" element={<TestData />} />
              <Route path="/countries" element={<CountriesList/>} />
              <Route path="/country/:name" element={<CountryDetail/>} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favourites />
                  </ProtectedRoute>
                }
              />
              {/* Other routes... */}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}
 
export default App;
 