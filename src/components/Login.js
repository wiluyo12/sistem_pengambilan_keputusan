import React, { useState } from "react";
import { User, Lock, UserCheck, Eye, EyeOff } from "lucide-react";

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // NEW

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.username === "admin" && credentials.password === "admin123") {
      setUser({ username: "admin", role: "admin", name: "Administrator" });
    } else if (credentials.username === "user" && credentials.password === "user123") {
      setUser({ username: "user", role: "user", name: "Production Manager" });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Evaluasi Operator Produksi</h2>
          <p className="mt-2 text-sm text-gray-600">Login</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="card">
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="input-field pl-10"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} // Toggle type
                    required
                    className="input-field pl-10 pr-10"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && <div className="mt-4 text-red-600 text-sm text-center">{error}</div>}

            <button type="submit" className="mt-6 w-full btn-primary">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p>
            <strong>Admin:</strong> admin / admin123
          </p>
          <p>
            <strong>User:</strong> user / user123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
