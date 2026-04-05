"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function BankConnect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const restaurantId = searchParams.get("restaurant_id");
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    // Open Plaid Link page in new window, then redirect to success
    window.open(
      `${API_URL}/api/plaid/link-page/${restaurantId}`,
      "plaid",
      "width=500,height=700"
    );

    // Poll for connection (check every 2 seconds for up to 2 minutes)
    let attempts = 0;
    const check = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(
          `${API_URL}/api/admin/bank-balance/${restaurantId}`
        );
        const data = await res.json();
        if (data.balance !== undefined && !data.error) {
          clearInterval(check);
          router.push("/signup/success");
        }
      } catch {}
      if (attempts > 60) {
        clearInterval(check);
        setLoading(false);
      }
    }, 2000);
  }

  function handleSkip() {
    router.push("/signup/success");
  }

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={loading}
        className="w-full bg-white text-zinc-950 font-semibold py-3 rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
      >
        {loading ? "Waiting for connection..." : "Connect Bank Account"}
      </button>

      <button
        onClick={handleSkip}
        className="w-full text-zinc-500 text-sm py-2 hover:text-zinc-300 transition"
      >
        Skip for now — I&apos;ll do this later
      </button>

      <p className="text-zinc-600 text-sm">
        Expo uses Plaid to securely connect. We can only read transactions — we
        can&apos;t move money or see your password.
      </p>
    </>
  );
}

export default function BankPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-8">
        <h1 className="text-3xl font-bold">Connect Your Bank</h1>
        <p className="text-zinc-400">
          Connect your business checking account so Expo can track deposits,
          expenses, and cash flow. Takes 60 seconds.
        </p>
        <Suspense fallback={<div className="text-zinc-500">Loading...</div>}>
          <BankConnect />
        </Suspense>
      </div>
    </div>
  );
}
