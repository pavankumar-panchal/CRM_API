import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Inform backend (optional). api helper will attach token automatically.
      await api.post('/routes/api.php?endpoint=logout');
    } catch {
      // ignore errors from logout endpoint - we'll clear client state regardless
    }
  // Clear client state and notify other windows/components
  localStorage.removeItem('jwt_token');
  window.dispatchEvent(new Event('logout'));
  setUser(null);
  setOpen(false);
  navigate('/auth');
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

          {/* Desktop Links - show Verification only when authenticated */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
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
            ) : null}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="p-2 rounded-md">
              <i className={`fas ${open ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
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
            ) : (
              <div>
                <button onClick={() => navigate('/auth')} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">Sign in</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 flex flex-col gap-2">
            {!user ? (
              <button onClick={() => { setOpen(false); navigate('/auth'); }} className="px-3 py-2 rounded hover:bg-gray-100 text-left">Sign in</button>
            ) : (
              <div className="space-y-2">
                <button onClick={() => { setOpen(false); navigate('/'); }} className="px-3 py-2 rounded hover:bg-gray-100 text-left flex items-center gap-2">
                  <i className="fas fa-check-circle text-gray-600"></i>
                  Verification
                </button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-user text-green-600"></i>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white rounded">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}