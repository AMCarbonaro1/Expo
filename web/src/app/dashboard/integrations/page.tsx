"use client";

import { useEffect, useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import { apiFetch, useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Integration = {
  id: string;
  name: string;
  category: string;
  status: "connected" | "available" | "coming_soon" | "live";
  external_name: string | null;
};

const descriptions: Record<string, string> = {
  square: "Sales, orders, labor, menu items, and payments from your Square POS.",
  toast: "Sales, orders, labor, menus, and analytics from Toast POS.",
  clover: "Orders, payments, inventory, and employee data from Clover.",
  lightspeed: "Orders, menus, payments, and business data from Lightspeed K-Series.",
  revel: "Orders, payments, products, employees, and more from Revel Systems.",
  touchbistro: "POS data from TouchBistro.",
  hungerrush: "Menu and ordering data from HungerRush.",
  plaid: "Bank balance, transactions, deposits, expenses, and cash flow monitoring.",
  doordash: "Delivery orders, fees, and performance data from DoorDash.",
  ubereats: "Orders, menus, store management, and performance from Uber Eats.",
  grubhub: "Orders, menus, merchant data, and schedules from Grubhub.",
  quickbooks: "Invoices, bills, payments, P&L reports, and expense tracking.",
  xero: "Invoices, bank transactions, payments, and accounting reports.",
  r365: "Operations and accounting data from Restaurant365.",
  marketman: "Inventory counts, recipes, purchase orders, and vendor management.",
  marginedge: "Invoice data, product costs, categories, and vendor items.",
  "7shifts": "Employee schedules, time punches, labor costs, and shift management.",
  opentable: "Reservations, availability, guest profiles, and booking history.",
  fooddocs: "Food safety checklists, temperature logs, and compliance data.",
};

const categoryOrder = [
  "POS Systems",
  "Banking",
  "Delivery Apps",
  "Accounting",
  "Inventory & Food Cost",
  "Labor & Scheduling",
  "Reservations",
  "Food Safety",
];

export default function IntegrationsPage() {
  const { restaurant, loading: authLoading } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  async function loadIntegrations() {
    const res = await apiFetch("/api/integrations/status");
    const data = await res.json();
    setIntegrations(data.integrations || []);
    setLoading(false);
  }

  useEffect(() => {
    loadIntegrations();
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data === "plaid-connected") {
        loadIntegrations();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  async function handleConnect(id: string) {
    setActionLoading(id);

    // Square — legacy OAuth redirect
    if (id === "square") {
      const res = await apiFetch(`/api/square/auth-url?restaurant_id=${restaurant?.id}`);
      const data = await res.json();
      window.location.href = data.url;
      return;
    }

    // Plaid — legacy popup
    if (id === "plaid") {
      window.open(`${API_URL}/api/plaid/link-page/${restaurant?.id}`, "plaid", "width=500,height=700");
      setActionLoading("");
      return;
    }

    // OAuth redirect integrations
    if (["quickbooks", "xero", "clover", "lightspeed"].includes(id)) {
      const res = await apiFetch(`/api/integrations/${id}/auth-url`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setActionLoading("");
      }
      return;
    }

    // Direct connect integrations (client credentials / JWT)
    if (["7shifts", "doordash", "toast"].includes(id)) {
      const res = await apiFetch(`/api/integrations/${id}/connect`, { method: "POST" });
      const data = await res.json();
      if (data.status === "connected") {
        await loadIntegrations();
      }
      setActionLoading("");
      return;
    }

    setActionLoading("");
  }

  async function handleDisconnect(id: string) {
    setActionLoading(id);
    await apiFetch(`/api/integrations/disconnect/${id}`, { method: "POST" });
    await loadIntegrations();
    setActionLoading("");
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#e8e6dc]">
        <DashboardNav />
        <div className="flex items-center justify-center py-20">
          <p className="text-[#87867f]">Loading integrations...</p>
        </div>
      </div>
    );
  }

  // Group by category
  const grouped: Record<string, Integration[]> = {};
  for (const cat of categoryOrder) {
    grouped[cat] = integrations.filter((i) => i.category === cat);
  }

  return (
    <div className="min-h-screen bg-[#e8e6dc]">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] font-serif">
            Integrations
          </h1>
          <p className="text-[#87867f] mt-1">
            Connect your tools to give Expo a complete picture of your business.
          </p>
        </div>

        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;

          return (
            <div key={cat} className="space-y-3">
              <h2 className="text-sm font-bold text-[#87867f] uppercase tracking-wider">
                {cat}
              </h2>
              <div className="space-y-2">
                {items.map((integration) => {
                  const isConnected = integration.status === "connected";
                  const isComingSoon = integration.status === "coming_soon";
                  const isAvailable = integration.status === "available" || integration.status === "live";

                  return (
                    <div
                      key={integration.id}
                      className={`bg-white border border-[#d4d2c9] rounded-lg p-5 flex items-center justify-between ${
                        isComingSoon ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isConnected
                            ? "bg-[#5a9a6e]/15 text-[#5a9a6e]"
                            : isComingSoon
                            ? "bg-[#f5f4f0] text-[#d4d2c9]"
                            : "bg-[#d97757]/10 text-[#d97757]"
                        }`}>
                          {integration.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-[#141413] text-sm">
                              {integration.name}
                            </p>
                            {isConnected && (
                              <span className="text-[10px] font-medium bg-[#5a9a6e]/15 text-[#5a9a6e] px-2 py-0.5 rounded-full">
                                Connected{integration.external_name ? ` — ${integration.external_name}` : ""}
                              </span>
                            )}
                            {isComingSoon && (
                              <span className="text-[10px] font-medium bg-[#87867f]/10 text-[#87867f] px-2 py-0.5 rounded-full">
                                Coming Soon
                              </span>
                            )}
                          </div>
                          <p className="text-[#87867f] text-xs mt-0.5">
                            {descriptions[integration.id] || ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isConnected && (
                          <>
                            <svg className="w-5 h-5 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <button
                              onClick={() => handleDisconnect(integration.id)}
                              disabled={actionLoading === integration.id}
                              className="text-[#87867f] text-xs hover:text-[#c0392b] transition"
                            >
                              Disconnect
                            </button>
                          </>
                        )}
                        {isAvailable && !isConnected && (
                          <button
                            onClick={() => handleConnect(integration.id)}
                            disabled={actionLoading === integration.id}
                            className="bg-[#d97757] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#c4654a] transition disabled:opacity-50"
                          >
                            {actionLoading === integration.id ? "Connecting..." : "Connect"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
