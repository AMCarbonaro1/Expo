"use client";

import { useEffect, useState } from "react";
import IntegrationCard from "./IntegrationCard";
import { apiFetch, useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Status = {
  square_connected: boolean;
  bank_connected: boolean;
  has_texted: boolean;
  has_invoice: boolean;
};

export default function DashboardChecklist() {
  const { restaurant } = useAuth();
  const [status, setStatus] = useState<Status | null>(null);
  const [plaidLoading, setPlaidLoading] = useState(false);

  async function loadStatus() {
    const res = await apiFetch("/api/auth/onboarding-status");
    const data = await res.json();

    // Check localStorage for manual completions
    const manualTexted = localStorage.getItem("expo_texted") === "true";
    const manualInvoice = localStorage.getItem("expo_invoice") === "true";
    setStatus({
      ...data,
      has_texted: data.has_texted || manualTexted,
      has_invoice: data.has_invoice || manualInvoice,
    });
  }

  useEffect(() => {
    loadStatus();
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data === "plaid-connected") {
        setPlaidLoading(false);
        loadStatus();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!status) {
    return <div className="text-zinc-500">Loading...</div>;
  }

  const completed = [status.square_connected, status.bank_connected, status.has_texted, status.has_invoice].filter(Boolean).length;
  const allComplete = completed === 4;

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

  function markTexted() {
    localStorage.setItem("expo_texted", "true");
    setStatus((prev) => prev ? { ...prev, has_texted: true } : prev);
  }

  function markInvoice() {
    localStorage.setItem("expo_invoice", "true");
    setStatus((prev) => prev ? { ...prev, has_invoice: true } : prev);
  }

  if (allComplete) {
    return (
      <div className="space-y-8">
        {/* Success state */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
          <div className="text-4xl">✓</div>
          <h2 className="text-2xl font-bold text-white">
            You&apos;re all set up!
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Expo is connected to your POS, bank, and ready to go. You&apos;ll
            get your first morning recap tomorrow at 7am. In the meantime, text
            Expo anytime.
          </p>
        </div>

        {/* Connections */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Your Connections</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Square POS</p>
                    <p className="text-emerald-400 text-xs">Connected</p>
                  </div>
                </div>
                <button
                  onClick={connectSquare}
                  className="text-zinc-500 text-xs hover:text-white transition"
                >
                  Reconnect
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Bank Account</p>
                    <p className="text-emerald-400 text-xs">Connected</p>
                  </div>
                </div>
                <button
                  onClick={connectBank}
                  className="text-zinc-500 text-xs hover:text-white transition"
                >
                  Reconnect
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">SMS</p>
                  <p className="text-emerald-400 text-xs">Active — (313) 474-9394</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Invoice Scanning</p>
                  <p className="text-emerald-400 text-xs">Ready — text photos anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example texts */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">
            Try texting Expo any of these:
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { text: "How did we do today?", desc: "Get yesterday's sales recap" },
              { text: "What's my labor this week?", desc: "See labor cost and percentage" },
              { text: "What's in my bank account?", desc: "Check your current balance" },
              { text: "What's my food cost running?", desc: "See food cost % from invoices" },
              { text: "Am I making money?", desc: "Get a full financial picture" },
              { text: "What's my busiest hour?", desc: "Find your peak times" },
            ].map((item) => (
              <a
                key={item.text}
                href={`sms:+13134749394&body=${encodeURIComponent(item.text)}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-emerald-500/50 transition block"
              >
                <p className="text-white font-medium text-sm">
                  &quot;{item.text}&quot;
                </p>
                <p className="text-zinc-500 text-xs mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
          <div className="text-center pt-2">
            <a
              href="sms:+13134749394"
              className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
            >
              Text Expo Now — (313) 474-9394
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Setup progress</span>
          <span className="text-white font-medium">{completed} of 4 complete</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(completed / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        <IntegrationCard
          title="Connect Square POS"
          description="Link your Square account to pull sales, orders, and labor data automatically."
          connected={status.square_connected}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          action={
            <button
              onClick={connectSquare}
              className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Connect Square
            </button>
          }
        />

        <IntegrationCard
          title="Connect Bank Account"
          description="Link your business checking account to track deposits, expenses, and cash flow."
          connected={status.bank_connected}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
          action={
            <button
              onClick={connectBank}
              disabled={plaidLoading}
              className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {plaidLoading ? "Connecting..." : "Connect Bank"}
            </button>
          }
        />

        <IntegrationCard
          title="Text Expo"
          description="Send your first text to Expo to start getting insights about your restaurant."
          connected={status.has_texted}
          connectedText="Done"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
          action={
            <div className="space-y-3">
              <a
                href="sms:+13134749394&body=Hey"
                className="inline-block bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Text (313) 474-9394
              </a>
              <p className="text-zinc-600 text-xs">
                Save this number as &quot;Expo&quot;
              </p>
              <button
                onClick={markTexted}
                className="text-zinc-500 text-xs hover:text-zinc-300 transition underline"
              >
                I&apos;ve texted Expo — mark as complete
              </button>
            </div>
          }
        />

        <IntegrationCard
          title="Send Your First Invoice"
          description="Text a photo of any supplier invoice to Expo. We'll read every line item automatically."
          connected={status.has_invoice}
          connectedText="Done"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          action={
            <div className="space-y-3">
              <p className="text-zinc-400 text-sm">
                Take a photo of any invoice and text it to{" "}
                <span className="text-white">(313) 474-9394</span>
              </p>
              <button
                onClick={markInvoice}
                className="text-zinc-500 text-xs hover:text-zinc-300 transition underline"
              >
                I&apos;ve sent an invoice — mark as complete
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}
