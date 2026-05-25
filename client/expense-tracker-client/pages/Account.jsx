import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiLogOut, FiTrash2, FiInfo, FiArrowLeft } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../api/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const api = useAxiosPrivate();

  async function handleLogout() {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });

      setAuth({});
      navigate("/login");
    } catch (error) {
      console.log("failed to log out user -> ", error.message);
    }
  }

  async function deleteAccount() {
    try {
      await api.post("/api/auth/delete", {}, { withCredentials: true });

      setAuth({});
      navigate("/login");
    } catch (error) {
      console.log("failed to delete user account -> ", error.message);
    }
  }
  // function handleInfo() {}

  return (
    <div className="account min-h-screen px-4 sm:px-6 py-6 flex flex-col gap-6">
      <div className="nav flex items-center justify-start">
        <Link
          to="/dashboard"
          className="text-[#94a3b8] hover:text-[#6366f1] transition-colors"
        >
          <FiArrowLeft size={42} />
        </Link>
      </div>

      <div className="intro bg-[#1e293b] border border-[#182234] rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3">
        <span className="icon text-[#6366f1]">
          <FaUser className="w-8 h-8" />
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold">Account</h3>
        <hr className="w-full border-[#182234]" />
      </div>

      <div className="options flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="delete-account flex-1 bg-[#1e293b] border border-[#182234] rounded-2xl p-4 sm:p-6 flex items-center justify-center gap-3">
          <FiTrash2 className="text-[#ef4444]" />
          <button
            onClick={deleteAccount}
            className="text-[#ef4444] font-extrabold hover:text-[#ff6a6a] transition-colors cursor-pointer"
          >
            Delete Account
          </button>
        </div>

        <div className="logout flex-1 bg-[#1e293b] border border-[#182234] rounded-2xl p-4 sm:p-6 flex items-center justify-center gap-3">
          <FiLogOut className="text-[#6366f1]" />
          <button
            onClick={handleLogout}
            className="text-[#6366f1] font-extrabold hover:text-[#5557e8] transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
