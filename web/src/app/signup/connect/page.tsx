"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function ConnectForm() {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurant_id");
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/square/auth-url?restaurant_id=${restaurantId}`
      );
      const data = await res.json();
      window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={loading}
        className="w-full bg-white text-zinc-950 font-semibold py-3 rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Connect Square"}
      </button>

      <p className="text-zinc-600 text-sm">
        Expo uses Square&apos;s official OAuth to securely connect. Your
        credentials are never stored.
      </p>
    </>
  );
}

export default function ConnectSquarePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-8">
        <h1 className="text-3xl font-bold">Connect Your POS</h1>
        <p className="text-zinc-400">
          Connect your Square account so Expo can read your sales, orders, and
          labor data. We only request read access — we can&apos;t modify
          anything.
        </p>
        <Suspense fallback={<div className="text-zinc-500">Loading...</div>}>
          <ConnectForm />
        </Suspense>
      </div>
    </div>
  );
}
