import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("jwt_token");
      await fetch(`${API_BASE}?endpoint=logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      document.cookie =
        "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <i className="fas fa-envelope text-blue-600 text-xl"></i>
            <span className="text-xl font-semibold text-gray-900">Email System</span>
          </div>

          {/* Nav Links */}
          <div className={user ? "flex justify-center flex-1" : "flex justify-end ml-auto"}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                }`
              }
            >
              <i className="fas fa-check-circle mr-2"></i>
              Verification
            </NavLink>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-800 font-medium border border-green-200 shadow-sm">
                  <i className="fas fa-user text-green-600 text-sm"></i>
                  <span className="text-sm truncate max-w-[150px]">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg font-medium shadow-sm hover:bg-red-700 transition-colors duration-200"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}