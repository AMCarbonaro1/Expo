"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, apiFetch } from "@/contexts/AuthContext";

export default function BillingPage() {
  const { subscriptionStatus, trialActive, daysLeft, isActive, loading } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  async function handleSubscribe() {
    setCheckoutLoading(true);
    try {
      const res = await apiFetch("/api/billing/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setCheckoutLoading(false);
    }
  }

  async function handleManage() {
    setPortalLoading(true);
    try {
      const res = await apiFetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            EXPO
          </Link>
          <Link href="/dashboard" className="text-zinc-500 text-sm hover:text-white transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-zinc-400 mt-1">Manage your Expo subscription.</p>
        </div>

        {/* Current status */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">Current Plan</h2>

          {subscriptionStatus === "active" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-400 font-medium">Active — $49/month</span>
              </div>
              <button
                onClick={handleManage}
                disabled={portalLoading}
                className="text-zinc-400 text-sm hover:text-white transition underline"
              >
                {portalLoading ? "Opening..." : "Manage subscription (update card, cancel)"}
              </button>
            </div>
          )}

          {trialActive && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-yellow-400 font-medium">
                  Free Trial — {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
                </span>
              </div>
              <p className="text-zinc-500 text-sm">
                Your trial includes full access to Expo. Subscribe before it ends to
                keep using all features.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={checkoutLoading}
                className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {checkoutLoading ? "Loading..." : "Subscribe — $49/month"}
              </button>
            </div>
          )}

          {!isActive && !trialActive && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-400 font-medium">
                  {subscriptionStatus === "canceled" ? "Canceled" : "Trial Expired"}
                </span>
              </div>
              <p className="text-zinc-500 text-sm">
                Subscribe to regain access to Expo and all its features.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={checkoutLoading}
                className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {checkoutLoading ? "Loading..." : "Subscribe — $49/month"}
              </button>
            </div>
          )}
        </div>

        {/* What's included */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold">What&apos;s Included</h2>
          <ul className="space-y-2 text-zinc-400 text-sm">
            {[
              "Daily morning recaps via text",
              "Unlimited questions to Expo",
              "Square POS integration",
              "Bank account monitoring",
              "Invoice photo scanning",
              "Food cost & labor alerts",
              "Cash flow warnings",
              "Supplier price change detection",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
