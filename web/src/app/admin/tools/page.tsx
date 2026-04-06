"use client";

import { useState } from "react";
import { apiFetch } from "@/contexts/AuthContext";

export default function ToolsPage() {
  const [nightlyResult, setNightlyResult] = useState<string | null>(null);
  const [nightlyLoading, setNightlyLoading] = useState(false);
  const [recapResult, setRecapResult] = useState<string | null>(null);
  const [recapLoading, setRecapLoading] = useState(false);

  async function runNightly() {
    setNightlyLoading(true);
    setNightlyResult(null);
    try {
      const res = await apiFetch("/api/admin/run-nightly", { method: "POST" });
      const data = await res.json();
      setNightlyResult(JSON.stringify(data, null, 2));
    } catch {
      setNightlyResult("Failed");
    }
    setNightlyLoading(false);
  }

  async function runRecaps() {
    setRecapLoading(true);
    setRecapResult(null);
    try {
      const res = await apiFetch("/api/admin/send-recaps", { method: "POST" });
      const data = await res.json();
      setRecapResult(JSON.stringify(data, null, 2));
    } catch {
      setRecapResult("Failed");
    }
    setRecapLoading(false);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-[#141413] font-serif">System Tools</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Nightly Pipeline */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-[#141413]">Nightly Pipeline</h2>
          <p className="text-[#87867f] text-sm">
            Syncs Square + bank data, computes daily summaries, and checks alert thresholds for all connected restaurants.
          </p>
          <button
            onClick={runNightly}
            disabled={nightlyLoading}
            className="bg-[#d97757] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50 flex items-center gap-2"
          >
            {nightlyLoading && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {nightlyLoading ? "Running..." : "Run Nightly Pipeline"}
          </button>
          {nightlyResult && (
            <pre className="text-xs text-[#30302e] bg-[#f5f4f0] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto">
              {nightlyResult}
            </pre>
          )}
        </div>

        {/* Morning Recaps */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-[#141413]">Morning Recaps</h2>
          <p className="text-[#87867f] text-sm">
            Generates and sends morning recap texts to all restaurants whose recap time matches now.
          </p>
          <button
            onClick={runRecaps}
            disabled={recapLoading}
            className="bg-[#d97757] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50 flex items-center gap-2"
          >
            {recapLoading && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {recapLoading ? "Sending..." : "Send Morning Recaps"}
          </button>
          {recapResult && (
            <pre className="text-xs text-[#30302e] bg-[#f5f4f0] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto">
              {recapResult}
            </pre>
          )}
        </div>
      </div>

      {/* Scheduler Info */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-3">
        <h2 className="font-semibold text-[#141413]">Scheduler</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#87867f]">Nightly Pipeline</span>
            <span className="text-[#141413]">Every day at 1:00 AM UTC</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#87867f]">Recap Check</span>
            <span className="text-[#141413]">Every 15 minutes (per-restaurant timing)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
