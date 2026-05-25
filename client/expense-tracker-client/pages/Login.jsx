import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../api/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const api = useAxiosPrivate();

  const { setAuth } = useAuth();

  function validate() {
    if (!username.trim() || !password.trim()) {
      setError("please fill all fields before submitting!");
      setTimeout(() => setError(""), 4000);
      return false;
    }

    if (!username.trim()) {
      setError("please enter a username!");
      setTimeout(() => setError(""), 4000);
      return false;
    }

    if (!password.trim()) {
      setError("please enter a password");
      setTimeout(() => setError(""), 4000);
      return false;
    }

    if (password < 8) {
      setError("password length must be up to 8 characters");
      setTimeout(() => setError(""), 4000);
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!validate()) return;

    const formData = {
      username,
      password,
    };
    try {
      const res = await api.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      const { accessToken, user } = res.data;
      console.log(res.data);
      setAuth({ accessToken, user });

      if (res.data?.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      setError(errorMessage || "something went wrong, please try again!");
      setTimeout(() => setError(""), 4000);
    }
  }

  function clearError() {
    setError("");
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] border border-[#182234] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            <span className="text-[#6366f1]">Login</span>
          </h1>
          <p className="mt-2 text-sm text-[#94a3b8]">
            Welcome back—enter your details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-[#e2e8f0] mb-2"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearError();
                }}
                className="w-full h-11 rounded-xl bg-[#293548] border border-[#182234] px-3 text-white placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#e2e8f0] mb-2"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                className="w-full h-11 rounded-xl bg-[#293548] border border-[#182234] px-3 text-white placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
              />
            </div>
          </div>

          <div className="cta mt-6">
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#6366f1] hover:bg-[#5557e8] text-white font-extrabold cursor-pointer transition-colors"
            >
              Login
            </button>
          </div>

          <div className="signup mt-4 text-center text-sm">
            <Link
              to="/signup"
              className="text-[#94a3b8] hover:text-[#6366f1] transition-colors"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
