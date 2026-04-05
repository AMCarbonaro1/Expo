"use client";

import Link from "next/link";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import DashboardChecklist from "@/components/DashboardChecklist";
import { useState } from "react";

export default function DashboardPage() {
  const { user, restaurant, logout, loading, subscriptionStatus, trialActive, daysLeft, isActive } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  // Paywall — trial expired and no active subscription
  if (!isActive && !loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <header className="border-b border-zinc-800">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="text-xl font-bold tracking-tight">EXPO</span>
            <button onClick={logout} className="text-zinc-500 text-sm hover:text-white transition">
              Log out
            </button>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-6 py-20 text-center space-y-6">
          <div className="text-5xl">&#128274;</div>
          <h1 className="text-2xl font-bold">Your free trial has ended</h1>
          <p className="text-zinc-400">
            Subscribe to keep using Expo — daily recaps, alerts, invoice scanning,
            and everything else. Just $49/month.
          </p>
          <button
            onClick={handleSubscribe}
            disabled={checkoutLoading}
            className="bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-700 transition text-lg disabled:opacity-50"
          >
            {checkoutLoading ? "Loading..." : "Subscribe — $49/month"}
          </button>
          <p className="text-zinc-600 text-sm">Cancel anytime. No contracts.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">EXPO</span>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/billing" className="text-zinc-500 text-sm hover:text-white transition">
              Billing
            </Link>
            <span className="text-zinc-400 text-sm hidden sm:block">
              {restaurant?.restaurant_name}
            </span>
            <button
              onClick={logout}
              className="text-zinc-500 text-sm hover:text-white transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Trial banner */}
      {trialActive && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
            <p className="text-yellow-400 text-sm">
              <span className="font-medium">Free trial:</span> {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
            </p>
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading}
              className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {checkoutLoading ? "..." : "Subscribe — $49/mo"}
            </button>
          </div>
        </div>
      )}

      {/* Active subscription badge */}
      {subscriptionStatus === "active" && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/20">
          <div className="max-w-4xl mx-auto px-6 py-2 flex items-center justify-between">
            <p className="text-emerald-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active subscription
            </p>
            <Link href="/dashboard/billing" className="text-emerald-400/60 text-xs hover:text-emerald-400 transition">
              Manage
            </Link>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome{restaurant?.owner_name ? `, ${restaurant.owner_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-zinc-400 mt-1">
            {trialActive
              ? "Complete the steps below to get Expo fully connected to your restaurant."
              : "Your restaurant is connected. Text Expo anytime."}
          </p>
        </div>

        <DashboardChecklist />

        {/* Restaurant Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-lg">Restaurant Profile</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Restaurant</span>
              <p className="text-white">{restaurant?.restaurant_name}</p>
            </div>
            <div>
              <span className="text-zinc-500">Owner</span>
              <p className="text-white">{restaurant?.owner_name}</p>
            </div>
            <div>
              <span className="text-zinc-500">Phone</span>
              <p className="text-white">{restaurant?.phone}</p>
            </div>
            <div>
              <span className="text-zinc-500">Email</span>
              <p className="text-white">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
