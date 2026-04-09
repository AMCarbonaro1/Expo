"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/contexts/AuthContext";

type BetaApp = {
  id: number;
  name: string;
  restaurant_name: string;
  phone: string;
  city: string;
  pos_system: string;
  years_open: string | null;
  created_at: string;
};

export default function AdminBetaPage() {
  const [apps, setApps] = useState<BetaApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/admin/beta-applications")
      .then((r) => r.json())
      .then((data: BetaApp[]) => {
        setApps(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-[#87867f]">Loading beta applications...</div>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#141413] font-serif">Beta Applications</h1>
        <span className="text-sm text-[#87867f]">{apps.length} total</span>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-10 text-center">
          <p className="text-[#87867f]">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`bg-white border rounded-lg p-5 ${
                app.pos_system === "square" ? "border-[#5a9a6e]/30" : "border-[#d4d2c9]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className="font-bold text-[#141413]">{app.restaurant_name}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        app.pos_system === "square"
                          ? "bg-[#5a9a6e]/10 text-[#5a9a6e]"
                          : "bg-[#87867f]/10 text-[#87867f]"
                      }`}
                    >
                      {app.pos_system}
                    </span>
                  </div>
                  <p className="text-sm text-[#30302e]">{app.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <a href={`tel:${app.phone}`} className="text-[#d97757] font-medium hover:underline">
                      {app.phone}
                    </a>
                    <span className="text-[#87867f]">{app.city}</span>
                    {app.years_open && <span className="text-[#87867f]">Open {app.years_open}</span>}
                  </div>
                </div>
                <span className="text-xs text-[#87867f] flex-shrink-0">
                  {new Date(app.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
