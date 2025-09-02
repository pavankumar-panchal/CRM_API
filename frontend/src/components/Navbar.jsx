import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}?endpoint=check-auth`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.status === "success") {
          setUser(data.user);
          document.cookie = `user_email=${data.user.email}; path=/;`;
        } else {
          setUser(null);
          document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      } catch {
        setUser(null);
        document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("jwt_token");
    await fetch(`${API_BASE}?endpoint=logout`, { method: "POST", credentials: "include" });
    setUser(null);
    document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/auth");
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <i className="fas fa-envelope text-blue-600 mr-2"></i>
            <span className="text-gray-800 font-semibold">Email System</span>
          </div>
          <div className="flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                } px-3 py-2 rounded-md text-sm font-medium flex items-center`
              }
            >
              <i className="fas fa-check-circle mr-2"></i>
              Verification
            </NavLink>
            <div className="flex items-center ml-6 gap-3">
              {user ? (
                <span className="text-green-700 font-medium flex items-center">
                  Logged in as <b className="ml-1">{user.name}</b>
                  <span className="ml-2 text-gray-500">({getCookie("user_email")})</span>
                </span>
              ) : (
                <span className="text-red-500 font-medium">Not logged in</span>
              )}
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}