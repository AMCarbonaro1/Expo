"use client";

import { useAuth, apiFetch } from "@/contexts/AuthContext";
import DashboardChecklist from "@/components/DashboardChecklist";
import DashboardNav from "@/components/DashboardNav";
import ExpoLogo from "@/components/ExpoLogo";
import { useState } from "react";

export default function DashboardPage() {
  const { user, restaurant, logout, loading, subscriptionStatus, isActive } = useAuth();
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
      <div className="min-h-screen bg-[#e8e6dc] flex items-center justify-center">
        <p className="text-[#87867f]">Loading...</p>
      </div>
    );
  }

  // Paywall
  if (!isActive && !loading) {
    return (
      <div className="min-h-screen bg-[#e8e6dc]">
        <header className="bg-white border-b border-[#d4d2c9]">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <ExpoLogo />
            <button onClick={logout} className="text-[#87867f] text-sm hover:text-[#141413] transition">
              Log out
            </button>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-6 py-20 text-center space-y-6">
          <h1 className="text-3xl font-bold text-[#141413] font-serif">Activate Expo</h1>
          <p className="text-[#87867f]">
            Subscribe to get started with Expo — daily recaps, smart alerts,
            invoice scanning, and your entire restaurant in your pocket.
          </p>
          <div className="bg-white border border-[#d4d2c9] rounded-lg p-8 space-y-4">
            <div>
              <span className="text-4xl font-bold text-[#141413]">$49</span>
              <span className="text-[#87867f] text-lg">/month</span>
            </div>
            <ul className="text-left text-sm text-[#30302e] space-y-2 max-w-xs mx-auto">
              {["Daily morning recaps via text", "Unlimited questions to Expo", "POS + bank integration", "Invoice photo scanning", "Food cost & labor alerts"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5a9a6e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading}
              className="w-full bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg disabled:opacity-50"
            >
              {checkoutLoading ? "Loading..." : "Subscribe — $49/month"}
            </button>
            <p className="text-[#87867f] text-xs">Cancel anytime. No contracts.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e6dc]">
      <DashboardNav />

      {subscriptionStatus === "active" && (
        <div className="bg-[#5a9a6e]/10 border-b border-[#5a9a6e]/20">
          <div className="max-w-4xl mx-auto px-6 py-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5a9a6e] animate-pulse" />
            <p className="text-[#5a9a6e] text-sm">Active subscription</p>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] font-serif">
            Welcome{restaurant?.owner_name ? `, ${restaurant.owner_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-[#87867f] mt-1">
            Complete the steps below to get Expo fully connected to your restaurant.
          </p>
        </div>

        <DashboardChecklist />

        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg text-[#141413]">Restaurant Profile</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#87867f]">Restaurant</span>
              <p className="text-[#141413]">{restaurant?.restaurant_name}</p>
            </div>
            <div>
              <span className="text-[#87867f]">Owner</span>
              <p className="text-[#141413]">{restaurant?.owner_name}</p>
            </div>
            <div>
              <span className="text-[#87867f]">Phone</span>
              <p className="text-[#141413]">{restaurant?.phone}</p>
            </div>
            <div>
              <span className="text-[#87867f]">Email</span>
              <p className="text-[#141413]">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
