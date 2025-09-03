import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "./lib/api";
import EmailVerification from "./pages/EmailVerification.jsx";
import Navbar from "./components/Navbar.jsx";
import "./index.css";
import TopProgressBar from "./components/TopProgressBar.jsx";
import Auth from "./pages/Auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication on mount
    const fetchUser = async () => {
      try {
  const data = await api.get('/routes/api.php?endpoint=check-auth');
        if (data.status === "success") setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();

    const onLogout = () => setUser(null);
    window.addEventListener('logout', onLogout);
    window.addEventListener('storage', (e) => { if (e.key === 'jwt_token') setUser(null); });

    return () => {
      window.removeEventListener('logout', onLogout);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <TopProgressBar />
      <Routes>
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EmailVerification />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
