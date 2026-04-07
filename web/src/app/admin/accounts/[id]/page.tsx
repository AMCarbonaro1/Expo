"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/contexts/AuthContext";

type AccountDetail = {
  restaurant: Record<string, string | number | boolean | null>;
  user: Record<string, string | null> | null;
  connections: { square: { connected: boolean; merchant_id: string | null }; bank: { connected: boolean; institution: string | null; balance: number | null } };
  counts: { messages: number; alerts: number; invoices: number; summaries: number };
};

type Msg = { direction: string; body: string; created_at: string };

export default function AccountDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [account, setAccount] = useState<AccountDetail | null>(null);
  const [tab, setTab] = useState<"messages" | "alerts" | "summaries">("messages");
  const [tabData, setTabData] = useState<Record<string, unknown[]>>({});
  const [actionLoading, setActionLoading] = useState("");
  const [actionResult, setActionResult] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    apiFetch(`/api/admin/accounts/${id}`).then((r) => r.json()).then((data) => {
      setAccount(data);
      setEditData({
        restaurant_name: String(data.restaurant?.restaurant_name || ""),
        owner_name: String(data.restaurant?.owner_name || ""),
        phone: String(data.restaurant?.phone || ""),
        email: String(data.user?.email || ""),
        restaurant_type: String(data.restaurant?.restaurant_type || ""),
        hours: String(data.restaurant?.hours || ""),
        food_cost_baseline: String(data.restaurant?.food_cost_baseline || ""),
        subscription_status: String(data.user?.subscription_status || ""),
        recap_hour: String(data.restaurant?.recap_hour ?? "7"),
        recap_enabled: String(data.restaurant?.recap_enabled ?? "true"),
        alerts_enabled: String(data.restaurant?.alerts_enabled ?? "true"),
      });
    });
    apiFetch(`/api/admin/accounts/${id}/notes`).then((r) => r.json()).then((data) => setNotes(data.notes || ""));
  }, [id]);

  useEffect(() => {
    if (!tabData[tab]) {
      apiFetch(`/api/admin/accounts/${id}/${tab}`).then((r) => r.json()).then((data) => {
        setTabData((prev) => ({ ...prev, [tab]: data[tab] || [] }));
      });
    }
  }, [tab, id]);

  async function handleSave() {
    setSaving(true);
    const payload: Record<string, string | number | boolean | null> = {};
    for (const [key, value] of Object.entries(editData)) {
      if (key === "food_cost_baseline") {
        payload[key] = value ? parseFloat(value) : null;
      } else if (key === "recap_hour") {
        payload[key] = parseInt(value);
      } else if (key === "recap_enabled" || key === "alerts_enabled") {
        payload[key] = value === "true";
      } else {
        payload[key] = value;
      }
    }
    await apiFetch(`/api/admin/accounts/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    const res = await apiFetch(`/api/admin/accounts/${id}`);
    setAccount(await res.json());
    setSaving(false);
    setEditMode(false);
    setActionResult("Account updated");
    setTimeout(() => setActionResult(""), 3000);
  }

  async function handleSaveNotes() {
    setNotesSaving(true);
    await apiFetch(`/api/admin/accounts/${id}/notes`, { method: "PUT", body: JSON.stringify({ notes }) });
    setNotesSaving(false);
  }

  async function handleResetPassword() {
    if (!newPassword.trim()) return;
    await apiFetch(`/api/admin/accounts/${id}/reset-password`, {
      method: "POST", body: JSON.stringify({ new_password: newPassword }),
    });
    setNewPassword("");
    setActionResult("Password reset");
    setTimeout(() => setActionResult(""), 3000);
  }

  async function runAction(action: string, body?: Record<string, unknown>) {
    setActionLoading(action);
    setActionResult("");
    try {
      const res = await apiFetch(`/api/admin/accounts/${id}/${action}`, {
        method: "POST", body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      setActionResult(`${action}: ${JSON.stringify(data).slice(0, 100)}`);
      apiFetch(`/api/admin/accounts/${id}`).then((r) => r.json()).then(setAccount);
    } catch { setActionResult(`${action}: failed`); }
    setActionLoading("");
  }

  async function handleDelete() {
    await apiFetch(`/api/admin/accounts/${id}`, { method: "DELETE" });
    router.push("/admin/accounts");
  }

  async function handlePreviewPrompt() {
    const res = await apiFetch(`/api/admin/accounts/${id}/preview-prompt`, { method: "POST" });
    const data = await res.json();
    setPromptText(data.prompt || "No prompt generated");
    setShowPrompt(true);
  }

  if (!account) return <div className="p-10 text-[#87867f]">Loading...</div>;

  const r = account.restaurant;
  const u = account.user;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#141413] font-serif">{r.restaurant_name}</h1>
          <p className="text-[#87867f] text-sm">{r.owner_name} · {u?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${u?.subscription_status === "active" ? "bg-[#5a9a6e]/15 text-[#5a9a6e]" : "bg-[#87867f]/15 text-[#87867f]"}`}>
            {u?.subscription_status}
          </span>
          {u?.stripe_customer_id && (
            <a href={`https://dashboard.stripe.com/test/customers/${u.stripe_customer_id}`} target="_blank" className="text-[#87867f] text-xs hover:text-[#141413] underline">Stripe →</a>
          )}
        </div>
      </div>

      {/* Editable info */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#141413]">Account Info</h3>
          {!editMode ? (
            <button onClick={() => setEditMode(true)} className="text-[#d97757] text-xs font-medium hover:underline">Edit</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={saving} className="bg-[#d97757] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditMode(false)} className="text-[#87867f] text-xs">Cancel</button>
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: "owner_name", label: "Owner Name" },
            { key: "restaurant_name", label: "Restaurant Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "restaurant_type", label: "Restaurant Type" },
            { key: "hours", label: "Hours" },
            { key: "food_cost_baseline", label: "Food Cost Target (%)" },
            { key: "subscription_status", label: "Subscription Status" },
            { key: "recap_hour", label: "Recap Hour (0-23)" },
            { key: "recap_enabled", label: "Recap Enabled (true/false)" },
            { key: "alerts_enabled", label: "Alerts Enabled (true/false)" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-[#87867f] text-xs">{field.label}</label>
              {editMode ? (
                <input
                  value={editData[field.key] || ""}
                  onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                  className="w-full bg-white border border-[#d4d2c9] rounded px-3 py-2 text-sm text-[#141413] focus:outline-none focus:border-[#d97757] mt-1"
                />
              ) : (
                <p className="text-[#141413] text-sm mt-1">
                  {field.key === "email" ? u?.email : String(r[field.key] ?? "—")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Connections + Counts */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-3">
          <h3 className="font-semibold text-[#141413] text-sm">Connections</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${account.connections.square.connected ? "bg-[#5a9a6e]" : "bg-[#d4d2c9]"}`} />
                <span className="text-[#141413] text-sm">Square POS</span>
              </div>
              {account.connections.square.connected && (
                <button onClick={() => runAction("disconnect-square")} className="text-[#c0392b] text-xs hover:underline">Disconnect</button>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${account.connections.bank.connected ? "bg-[#5a9a6e]" : "bg-[#d4d2c9]"}`} />
                <span className="text-[#141413] text-sm">
                  {account.connections.bank.connected ? `${account.connections.bank.institution} ($${account.connections.bank.balance?.toLocaleString() || 0})` : "Bank"}
                </span>
              </div>
              {account.connections.bank.connected && (
                <button onClick={() => runAction("disconnect-bank")} className="text-[#c0392b] text-xs hover:underline">Disconnect</button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-2 text-sm">
          <h3 className="font-semibold text-[#141413]">Data</h3>
          <div className="grid grid-cols-2 gap-2 text-[#87867f]">
            <p>Messages: <span className="text-[#141413]">{account.counts.messages}</span></p>
            <p>Alerts: <span className="text-[#141413]">{account.counts.alerts}</span></p>
            <p>Invoices: <span className="text-[#141413]">{account.counts.invoices}</span></p>
            <p>Summaries: <span className="text-[#141413]">{account.counts.summaries}</span></p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-4">
        <h3 className="font-semibold text-[#141413]">Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => runAction("sync")} disabled={actionLoading === "sync"}
            className="bg-[#d97757] text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
            {actionLoading === "sync" ? "Syncing..." : "Sync Data"}
          </button>
          <button onClick={() => runAction("send-recap")} disabled={actionLoading === "send-recap"}
            className="bg-[#d97757] text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
            {actionLoading === "send-recap" ? "Sending..." : "Send Recap"}
          </button>
          <button onClick={handlePreviewPrompt}
            className="bg-[#f5f4f0] text-[#141413] text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#d4d2c9] transition">
            Preview Prompt
          </button>
          <button onClick={async () => {
            const res = await apiFetch(`/api/admin/accounts/${id}/impersonate`, { method: "POST" });
            const data = await res.json();
            if (data.token) {
              window.open(`${window.location.origin}/dashboard?impersonate=${data.token}`, "_blank");
              setActionResult("Impersonate tab opened");
            }
          }} className="bg-[#f5f4f0] text-[#141413] text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#d4d2c9] transition">
            Login As User
          </button>
          <button onClick={async () => {
            const res = await apiFetch(`/api/admin/accounts/${id}/comp`, { method: "POST", body: JSON.stringify({ action: "activate" }) });
            const data = await res.json();
            setActionResult(data.status || data.error);
            apiFetch(`/api/admin/accounts/${id}`).then((r) => r.json()).then(setAccount);
          }} className="bg-[#5a9a6e] text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#4a8a5e] transition">
            Comp / Activate
          </button>
          <button onClick={async () => {
            const res = await apiFetch(`/api/admin/accounts/${id}/comp`, { method: "POST", body: JSON.stringify({ action: "cancel" }) });
            const data = await res.json();
            setActionResult(data.status || data.error);
            apiFetch(`/api/admin/accounts/${id}`).then((r) => r.json()).then(setAccount);
          }} className="bg-[#87867f] text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#6a6963] transition">
            Cancel Sub
          </button>
          <button onClick={async () => {
            const res = await apiFetch(`/api/admin/accounts/${id}/export`);
            const data = await res.json();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `expo-account-${id}-export.json`;
            a.click();
            URL.revokeObjectURL(url);
            setActionResult("Data exported");
          }} className="bg-[#f5f4f0] text-[#141413] text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#d4d2c9] transition">
            Export Data
          </button>
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)}
              className="bg-[#c0392b]/10 text-[#c0392b] text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#c0392b]/20 transition">
              Delete Account
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={handleDelete} className="bg-[#c0392b] text-white text-xs font-medium px-3 py-2 rounded-lg">Confirm Delete</button>
              <button onClick={() => setConfirmDelete(false)} className="text-[#87867f] text-xs">Cancel</button>
            </div>
          )}
        </div>

        {/* Send SMS */}
        <div className="flex gap-2">
          <input type="text" value={smsBody} onChange={(e) => setSmsBody(e.target.value)}
            placeholder="Type a custom SMS to send..."
            className="flex-1 bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg px-3 py-2 text-sm text-[#141413] focus:outline-none focus:border-[#d97757]" />
          <button onClick={() => { runAction("send-sms", { body: smsBody }); setSmsBody(""); }}
            disabled={!smsBody.trim() || actionLoading === "send-sms"}
            className="bg-[#d97757] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50">
            Send SMS
          </button>
        </div>

        {/* Password reset */}
        <div className="flex gap-2">
          <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password for this user..."
            className="flex-1 bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg px-3 py-2 text-sm text-[#141413] focus:outline-none focus:border-[#d97757]" />
          <button onClick={handleResetPassword} disabled={!newPassword.trim()}
            className="bg-[#f5f4f0] text-[#141413] text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#d4d2c9] transition disabled:opacity-50">
            Reset Password
          </button>
        </div>

        {actionResult && (
          <p className="text-xs text-[#5a9a6e] bg-[#5a9a6e]/10 px-3 py-2 rounded">{actionResult}</p>
        )}
      </div>

      {/* Admin Notes */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#141413]">Internal Notes</h3>
          <button onClick={handleSaveNotes} disabled={notesSaving}
            className="text-[#d97757] text-xs font-medium hover:underline disabled:opacity-50">
            {notesSaving ? "Saving..." : "Save Notes"}
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes about this account (support calls, issues, etc.)..."
          rows={3}
          className="w-full bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg px-3 py-2 text-sm text-[#141413] focus:outline-none focus:border-[#d97757] resize-y"
        />
      </div>

      {/* Prompt preview */}
      {showPrompt && (
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#141413]">Claude System Prompt</h3>
            <button onClick={() => setShowPrompt(false)} className="text-[#87867f] text-sm hover:text-[#141413]">Close</button>
          </div>
          <pre className="text-xs text-[#30302e] bg-[#f5f4f0] p-4 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
            {promptText}
          </pre>
        </div>
      )}

      {/* Data tabs */}
      <div className="bg-white border border-[#d4d2c9] rounded-lg overflow-hidden">
        <div className="flex border-b border-[#d4d2c9]">
          {(["messages", "alerts", "summaries"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium transition ${tab === t ? "border-b-2 border-[#d97757] text-[#d97757]" : "text-[#87867f] hover:text-[#141413]"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-4 max-h-[500px] overflow-y-auto">
          {!tabData[tab] ? (
            <p className="text-[#87867f] text-sm">Loading...</p>
          ) : (tabData[tab] as unknown[]).length === 0 ? (
            <p className="text-[#87867f] text-sm">No data.</p>
          ) : tab === "messages" ? (
            <div className="space-y-2">
              {(tabData.messages as Msg[]).map((m, i) => (
                <div key={i} className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.direction === "in" ? "bg-[#f5f4f0] text-[#141413]" : "bg-[#d97757]/10 text-[#141413] ml-auto"}`}>
                  <p className="text-[10px] text-[#87867f] mb-0.5">{m.direction === "in" ? "Owner" : "Expo"} · {new Date(m.created_at).toLocaleString()}</p>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
          ) : tab === "alerts" ? (
            <div className="space-y-2">
              {(tabData.alerts as { severity: string; message: string; created_at: string }[]).map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm border-b border-[#d4d2c9] pb-2 last:border-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${a.severity === "critical" ? "bg-[#c0392b]/15 text-[#c0392b]" : "bg-[#d97757]/15 text-[#d97757]"}`}>{a.severity}</span>
                  <div>
                    <p className="text-[#141413]">{a.message}</p>
                    <p className="text-[#87867f] text-xs">{new Date(a.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#87867f] text-xs">
                  <th className="text-left pb-2">Date</th>
                  <th className="text-right pb-2">Sales</th>
                  <th className="text-right pb-2">Orders</th>
                  <th className="text-right pb-2">Avg Ticket</th>
                  <th className="text-right pb-2">Labor %</th>
                </tr>
              </thead>
              <tbody>
                {(tabData.summaries as { date: string; total_sales: number; order_count: number; avg_ticket: number; labor_percentage: number }[]).map((s, i) => (
                  <tr key={i} className="border-t border-[#d4d2c9]">
                    <td className="py-2 text-[#141413]">{s.date}</td>
                    <td className="py-2 text-right text-[#141413]">${s.total_sales?.toLocaleString()}</td>
                    <td className="py-2 text-right text-[#87867f]">{s.order_count}</td>
                    <td className="py-2 text-right text-[#87867f]">${s.avg_ticket?.toFixed(2)}</td>
                    <td className="py-2 text-right text-[#87867f]">{s.labor_percentage?.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
