import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification.jsx";
// Removed unused pages - only keeping verification and auth
import Navbar from "./components/Navbar.jsx";
import TopProgressBar from "./components/TopProgressBar.jsx";
import Auth from "./pages/Auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Simple auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("jwt_token");
};

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth", "/register", "/login", "/table-data/2"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <BrowserRouter>
      {!hideNavbar && <Navbar />}
      <TopProgressBar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <EmailVerification />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
  {/* Only verification and auth routes kept */}
        <Route
          path="/auth"
          element={
            isAuthenticated() ? (
              <Navigate to="/" replace />
            ) : (
              <Auth />
            )
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
