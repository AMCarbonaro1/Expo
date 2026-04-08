"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [openTickets, setOpenTickets] = useState(0);

  useEffect(() => {
    apiFetch("/api/admin/stats").then((r) => r.json()).then(setStats);
    apiFetch("/api/admin/support-tickets").then((r) => r.json()).then((data: { status: string }[]) => {
      setOpenTickets(data.filter((t) => t.status === "open").length);
    });
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

      {/* Support tickets badge */}
      <Link href="/admin/support" className="block">
        <div className={`bg-white border rounded-lg p-6 flex items-center justify-between hover:shadow-sm transition ${openTickets > 0 ? "border-[#c0392b]/30" : "border-[#d4d2c9]"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${openTickets > 0 ? "bg-[#c0392b]/10" : "bg-[#5a9a6e]/10"}`}>
              <svg className={`w-5 h-5 ${openTickets > 0 ? "text-[#c0392b]" : "text-[#5a9a6e]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-[#141413]">Support Tickets</h2>
              <p className="text-[#87867f] text-sm">
                {openTickets > 0 ? `${openTickets} open ticket${openTickets > 1 ? "s" : ""} need${openTickets === 1 ? "s" : ""} attention` : "All caught up — no open tickets"}
              </p>
            </div>
          </div>
          {openTickets > 0 && (
            <span className="bg-[#c0392b] text-white text-sm font-bold px-3 py-1 rounded-full">{openTickets}</span>
          )}
          <svg className="w-5 h-5 text-[#87867f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </main>
  );
}
