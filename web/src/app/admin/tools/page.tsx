"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/contexts/AuthContext";

type HealthCheck = {
  status: string;
  checks: Record<string, { status: string; message?: string; account_status?: string; http_code?: number }>;
};

type Revenue = {
  mrr: number;
  active_subscriptions: number;
  total_users: number;
  churn_rate: number;
  status_breakdown: Record<string, number>;
  signups_by_month: { month: string; count: number }[];
};

type RecentMsg = {
  restaurant_name: string;
  owner_name: string;
  direction: string;
  body: string;
  created_at: string;
};

export default function ToolsPage() {
  const [nightlyResult, setNightlyResult] = useState<string | null>(null);
  const [nightlyLoading, setNightlyLoading] = useState(false);
  const [recapResult, setRecapResult] = useState<string | null>(null);
  const [recapLoading, setRecapLoading] = useState(false);
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [revenue, setRevenue] = useState<Revenue | null>(null);
  const [messages, setMessages] = useState<RecentMsg[] | null>(null);
  const [bulkSmsBody, setBulkSmsBody] = useState("");
  const [bulkSmsLoading, setBulkSmsLoading] = useState(false);
  const [bulkSmsResult, setBulkSmsResult] = useState("");
  const [errorLogs, setErrorLogs] = useState<{ stale_syncs: { restaurant_name: string; issue: string }[]; recent_alerts: { restaurant_name: string; type: string; message: string; date: string }[] } | null>(null);

  useEffect(() => {
    apiFetch("/api/admin/revenue").then((r) => r.json()).then(setRevenue);
    apiFetch("/api/admin/recent-messages").then((r) => r.json()).then((d) => setMessages(d.messages));
  }, []);

  async function runNightly() {
    setNightlyLoading(true); setNightlyResult(null);
    try { const res = await apiFetch("/api/admin/run-nightly", { method: "POST" }); setNightlyResult(JSON.stringify(await res.json(), null, 2)); }
    catch { setNightlyResult("Failed"); }
    setNightlyLoading(false);
  }

  async function runRecaps() {
    setRecapLoading(true); setRecapResult(null);
    try { const res = await apiFetch("/api/admin/send-recaps", { method: "POST" }); setRecapResult(JSON.stringify(await res.json(), null, 2)); }
    catch { setRecapResult("Failed"); }
    setRecapLoading(false);
  }

  async function runHealthCheck() {
    setHealthLoading(true);
    try { const res = await apiFetch("/api/admin/health-check"); setHealth(await res.json()); }
    catch { setHealth({ status: "error", checks: {} }); }
    setHealthLoading(false);
  }

  async function sendBulkSms() {
    if (!bulkSmsBody.trim()) return;
    setBulkSmsLoading(true); setBulkSmsResult("");
    try {
      const res = await apiFetch("/api/admin/bulk-sms", { method: "POST", body: JSON.stringify({ body: bulkSmsBody }) });
      const data = await res.json();
      setBulkSmsResult(`Sent to ${data.count}/${data.total} active subscribers`);
      setBulkSmsBody("");
    } catch { setBulkSmsResult("Failed to send"); }
    setBulkSmsLoading(false);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-[#141413] font-serif">System Tools</h1>

      {/* Revenue Metrics */}
      {revenue && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-[#87867f] uppercase tracking-wider">Revenue</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
              <p className="text-[#87867f] text-xs">MRR</p>
              <p className="text-2xl font-bold text-[#d97757]">${revenue.mrr.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
              <p className="text-[#87867f] text-xs">Active Subs</p>
              <p className="text-2xl font-bold text-[#5a9a6e]">{revenue.active_subscriptions}</p>
            </div>
            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
              <p className="text-[#87867f] text-xs">Total Users</p>
              <p className="text-2xl font-bold text-[#141413]">{revenue.total_users}</p>
            </div>
            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
              <p className="text-[#87867f] text-xs">Churn Rate</p>
              <p className="text-2xl font-bold text-[#141413]">{revenue.churn_rate}%</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-[#141413] text-sm">Status Breakdown</h3>
              {Object.entries(revenue.status_breakdown).map(([status, count]) => (
                <div key={status} className="flex justify-between text-sm">
                  <span className="text-[#87867f]">{status}</span>
                  <span className="text-[#141413] font-medium">{count}</span>
                </div>
              ))}
            </div>
            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-[#141413] text-sm">Signups by Month</h3>
              {revenue.signups_by_month.map((m) => (
                <div key={m.month} className="flex justify-between text-sm">
                  <span className="text-[#87867f]">{m.month}</span>
                  <span className="text-[#141413] font-medium">{m.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Health Check */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#87867f] uppercase tracking-wider">System Health</h2>
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-4">
          <button onClick={runHealthCheck} disabled={healthLoading}
            className="bg-[#d97757] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
            {healthLoading ? "Checking..." : "Run Health Check"}
          </button>
          {health && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${health.status === "healthy" ? "bg-[#5a9a6e]" : "bg-[#c0392b]"}`} />
                <span className={`font-semibold text-sm ${health.status === "healthy" ? "text-[#5a9a6e]" : "text-[#c0392b]"}`}>
                  {health.status === "healthy" ? "All Systems Healthy" : "System Degraded"}
                </span>
              </div>
              {Object.entries(health.checks).map(([name, check]) => (
                <div key={name} className="flex items-center justify-between text-sm border-t border-[#d4d2c9] pt-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${check.status === "ok" ? "bg-[#5a9a6e]" : "bg-[#c0392b]"}`} />
                    <span className="text-[#141413] capitalize">{name.replace("_", " ")}</span>
                  </div>
                  <span className={`text-xs ${check.status === "ok" ? "text-[#5a9a6e]" : "text-[#c0392b]"}`}>
                    {check.status === "ok" ? "OK" : check.message?.slice(0, 50) || "Error"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pipeline & Recaps */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-4">
          <h3 className="font-semibold text-[#141413]">Nightly Pipeline</h3>
          <p className="text-[#87867f] text-xs">Syncs Square + bank, computes summaries, checks alerts.</p>
          <button onClick={runNightly} disabled={nightlyLoading}
            className="bg-[#d97757] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
            {nightlyLoading ? "Running..." : "Run Nightly Pipeline"}
          </button>
          {nightlyResult && <pre className="text-xs text-[#30302e] bg-[#f5f4f0] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto">{nightlyResult}</pre>}
        </div>

        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-4">
          <h3 className="font-semibold text-[#141413]">Morning Recaps</h3>
          <p className="text-[#87867f] text-xs">Sends recap texts to restaurants with matching recap time.</p>
          <button onClick={runRecaps} disabled={recapLoading}
            className="bg-[#d97757] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
            {recapLoading ? "Sending..." : "Send Morning Recaps"}
          </button>
          {recapResult && <pre className="text-xs text-[#30302e] bg-[#f5f4f0] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto">{recapResult}</pre>}
        </div>
      </div>

      {/* Bulk SMS */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-4">
        <h3 className="font-semibold text-[#141413]">Bulk SMS</h3>
        <p className="text-[#87867f] text-xs">Send a message to all active subscribers at once.</p>
        <div className="flex gap-2">
          <input type="text" value={bulkSmsBody} onChange={(e) => setBulkSmsBody(e.target.value)}
            placeholder="Type announcement message..."
            className="flex-1 bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg px-3 py-2 text-sm text-[#141413] focus:outline-none focus:border-[#d97757]" />
          <button onClick={sendBulkSms} disabled={!bulkSmsBody.trim() || bulkSmsLoading}
            className="bg-[#c0392b] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#a93226] transition disabled:opacity-50">
            {bulkSmsLoading ? "Sending..." : "Send to All"}
          </button>
        </div>
        {bulkSmsResult && <p className="text-xs text-[#5a9a6e] bg-[#5a9a6e]/10 px-3 py-2 rounded">{bulkSmsResult}</p>}
      </div>

      {/* Recent Messages */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-3">
        <h3 className="font-semibold text-[#141413]">Recent Messages (All Accounts)</h3>
        <div className="max-h-96 overflow-y-auto space-y-2">
          {messages?.map((m, i) => (
            <div key={i} className="flex items-start gap-3 text-sm border-b border-[#d4d2c9] pb-2 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${m.direction === "in" ? "bg-[#d97757]" : "bg-[#5a9a6e]"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#141413] text-xs">{m.restaurant_name}</span>
                  <span className="text-[#87867f] text-[10px]">{m.direction === "in" ? "→ Expo" : "← Expo"}</span>
                  <span className="text-[#87867f] text-[10px]">{new Date(m.created_at).toLocaleString()}</span>
                </div>
                <p className="text-[#30302e] text-xs truncate">{m.body}</p>
              </div>
            </div>
          ))}
          {(!messages || messages.length === 0) && <p className="text-[#87867f] text-sm">No messages yet.</p>}
        </div>
      </div>

      {/* Error Logs */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#141413]">Error Logs / Failed Syncs</h3>
          <button onClick={async () => {
            const res = await apiFetch("/api/admin/error-logs");
            const data = await res.json();
            setErrorLogs(data);
          }} className="text-[#d97757] text-xs font-medium hover:underline">Refresh</button>
        </div>
        {errorLogs ? (
          <div className="space-y-3">
            {errorLogs.stale_syncs?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#c0392b] mb-1">Stale Syncs (no data in 7+ days)</p>
                {errorLogs.stale_syncs.map((s: { restaurant_name: string; issue: string }, i: number) => (
                  <p key={i} className="text-xs text-[#30302e]">{s.restaurant_name}: {s.issue}</p>
                ))}
              </div>
            )}
            {errorLogs.recent_alerts?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#d97757] mb-1">Recent Issue Alerts</p>
                {errorLogs.recent_alerts.slice(0, 10).map((a: { restaurant_name: string; type: string; message: string; date: string }, i: number) => (
                  <div key={i} className="text-xs text-[#30302e] border-b border-[#d4d2c9] pb-1 mb-1 last:border-0">
                    <span className="font-medium">{a.restaurant_name}</span> · {a.type} · {a.message.slice(0, 80)}
                  </div>
                ))}
              </div>
            )}
            {(!errorLogs.stale_syncs?.length && !errorLogs.recent_alerts?.length) && (
              <p className="text-[#5a9a6e] text-sm">No errors or issues found.</p>
            )}
          </div>
        ) : (
          <p className="text-[#87867f] text-xs">Click Refresh to load error logs.</p>
        )}
      </div>

      {/* Scheduler Info */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-2">
        <h3 className="font-semibold text-[#141413]">Scheduler</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between"><span className="text-[#87867f]">Nightly Pipeline</span><span className="text-[#141413]">Every day at 1:00 AM UTC</span></div>
          <div className="flex justify-between"><span className="text-[#87867f]">Recap Check</span><span className="text-[#141413]">Every 15 minutes (per-restaurant)</span></div>
        </div>
      </div>
    </main>
  );
}
