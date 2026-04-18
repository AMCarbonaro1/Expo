"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import PhoneMockup from "@/components/PhoneMockup";
import ExpoLogo from "@/components/ExpoLogo";

function getPasswordStrength(pw: string): { level: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "#c0392b" };
  if (score <= 2) return { level: 2, label: "Fair", color: "#d97757" };
  if (score <= 3) return { level: 3, label: "Good", color: "#d4a017" };
  return { level: 4, label: "Strong", color: "#5a9a6e" };
}

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    owner_name: "",
    restaurant_name: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strength = form.password ? getPasswordStrength(form.password) : null;

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
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 bg-[#e8e6dc] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div>
            <Link href="/">
              <ExpoLogo size={32} textClass="text-2xl" />
            </Link>
            <h1 className="text-3xl font-bold mt-8 text-[#141413] font-serif">
              Create your account
            </h1>
            <p className="text-[#87867f] mt-2">
              Get started with Expo in 5 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#30302e] mb-1.5 font-medium">Email</label>
              <input
                type="email"
                required
                autoFocus
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                placeholder="you@restaurant.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[#30302e] mb-1.5 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 pr-12 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                  placeholder="Create a password"
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
              {strength && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i <= strength.level ? strength.color : "#d4d2c9",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-[#30302e] mb-1.5 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.owner_name}
                  onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                  className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm text-[#30302e] mb-1.5 font-medium">Phone</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                  placeholder="(313) 555-1234"
                />
              </div>
            </div>

            {/* SMS Consent Disclosure — A2P 10DLC Required */}
            <div className="bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-[#d4d2c9] text-[#d97757] focus:ring-[#d97757] accent-[#d97757] flex-shrink-0"
                />
                <span className="text-xs text-[#30302e] leading-relaxed">
                  By providing your phone number and creating an account, you consent to receive SMS text messages
                  from Expo at the number provided, including AI-powered responses, daily morning recaps, business
                  alerts, invoice confirmations, and support replies. <strong>Message frequency varies</strong> based on your usage.
                  <strong>Message and data rates may apply.</strong> Reply <strong>STOP</strong> to unsubscribe at any time.
                  Reply <strong>HELP</strong> for help. Your consent to receive messages is not a condition of any purchase and
                  is not shared with third parties for their marketing purposes. See our{" "}
                  <Link href="/privacy" target="_blank" className="text-[#d97757] hover:underline">Privacy Policy</Link>
                  {" "}and{" "}
                  <Link href="/terms" target="_blank" className="text-[#d97757] hover:underline">Terms of Service</Link>
                  {" "}for details.
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-[#30302e] mb-1.5 font-medium">Restaurant Name</label>
              <input
                type="text"
                required
                value={form.restaurant_name}
                onChange={(e) => setForm({ ...form, restaurant_name: e.target.value })}
                className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                placeholder="Joe's Coney Island"
              />
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[#87867f] text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#d97757] hover:text-[#c4654a] font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Phone mockup */}
      <div className="hidden lg:flex flex-1 bg-[#141413] items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d97757]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#d97757]/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <PhoneMockup />
        </div>
      </div>
    </div>
  );
}
