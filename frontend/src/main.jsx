import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EmailVerification from "./pages/EmailVerification.jsx";
import Smtp from "./pages/Smtp.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import Master from "./pages/Master.jsx";
import EmailSent from "./pages/monitor/EmailSent.jsx";
import ReceivedResponse from "./pages/monitor/ReceivedResponse.jsx";
import Navbar from "./components/Navbar.jsx";
import "./index.css";
import TopProgressBar from "./components/TopProgressBar.jsx";
import Workers from "./pages/Workers.jsx";
import Auth from "./pages/Auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication on mount
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}?endpoint=check-auth`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.status === "success") setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
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
        <Route
          path="/smtp"
          element={
            <ProtectedRoute>
              <Smtp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/master"
          element={
            <ProtectedRoute>
              <Master />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monitor/email-sent"
          element={
            <ProtectedRoute>
              <EmailSent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monitor/received-response"
          element={
            <ProtectedRoute>
              <ReceivedResponse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workers"
          element={
            <ProtectedRoute>
              <Workers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
