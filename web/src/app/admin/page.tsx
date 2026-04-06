"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/contexts/AuthContext";

type Stats = {
  total_accounts: number;
  active_subscriptions: number;
  monthly_revenue: number;
  last_sync_date: string | null;
  last_message_at: string | null;
  recent_signups: { id: number; restaurant_name: string; owner_name: string; created_at: string }[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiFetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) {
    return <div className="p-10 text-[#87867f]">Loading stats...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-[#141413] font-serif">Admin Dashboard</h1>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6">
          <p className="text-[#87867f] text-sm">Total Accounts</p>
          <p className="text-3xl font-bold text-[#141413] mt-1">{stats.total_accounts}</p>
        </div>
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6">
          <p className="text-[#87867f] text-sm">Active Subscriptions</p>
          <p className="text-3xl font-bold text-[#5a9a6e] mt-1">{stats.active_subscriptions}</p>
        </div>
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6">
          <p className="text-[#87867f] text-sm">Monthly Revenue</p>
          <p className="text-3xl font-bold text-[#d97757] mt-1">${stats.monthly_revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Recent signups */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-[#141413]">Recent Signups</h2>
          {stats.recent_signups.length === 0 ? (
            <p className="text-[#87867f] text-sm">No signups yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recent_signups.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-[#141413] font-medium">{s.restaurant_name}</p>
                    <p className="text-[#87867f] text-xs">{s.owner_name}</p>
                  </div>
                  <p className="text-[#87867f] text-xs">{new Date(s.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System status */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-[#141413]">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#87867f]">Last data sync</span>
              <span className="text-[#141413]">{stats.last_sync_date || "Never"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#87867f]">Last message sent</span>
              <span className="text-[#141413]">{stats.last_message_at ? new Date(stats.last_message_at).toLocaleString() : "Never"}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
