import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}?endpoint=check-auth`, {
          credentials: "include",
        });
        const data = await res.json();
        setAuth(data.status === "success");
      } catch {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>;
  return auth ? children : <Navigate to="/auth" replace />;
}