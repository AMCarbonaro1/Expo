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

type Ticket = {
  id: number;
  restaurant_id: number;
  restaurant_name: string;
  owner_name: string;
  phone: string;
  message: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  closed_at: string | null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketNotes, setTicketNotes] = useState<Record<number, string>>({});
  const [ticketLoading, setTicketLoading] = useState<number | null>(null);
  const [showClosed, setShowClosed] = useState(false);

  const loadTickets = () => {
    apiFetch("/api/admin/support-tickets").then((r) => r.json()).then((data: Ticket[]) => {
      setTickets(data);
      const notes: Record<number, string> = {};
      data.forEach((t: Ticket) => { notes[t.id] = t.admin_notes || ""; });
      setTicketNotes(notes);
    });
  };

  const updateTicket = async (id: number, status: string) => {
    setTicketLoading(id);
    await apiFetch(`/api/admin/support-tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, admin_notes: ticketNotes[id] || null }),
    });
    loadTickets();
    setTicketLoading(null);
  };

  const saveNotes = async (id: number) => {
    setTicketLoading(id);
    await apiFetch(`/api/admin/support-tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_notes: ticketNotes[id] || null }),
    });
    loadTickets();
    setTicketLoading(null);
  };

  useEffect(() => {
    apiFetch("/api/admin/stats").then((r) => r.json()).then(setStats);
    loadTickets();
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

      {/* Support Tickets */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#141413]">
            Support Tickets
            {tickets.filter((t) => t.status === "open").length > 0 && (
              <span className="ml-2 bg-[#c0392b] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {tickets.filter((t) => t.status === "open").length}
              </span>
            )}
          </h2>
          <button
            onClick={() => setShowClosed(!showClosed)}
            className="text-xs text-[#87867f] hover:text-[#141413] transition"
          >
            {showClosed ? "Hide closed" : "Show closed"}
          </button>
        </div>

        {tickets.filter((t) => showClosed || t.status === "open").length === 0 ? (
          <p className="text-[#87867f] text-sm">No {showClosed ? "" : "open "}support tickets.</p>
        ) : (
          <div className="space-y-4">
            {tickets
              .filter((t) => showClosed || t.status === "open")
              .map((t) => (
                <div
                  key={t.id}
                  className={`border rounded-lg p-4 space-y-3 ${
                    t.status === "open" ? "border-[#c0392b]/30 bg-[#c0392b]/5" : "border-[#d4d2c9] bg-[#f5f4f0]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-[#141413]">{t.restaurant_name}</span>
                        <span className="text-xs text-[#87867f]">{t.owner_name}</span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            t.status === "open"
                              ? "bg-[#c0392b]/10 text-[#c0392b]"
                              : "bg-[#5a9a6e]/10 text-[#5a9a6e]"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                      <a
                        href={`tel:${t.phone}`}
                        className="text-[#d97757] text-sm font-medium hover:underline"
                      >
                        {t.phone}
                      </a>
                      <p className="text-xs text-[#87867f] mt-1">
                        {new Date(t.created_at).toLocaleString()}
                        {t.closed_at && ` — Closed ${new Date(t.closed_at).toLocaleString()}`}
                      </p>
                      <p className="text-sm text-[#30302e] mt-2 italic">&quot;{t.message}&quot;</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      value={ticketNotes[t.id] || ""}
                      onChange={(e) => setTicketNotes({ ...ticketNotes, [t.id]: e.target.value })}
                      placeholder="Admin notes..."
                      className="flex-1 text-sm border border-[#d4d2c9] rounded px-3 py-2 resize-none bg-white"
                      rows={1}
                    />
                    <button
                      onClick={() => saveNotes(t.id)}
                      disabled={ticketLoading === t.id}
                      className="text-xs bg-[#d4d2c9] text-[#30302e] px-3 py-1 rounded hover:bg-[#c4c2b9] transition"
                    >
                      Save
                    </button>
                    {t.status === "open" ? (
                      <button
                        onClick={() => updateTicket(t.id, "closed")}
                        disabled={ticketLoading === t.id}
                        className="text-xs bg-[#5a9a6e] text-white px-3 py-1 rounded hover:bg-[#4a8a5e] transition"
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTicket(t.id, "open")}
                        disabled={ticketLoading === t.id}
                        className="text-xs bg-[#d97757] text-white px-3 py-1 rounded hover:bg-[#c4654a] transition"
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
