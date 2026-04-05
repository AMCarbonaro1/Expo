"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-[#e8e6dc] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#141413]">
            EXPO
          </Link>
          <h1 className="text-3xl font-bold mt-6 text-[#141413] font-serif">Welcome back</h1>
          <p className="text-[#87867f] mt-2">Log in to your Expo dashboard.</p>
        </div>

        <div className="bg-white rounded-lg border border-[#d4d2c9] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="you@restaurant.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="Your password"
              />
            </div>
            {error && <p className="text-[#c0392b] text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d97757] text-white font-semibold py-3 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#87867f] text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#d97757] hover:text-[#c4654a]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
