"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/contexts/AuthContext";

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

type Msg = { direction: string; body: string; created_at: string };

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<"open" | "closed" | "all">("open");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [ticketNotes, setTicketNotes] = useState<Record<number, string>>({});
  const [ticketMessages, setTicketMessages] = useState<Record<number, Msg[]>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<number | null>(null);

  const loadTickets = async () => {
    const res = await apiFetch("/api/admin/support-tickets");
    const data: Ticket[] = await res.json();
    setTickets(data);
    const notes: Record<number, string> = {};
    data.forEach((t) => { notes[t.id] = t.admin_notes || ""; });
    setTicketNotes(notes);
    setLoading(false);
  };

  useEffect(() => { loadTickets(); }, []);

  const loadMessages = async (restaurantId: number, ticketId: number) => {
    if (ticketMessages[ticketId]) return;
    const res = await apiFetch(`/api/admin/accounts/${restaurantId}/messages`);
    const data = await res.json();
    setTicketMessages((prev) => ({ ...prev, [ticketId]: (data.messages || []).slice(0, 10) }));
  };

  const toggleExpand = (ticket: Ticket) => {
    if (expandedId === ticket.id) {
      setExpandedId(null);
    } else {
      setExpandedId(ticket.id);
      loadMessages(ticket.restaurant_id, ticket.id);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    setActionLoading(id);
    await apiFetch(`/api/admin/support-tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, admin_notes: ticketNotes[id] || null }),
    });
    await loadTickets();
    setActionLoading(null);
  };

  const saveNotes = async (id: number) => {
    setActionLoading(id);
    await apiFetch(`/api/admin/support-tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_notes: ticketNotes[id] || null }),
    });
    await loadTickets();
    setActionLoading(null);
    setSaveSuccess(id);
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  const ticketNumber = (id: number) => `#EXP-${String(id).padStart(4, "0")}`;

  const filtered = tickets.filter((t) => {
    if (filter === "open" && t.status !== "open") return false;
    if (filter === "closed" && t.status !== "closed") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ticketNumber(t.id).toLowerCase().includes(q) ||
        t.restaurant_name.toLowerCase().includes(q) ||
        t.owner_name.toLowerCase().includes(q) ||
        t.phone.includes(q) ||
        t.message.toLowerCase().includes(q) ||
        (t.admin_notes || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openCount = tickets.filter((t) => t.status === "open").length;
  const closedCount = tickets.filter((t) => t.status === "closed").length;
  const today = new Date().toDateString();
  const closedToday = tickets.filter((t) => t.closed_at && new Date(t.closed_at).toDateString() === today).length;

  if (loading) return <div className="p-10 text-[#87867f]">Loading support tickets...</div>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-[#141413] font-serif">Support</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
          <p className="text-[#87867f] text-sm">Open Tickets</p>
          <p className={`text-3xl font-bold mt-1 ${openCount > 0 ? "text-[#c0392b]" : "text-[#5a9a6e]"}`}>
            {openCount}
          </p>
        </div>
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
          <p className="text-[#87867f] text-sm">Closed Today</p>
          <p className="text-3xl font-bold text-[#5a9a6e] mt-1">{closedToday}</p>
        </div>
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5">
          <p className="text-[#87867f] text-sm">Total All-Time</p>
          <p className="text-3xl font-bold text-[#141413] mt-1">{tickets.length}</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#87867f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ticket #, name, phone, or notes..."
          className="w-full bg-white border border-[#d4d2c9] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#d97757]"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#87867f] hover:text-[#141413]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex gap-1 border-b border-[#d4d2c9]">
        {([
          { key: "open" as const, label: "Open", count: openCount },
          { key: "closed" as const, label: "Closed", count: closedCount },
          { key: "all" as const, label: "All", count: tickets.length },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              filter === tab.key
                ? "border-[#d97757] text-[#d97757]"
                : "border-transparent text-[#87867f] hover:text-[#141413]"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs bg-[#f5f4f0] px-1.5 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Ticket list */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-10 text-center">
          <p className="text-[#87867f]">
            {filter === "open" ? "No open tickets. You're all caught up!" : "No tickets to show."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => {
            const isExpanded = expandedId === t.id;
            const msgs = ticketMessages[t.id];
            return (
              <div
                key={t.id}
                className={`bg-white border rounded-lg overflow-hidden transition-shadow ${
                  t.status === "open" ? "border-[#c0392b]/30" : "border-[#d4d2c9]"
                } ${isExpanded ? "shadow-md" : "hover:shadow-sm"}`}
              >
                {/* Ticket header — clickable */}
                <button
                  onClick={() => toggleExpand(t)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#87867f]">{ticketNumber(t.id)}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          t.status === "open"
                            ? "bg-[#c0392b]/10 text-[#c0392b]"
                            : "bg-[#5a9a6e]/10 text-[#5a9a6e]"
                        }`}
                      >
                        {t.status}
                      </span>
                      <span className="font-medium text-sm text-[#141413]">{t.restaurant_name}</span>
                      <span className="text-xs text-[#87867f]">{t.owner_name}</span>
                    </div>
                    <p className="text-sm text-[#30302e] italic mt-1 truncate">&quot;{t.message}&quot;</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#87867f]">{new Date(t.created_at).toLocaleDateString()}</p>
                    <p className="text-xs text-[#87867f]">{new Date(t.created_at).toLocaleTimeString()}</p>
                    <svg
                      className={`w-4 h-4 text-[#87867f] mt-1 ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-[#d4d2c9] px-5 pb-5 space-y-4">
                    {/* Contact + actions row */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-4">
                        <a
                          href={`tel:${t.phone}`}
                          className="inline-flex items-center gap-2 bg-[#d97757] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call {t.phone}
                        </a>
                        <Link
                          href={`/admin/accounts/${t.restaurant_id}`}
                          className="text-sm text-[#d97757] hover:underline"
                        >
                          View Account
                        </Link>
                      </div>
                      <div className="flex gap-2">
                        {t.status === "open" ? (
                          <button
                            onClick={() => updateStatus(t.id, "closed")}
                            disabled={actionLoading === t.id}
                            className="text-sm bg-[#5a9a6e] text-white px-4 py-2 rounded-lg hover:bg-[#4a8a5e] transition disabled:opacity-50"
                          >
                            {actionLoading === t.id ? "Closing..." : "Close Ticket"}
                          </button>
                        ) : (
                          <button
                            onClick={() => updateStatus(t.id, "open")}
                            disabled={actionLoading === t.id}
                            className="text-sm bg-[#d97757] text-white px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50"
                          >
                            {actionLoading === t.id ? "Reopening..." : "Reopen Ticket"}
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#87867f]">
                      Ticket {ticketNumber(t.id)} · Opened {new Date(t.created_at).toLocaleString()}
                      {t.closed_at && ` · Closed ${new Date(t.closed_at).toLocaleString()}`}
                    </p>

                    {/* Admin notes */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#87867f] uppercase tracking-wider">Admin Notes</label>
                      <div className="flex gap-2">
                        <textarea
                          value={ticketNotes[t.id] || ""}
                          onChange={(e) => setTicketNotes({ ...ticketNotes, [t.id]: e.target.value })}
                          placeholder="Add notes about this ticket (what was discussed, resolution, etc.)..."
                          className="flex-1 text-sm border border-[#d4d2c9] rounded-lg px-3 py-2 resize-y bg-[#f5f4f0] focus:outline-none focus:border-[#d97757]"
                          rows={5}
                        />
                        <button
                          onClick={() => saveNotes(t.id)}
                          disabled={actionLoading === t.id}
                          className={`self-end text-sm px-4 py-2 rounded-lg transition disabled:opacity-50 ${
                            saveSuccess === t.id
                              ? "bg-[#5a9a6e] text-white"
                              : "bg-[#f5f4f0] text-[#141413] hover:bg-[#d4d2c9]"
                          }`}
                        >
                          {saveSuccess === t.id ? "Saved!" : "Save"}
                        </button>
                      </div>
                    </div>

                    {/* Recent messages / activity log */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-[#87867f] uppercase tracking-wider">Recent Activity</label>
                      <div className="bg-[#f5f4f0] rounded-lg p-3 max-h-64 overflow-y-auto space-y-2">
                        {!msgs ? (
                          <p className="text-xs text-[#87867f]">Loading messages...</p>
                        ) : msgs.length === 0 ? (
                          <p className="text-xs text-[#87867f]">No recent messages.</p>
                        ) : (
                          msgs.map((m, i) => (
                            <div
                              key={i}
                              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                                m.direction === "in"
                                  ? "bg-white text-[#141413] border border-[#d4d2c9]"
                                  : "bg-[#d97757]/10 text-[#141413] ml-auto"
                              }`}
                            >
                              <p className="text-[10px] text-[#87867f] mb-0.5">
                                {m.direction === "in" ? "Owner" : "Expo"} · {new Date(m.created_at).toLocaleString()}
                              </p>
                              <p className="text-xs leading-relaxed">{m.body}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
