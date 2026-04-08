"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, apiFetch } from "@/contexts/AuthContext";
import DashboardNav from "@/components/DashboardNav";
import ExpoLogo from "@/components/ExpoLogo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Status = {
  square_connected: boolean;
  bank_connected: boolean;
};

export default function DashboardPage() {
  const { user, restaurant, logout, loading, isActive } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [plaidLoading, setPlaidLoading] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/onboarding-status")
      .then((r) => r.json())
      .then((data) => setStatus(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data === "plaid-connected") {
        setPlaidLoading(false);
        setStatus((prev) => prev ? { ...prev, bank_connected: true } : prev);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

  async function connectSquare() {
    const res = await apiFetch(`/api/square/auth-url?restaurant_id=${restaurant?.id}`);
    const data = await res.json();
    window.location.href = data.url;
  }

  function connectBank() {
    setPlaidLoading(true);
    window.open(
      `${API_URL}/api/plaid/link-page/${restaurant?.id}`,
      "plaid",
      "width=500,height=700"
    );
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

  const needsSetup = status && (!status.square_connected || !status.bank_connected);

  return (
    <div className="min-h-screen bg-[#e8e6dc]">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] font-serif">
            Welcome{restaurant?.owner_name ? `, ${restaurant.owner_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-[#87867f] mt-1">
            {needsSetup
              ? "Connect your accounts to get the most out of Expo."
              : "You're all set. Text Expo anytime or manage your settings below."}
          </p>
        </div>

        {/* Integrations */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Square */}
          <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f4f0] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#87867f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#141413]">Square POS</p>
                  {status?.square_connected ? (
                    <p className="text-xs text-[#5a9a6e]">Connected</p>
                  ) : (
                    <p className="text-xs text-[#87867f]">Not connected</p>
                  )}
                </div>
              </div>
              {status?.square_connected ? (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <button onClick={connectSquare} className="text-[#87867f] text-xs hover:text-[#141413] transition">
                    Reconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectSquare}
                  className="bg-[#d97757] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition"
                >
                  Connect
                </button>
              )}
            </div>
            <p className="text-[#87867f] text-xs">
              Pulls your sales, orders, labor, and menu data automatically.
            </p>
          </div>

          {/* Plaid */}
          <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f5f4f0] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#87867f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#141413]">Bank Account</p>
                  {status?.bank_connected ? (
                    <p className="text-xs text-[#5a9a6e]">Connected</p>
                  ) : (
                    <p className="text-xs text-[#87867f]">Not connected</p>
                  )}
                </div>
              </div>
              {status?.bank_connected ? (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <button onClick={connectBank} className="text-[#87867f] text-xs hover:text-[#141413] transition">
                    Reconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectBank}
                  disabled={plaidLoading}
                  className="bg-[#d97757] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50"
                >
                  {plaidLoading ? "Connecting..." : "Connect"}
                </button>
              )}
            </div>
            <p className="text-[#87867f] text-xs">
              Tracks deposits, expenses, cash flow, and upcoming bills.
            </p>
          </div>
        </div>

        {/* Text Expo */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#141413]">Text Expo</h2>
            <a
              href="sms:+13134749394"
              className="bg-[#d97757] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition"
            >
              Open Messages
            </a>
          </div>
          <p className="text-[#87867f] text-sm">
            Text <span className="font-medium text-[#141413]">(313) 474-9394</span> anytime.
            Save this number as &quot;Expo&quot; in your contacts.
          </p>
          <div className="grid sm:grid-cols-3 gap-2 pt-2">
            {[
              { text: "How are we doing right now?", desc: "Live sales pace" },
              { text: "Who's clocked in?", desc: "Staff on the clock" },
              { text: "What's selling today?", desc: "Top sellers right now" },
              { text: "Should I send someone home?", desc: "Real-time staffing" },
              { text: "Did the deposit go through?", desc: "Bank verification" },
              { text: "How many gyros have we sold?", desc: "Live item count" },
              { text: "How does today compare to last week?", desc: "Live comparison" },
              { text: "Can I afford to hire someone?", desc: "Staffing + cash flow" },
              { text: "What's my food cost running?", desc: "Invoice vs sales" },
            ].map((ex) => (
              <a
                key={ex.text}
                href={`sms:+13134749394&body=${encodeURIComponent(ex.text)}`}
                className="bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg p-3 hover:border-[#d97757]/40 transition block"
              >
                <p className="text-[#141413] text-xs font-medium">&quot;{ex.text}&quot;</p>
                <p className="text-[#87867f] text-[10px] mt-0.5">{ex.desc}</p>
              </a>
            ))}
          </div>
          <p className="text-[#87867f] text-xs text-center pt-1">
            <Link href="/dashboard/guide" className="text-[#d97757] hover:text-[#c4654a]">
              See all commands →
            </Link>
          </p>
        </div>

        {/* Restaurant Profile */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#141413]">Restaurant Profile</h2>
            <Link href="/dashboard/settings" className="text-[#d97757] text-xs hover:text-[#c4654a]">
              Edit settings →
            </Link>
          </div>
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
