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
      <div className="min-h-screen bg-[#e8e6dc] text-[#141413] flex items-center justify-center">
        <p className="text-[#87867f]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e6dc] text-[#141413]">
      <header className="border-b border-[#d4d2c9]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            EXPO
          </Link>
          <Link href="/dashboard" className="text-[#87867f] text-sm hover:text-[#141413] transition">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-[#87867f] mt-1">Manage your Expo subscription.</p>
        </div>

        {/* Current status */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <h2 className="font-semibold">Current Plan</h2>

          {subscriptionStatus === "active" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5a9a6e]" />
                <span className="text-[#5a9a6e] font-medium">Active — $49/month</span>
              </div>
              <button
                onClick={handleManage}
                disabled={portalLoading}
                className="text-[#87867f] text-sm hover:text-[#141413] transition underline"
              >
                {portalLoading ? "Opening..." : "Manage subscription (update card, cancel)"}
              </button>
            </div>
          )}

          {!isActive && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c0392b]" />
                <span className="text-[#c0392b] font-medium">
                  {subscriptionStatus === "canceled" ? "Canceled" : "Not subscribed"}
                </span>
              </div>
              <p className="text-[#87867f] text-sm">
                Subscribe to access Expo and all its features.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={checkoutLoading}
                className="bg-[#d97757] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50"
              >
                {checkoutLoading ? "Loading..." : "Subscribe — $49/month"}
              </button>
            </div>
          )}
        </div>

        {/* What's included */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <h2 className="font-semibold">What&apos;s Included</h2>
          <ul className="space-y-2 text-[#87867f] text-sm">
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
                <svg className="w-4 h-4 text-[#5a9a6e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
