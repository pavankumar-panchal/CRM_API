import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("jwt_token");
    await fetch(`${API_BASE}?endpoint=logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    document.cookie =
      "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <i className="fas fa-envelope text-blue-600 text-xl"></i>
            <span className="text-lg font-bold text-gray-800">Email System</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium flex items-center transition ${
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
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium shadow-sm border border-green-200">
                  <i className="fas fa-user text-green-600"></i>
                  <span className="text-sm">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-md font-medium shadow-sm hover:bg-red-700 transition"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            ) : (
              <span className="text-red-500 font-medium">Not logged in</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
