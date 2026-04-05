"use client";

import { useEffect, useState } from "react";
import DashboardNav from "@/components/DashboardNav";
import { apiFetch, useAuth } from "@/contexts/AuthContext";

type Settings = {
  recap_enabled: boolean;
  recap_hour: number;
  recap_minute: number;
  alerts_enabled: boolean;
  food_cost_baseline: number | null;
  hours: string | null;
  restaurant_type: string | null;
};

export default function SettingsPage() {
  const { loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/auth/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    await apiFetch("/api/auth/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function update(field: keyof Settings, value: string | number | boolean | null) {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#e8e6dc] flex items-center justify-center">
        <p className="text-[#87867f]">Loading...</p>
      </div>
    );
  }

  if (!settings) return null;

  const recapHourDisplay = settings.recap_hour === 0 ? 12 : settings.recap_hour > 12 ? settings.recap_hour - 12 : settings.recap_hour;
  const recapAmPm = settings.recap_hour < 12 ? "AM" : "PM";

  return (
    <div className="min-h-screen bg-[#e8e6dc]">
      <DashboardNav />

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] font-serif">
              Settings
            </h1>
            <p className="text-[#87867f] mt-1">
              Manage your Expo preferences. You can also change these by texting Expo.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition flex items-center gap-2 ${
              saved
                ? "bg-[#5a9a6e] text-white"
                : "bg-[#d97757] text-white hover:bg-[#c4654a]"
            } disabled:opacity-50`}
          >
            {saving && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Morning Recap */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-5">
          <h2 className="font-semibold text-[#141413]">Morning Recap</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#141413] font-medium">Enable morning recaps</p>
              <p className="text-xs text-[#87867f]">Receive a daily business summary via text</p>
            </div>
            <button
              onClick={() => update("recap_enabled", !settings.recap_enabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.recap_enabled ? "bg-[#d97757]" : "bg-[#d4d2c9]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.recap_enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {settings.recap_enabled && (
            <div>
              <label className="block text-sm text-[#30302e] mb-1.5 font-medium">
                Recap time
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={settings.recap_hour}
                  onChange={(e) => update("recap_hour", parseInt(e.target.value))}
                  className="bg-white border border-[#d4d2c9] rounded-lg px-3 py-2.5 text-[#141413] text-sm focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const h = i === 0 ? 12 : i > 12 ? i - 12 : i;
                    const ampm = i < 12 ? "AM" : "PM";
                    return (
                      <option key={i} value={i}>
                        {h}:00 {ampm}
                      </option>
                    );
                  })}
                </select>
                <span className="text-[#87867f] text-sm">
                  Currently: {recapHourDisplay}:00 {recapAmPm}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-5">
          <h2 className="font-semibold text-[#141413]">Alerts</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#141413] font-medium">Enable smart alerts</p>
              <p className="text-xs text-[#87867f]">Get texted when labor spikes, sales drop, deposits are missing, or cash flow is tight</p>
            </div>
            <button
              onClick={() => update("alerts_enabled", !settings.alerts_enabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.alerts_enabled ? "bg-[#d97757]" : "bg-[#d4d2c9]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.alerts_enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Food Cost */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-5">
          <h2 className="font-semibold text-[#141413]">Food Cost</h2>

          <div>
            <label className="block text-sm text-[#30302e] mb-1.5 font-medium">
              Food cost target (%)
            </label>
            <p className="text-xs text-[#87867f] mb-2">
              Expo will alert you when your food cost exceeds this target
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={settings.food_cost_baseline ?? ""}
                onChange={(e) =>
                  update("food_cost_baseline", e.target.value ? parseFloat(e.target.value) : null)
                }
                className="w-24 bg-white border border-[#d4d2c9] rounded-lg px-3 py-2.5 text-[#141413] text-sm focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
                placeholder="30"
              />
              <span className="text-[#87867f] text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-5">
          <h2 className="font-semibold text-[#141413]">Restaurant Info</h2>

          <div>
            <label className="block text-sm text-[#30302e] mb-1.5 font-medium">
              Restaurant type
            </label>
            <input
              type="text"
              value={settings.restaurant_type ?? ""}
              onChange={(e) => update("restaurant_type", e.target.value || null)}
              className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-2.5 text-[#141413] text-sm focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
              placeholder="e.g., Coney Island, Pizza, Mexican"
            />
          </div>

          <div>
            <label className="block text-sm text-[#30302e] mb-1.5 font-medium">
              Operating hours
            </label>
            <input
              type="text"
              value={settings.hours ?? ""}
              onChange={(e) => update("hours", e.target.value || null)}
              className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-2.5 text-[#141413] text-sm focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
              placeholder="e.g., Mon-Sat 7am-9pm"
            />
          </div>
        </div>

        <p className="text-[#87867f] text-xs text-center">
          You can also change any of these settings by texting Expo. Try &quot;change my recap to 6am&quot; or &quot;set food cost target to 28%&quot;.
        </p>
      </main>
    </div>
  );
}
