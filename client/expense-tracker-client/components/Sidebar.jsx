import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Wallet } from "lucide-react";

import Button from "./Button";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClassName = ({ isActive }) =>
    isActive
      ? "bg-[#6366f1] text-white rounded-lg px-4 py-2"
      : "text-white px-4 py-2 hover:bg-white/10 rounded-lg";

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:inset-y-0 md:left-0 md:w-56 md:flex-col md:bg-[#0f172a] md:border-r md:border-[#182234]">
        <div className="p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold">
              <Wallet className="text-white text-lg" />
            </span>
          </div>
          <span className="text-white font-bold text-lg">SpendWise</span>
        </div>

        <nav className="flex-1 px-2 pb-4 flex flex-col gap-2">
          <NavLink to="/dashboard" className={navLinkClassName}>
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className={navLinkClassName}>
            Transactions
          </NavLink>
        </nav>

        <div className="p-4 border-t border-[#182234]">
          <NavLink
            to="/"
            className="text-white hover:underline underline-offset-2"
          >
            Logout
          </NavLink>
        </div>
      </aside>

      {/* Mobile top navbar — logo left, hamburger right */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#0f172a] border-b border-[#182234] flex items-center justify-between px-4">
        {/* Logo on the LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold">
              <Wallet className="text-white text-lg" />
            </span>
          </div>
          <span className="text-white font-bold text-lg">SpendWise</span>
        </div>

        {/* Hamburger on the RIGHT */}
        <button
          type="button"
          className="w-10 h-10 rounded-xl bg-[#182234] border border-[#182234] flex items-center justify-center"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M3 5.5H17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 10H17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 14.5H17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile overlay + sidebar */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"
            onClick={() => setOpen(false)}
          />

          <div
            className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-[#0f172a] border-r border-[#182234] p-0"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 flex items-center justify-between border-b border-[#182234]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
                  <span className="text-white font-extrabold">
                    <Wallet className="text-white text-lg" />
                  </span>
                </div>
                <span className="text-white font-bold text-lg">SpendWise</span>
              </div>

              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#1e293b] border border-[#182234] text-[#e2e8f0] flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>

            <nav className="px-2 py-4 flex flex-col gap-2">
              <NavLink
                to="/dashboard"
                className={navLinkClassName}
                onClick={closeSidebar}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/transactions"
                className={navLinkClassName}
                onClick={closeSidebar}
              >
                Transactions
              </NavLink>
            </nav>

            <div className="mt-auto p-4 border-t border-[#182234]">
              <NavLink
                to="/"
                className="text-white hover:underline underline-offset-2"
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Main content spacer for desktop */}
    </>
  );
};

export default Sidebar;
