"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import PhoneMockup from "@/components/PhoneMockup";
import ExpoLogo from "@/components/ExpoLogo";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 bg-[#e8e6dc] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div>
            <Link href="/">
              <ExpoLogo size={32} textClass="text-2xl" />
            </Link>
            <h1 className="text-3xl font-bold mt-8 text-[#141413] font-serif">
              Welcome back
            </h1>
            <p className="text-[#87867f] mt-2">
              Log in to your Expo dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#30302e] mb-1.5 font-medium">
                Email
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                placeholder="you@restaurant.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[#30302e] mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 pr-12 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#87867f] hover:text-[#141413] transition"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-[#c0392b]/10 text-[#c0392b] text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d97757] text-white font-semibold py-3 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-[#87867f] text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#d97757] hover:text-[#c4654a] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Phone mockup */}
      <div className="hidden lg:flex flex-1 bg-[#141413] items-center justify-center relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d97757]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#d97757]/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <PhoneMockup />
        </div>
      </div>
    </div>
  );
}
