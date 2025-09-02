import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification.jsx";
import Smtp from "./pages/Smtp.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import Master from "./pages/Master.jsx";
import EmailSent from "./pages/monitor/EmailSent.jsx";
import ReceivedResponse from "./pages/monitor/ReceivedResponse.jsx";
import Navbar from "./components/Navbar.jsx";
import TopProgressBar from "./components/TopProgressBar.jsx";
import Workers from "./pages/Workers.jsx";
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
        <Route
          path="/smtp"
          element={
            isAuthenticated() ? (
              <Smtp />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/campaigns"
          element={
            isAuthenticated() ? (
              <Campaigns />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/master"
          element={
            isAuthenticated() ? (
              <Master />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/monitor/email-sent"
          element={
            isAuthenticated() ? (
              <EmailSent />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/monitor/received-response"
          element={
            isAuthenticated() ? (
              <ReceivedResponse />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/workers"
          element={
            isAuthenticated() ? (
              <Workers />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
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
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
