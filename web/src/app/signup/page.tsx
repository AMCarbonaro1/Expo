"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    owner_name: "",
    restaurant_name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signup(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
          <h1 className="text-3xl font-bold mt-6 text-[#141413] font-serif">Create your account</h1>
          <p className="text-[#87867f] mt-2">Get started with Expo in 5 minutes.</p>
        </div>

        <div className="bg-white rounded-lg border border-[#d4d2c9] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="you@restaurant.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Your Name</label>
              <input
                type="text"
                required
                value={form.owner_name}
                onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Restaurant Name</label>
              <input
                type="text"
                required
                value={form.restaurant_name}
                onChange={(e) => setForm({ ...form, restaurant_name: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="Joe's Coney Island"
              />
            </div>
            <div>
              <label className="block text-sm text-[#30302e] mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] transition"
                placeholder="(313) 555-1234"
              />
            </div>
            {error && <p className="text-[#c0392b] text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d97757] text-white font-semibold py-3 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#87867f] text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#d97757] hover:text-[#c4654a]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
