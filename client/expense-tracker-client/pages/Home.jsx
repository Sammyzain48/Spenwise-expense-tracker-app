import React, { useState } from "react";
import { Wallet, Target } from "lucide-react";
import { RiLineChartLine } from "react-icons/ri";
import { RiWalletLine } from "react-icons/ri";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogin() {
    navigate("/login");
  }

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── HEADER ── */}
      <header className="nav flex flex-row items-center justify-between gap-4 p-4 border-b border-[#182234]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-800 rounded-lg flex items-center justify-center">
            <Wallet className="text-white text-lg" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">
            SpendWise
          </span>
        </div>

        {/* Desktop CTA */}
        <div className="cta hidden sm:flex flex-row gap-3 sm:gap-9">
          <Button onClick={handleLogin}>Login</Button>
          <Button
            onClick={handleSignUp}
            background={"#6366f1"}
            padding={10}
            border={10}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#1e293b] border border-[#182234] text-[#e2e8f0] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-5">
            <span className="block h-0.5 bg-[#e2e8f0] rounded mb-1" />
            <span className="block h-0.5 bg-[#e2e8f0] rounded mb-1" />
            <span className="block h-0.5 bg-[#e2e8f0] rounded" />
          </span>
        </button>

        {/* Slide-over menu */}
        <div
          className={`fixed inset-0 z-50 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!isMenuOpen}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-[rgba(0,0,0,0.6)] transition-opacity duration-200 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-[#0f172a] border-l border-[#182234] transition-transform duration-200 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 flex items-center justify-between border-b border-[#182234]">
              <span className="text-[#e2e8f0] font-extrabold">SpendWise</span>
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#1e293b] border border-[#182234] text-[#e2e8f0] cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogin();
                }}
                className="w-full"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignUp();
                }}
                background={"#6366f1"}
                padding={10}
                border={10}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* ── HERO ── */}
        <section className="hero w-full flex justify-center items-center flex-col gap-6 py-14 sm:py-24 px-5">
          <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center gap-5">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              Track every cent,{" "}
              <span className="text-[#6366f1]">master your wealth.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-xl">
              The intuitive expense tracker designed for modern teams and
              individuals. Gain clarity on your spending habits in seconds.
            </p>
          </div>

          <Button
            background={"#6366f1"}
            padding={16}
            border={10}
            textSize={18}
            onClick={handleSignUp}
          >
            Start Tracking Free
          </Button>
        </section>

        {/* ── FEATURES ── */}
        <section className="features w-full bg-[#131c2f] px-5 sm:px-12 py-12 sm:py-16 mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Everything you need to grow
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8]">
              Powerful tools to help you manage your financial health with ease.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-5">
            {/* Card 1 */}
            <div className="card bg-[#1e293b] p-6 rounded-xl flex flex-col gap-4 cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-shadow duration-200 w-full sm:w-[280px] border border-[#182234]">
              <div className="w-11 h-11 bg-[#0f172a] border border-[#182234] rounded-xl flex items-center justify-center text-[#6366f1] text-xl">
                <RiLineChartLine />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Real-time Analytics
              </h3>
              <p className="text-[12px] text-[#94a3b8] leading-relaxed">
                Watch your net worth grow with live updates and beautiful
                interactive charts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card bg-[#1e293b] p-6 rounded-xl flex flex-col gap-4 cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-shadow duration-200 w-full sm:w-[280px] border border-[#182234]">
              <div className="w-11 h-11 bg-[#0f172a] border border-[#182234] rounded-xl flex items-center justify-center text-[#6366f1] text-xl">
                <RiWalletLine />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Budget Control
              </h3>
              <p className="text-[12px] text-[#94a3b8] leading-relaxed">
                Set monthly budgets for every category and get alerted before
                you overspend.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card bg-[#1e293b] p-6 rounded-xl flex flex-col gap-4 cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-shadow duration-200 w-full sm:w-[280px] border border-[#182234]">
              <div className="w-11 h-11 bg-[#0f172a] border border-[#182234] rounded-xl flex items-center justify-center text-[#6366f1] text-xl">
                <Target />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Financial Goals
              </h3>
              <p className="text-[12px] text-[#94a3b8] leading-relaxed">
                Set savings goals and track your progress every day until you
                hit your target.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA FOOTER ── */}
        <section className="w-full px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="bg-[linear-gradient(135deg,#1f2750_0%,#17203f_50%,#10182c_100%)] w-full max-w-4xl mx-auto flex flex-col items-center gap-5 p-8 sm:p-12 rounded-2xl border border-[#182234] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center">
              Ready to take control?
            </h2>
            <p className="text-sm sm:text-base text-[#94a3b8] text-center max-w-lg leading-relaxed">
              Join over 5,000 users who have transformed their financial lives
              with <span className="text-white font-bold">SpendWise</span>
            </p>
            <Button
              background={"#6366f1"}
              padding={16}
              border={10}
              textSize={18}
              onClick={handleSignUp}
            >
              Get Started Now — It's Free
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
