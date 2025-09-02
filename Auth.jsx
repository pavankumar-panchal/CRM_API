import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/CRM_API/backend/routes/api.php";

const Auth = ({ setUser }) => {
  const [step, setStep] = useState("register"); // "register" or "login"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.email || !formData.password || !formData.name) {
      setStatus({ type: "error", message: "All fields are required" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?endpoint=register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "success") {
        setStatus({
          type: "success",
          message: "Registration successful! Please login.",
        });
        setFormData({ email: "", password: "", name: "" });
        setStep("login");
      } else {
        setStatus({ type: "error", message: data.message || "Registration failed" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.email || !formData.password) {
      setStatus({ type: "error", message: "All fields are required" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?endpoint=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <-- REQUIRED for session cookies!
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "success") {
        // Fetch user info after login
        const userRes = await fetch(`${API_BASE}?endpoint=check-auth`, {
          credentials: "include",
        });
        const userData = await userRes.json();
        if (userData.status === "success") {
          setUser(userData.user); // <-- Update user state for Navbar
        }
        setStatus({ type: "success", message: "Login successful!" });
        navigate("/"); // <-- Redirect to main page
      } else {
        setStatus({ type: "error", message: data.message || "Login failed" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const StatusMessage = ({ status, onClose }) =>
    status && (
      <div
        className={`
          fixed top-6 left-1/2 transform -translate-x-1/2 z-50
          px-6 py-3 rounded-xl shadow text-base font-semibold
          flex items-center gap-3
          transition-all duration-300
          backdrop-blur-md
          ${
            status.type === "error"
              ? "bg-red-200/60 border border-red-400 text-red-800"
              : "bg-green-200/60 border border-green-400 text-green-800"
          }
        `}
        style={{
          minWidth: 250,
          maxWidth: 400,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
          background:
            status.type === "error"
              ? "rgba(255, 0, 0, 0.29)"
              : "rgba(0, 200, 83, 0.29)",
          borderRadius: "16px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        role="alert"
      >
        <i
          className={`fas text-lg ${
            status.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`}
        ></i>
        <span className="flex-1">{status.message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <StatusMessage status={status} onClose={() => setStatus(null)} />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-12">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {step === "register" ? "Register" : "Login"}
          </h2>
        </div>
        {step === "register" ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Register</>
                )}
              </button>
            </div>
            <div className="mt-6 text-center">
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                type="button"
                onClick={() => {
                  setStep("login");
                  setStatus(null);
                  setFormData({ email: "", password: "", name: "" });
                }}
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
            <div className="mt-6 text-center">
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                type="button"
                onClick={() => {
                  setStep("register");
                  setStatus(null);
                  setFormData({ email: "", password: "", name: "" });
                }}
              >
                Don't have an account? Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default Auth;
