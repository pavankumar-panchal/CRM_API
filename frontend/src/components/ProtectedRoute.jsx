import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      try {
        const data = await api.get('/routes/api.php?endpoint=check-auth');
        if (!mounted) return;
        setAuth(data.status === 'success');
      } catch {
        if (!mounted) return;
        setAuth(false);
      }
    };
    checkAuth();
    return () => { mounted = false };
  }, []);

  if (auth === null) return <div>Loading...</div>;
  return auth ? children : <Navigate to="/auth" replace />;
}