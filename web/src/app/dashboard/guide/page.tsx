"use client";

import DashboardNav from "@/components/DashboardNav";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  {
    title: "Sales & Performance",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    examples: [
      { text: "How did we do today?", desc: "Yesterday's sales, orders, avg ticket" },
      { text: "How was this week?", desc: "Weekly sales summary and trends" },
      { text: "Compare this week to last week", desc: "Side-by-side comparison" },
      { text: "What's my best selling item?", desc: "Top sellers by volume or revenue" },
      { text: "What's my busiest hour?", desc: "Peak times from your POS data" },
      { text: "What's my average Tuesday?", desc: "Day-of-week analysis" },
    ],
  },
  {
    title: "Labor & Staffing",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    examples: [
      { text: "What's my labor this week?", desc: "Labor cost and percentage" },
      { text: "Should I cut someone today?", desc: "Based on current pace vs average" },
      { text: "Can I afford to hire someone?", desc: "Impact on labor % and cash flow" },
      { text: "How many hours should I schedule?", desc: "Based on sales trends by day" },
    ],
  },
  {
    title: "Food Cost & Invoices",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    examples: [
      { text: "What's my food cost running?", desc: "Invoice totals vs sales percentage" },
      { text: "Did chicken go up?", desc: "Price change tracking from invoices" },
      { text: "What did I spend at Sysco last month?", desc: "Vendor-specific history" },
      { text: "Show me my last 5 invoices", desc: "Recent invoice summary" },
      { text: "[Send a photo]", desc: "Text a photo of any invoice — Expo reads it" },
    ],
  },
  {
    title: "Bank & Cash Flow",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    examples: [
      { text: "What's in my bank account?", desc: "Current balance and recent activity" },
      { text: "Am I making money?", desc: "Revenue minus all visible expenses" },
      { text: "Will I make rent this month?", desc: "Balance vs upcoming recurring bills" },
      { text: "What are my biggest expenses?", desc: "Expense breakdown by category" },
      { text: "Is my rent too high?", desc: "Rent as percentage of revenue" },
    ],
  },
  {
    title: "Business Advice",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    examples: [
      { text: "Should I raise my prices?", desc: "Based on margins, food cost, avg ticket" },
      { text: "What should I cut to save money?", desc: "Biggest expense opportunities" },
      { text: "How's my business doing overall?", desc: "Full picture across all data" },
    ],
  },
  {
    title: "Settings Commands",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    examples: [
      { text: "Change my recap to 6am", desc: "Update morning recap time" },
      { text: "Turn off morning recaps", desc: "Disable daily recaps" },
      { text: "Set my food cost target to 28%", desc: "Update food cost baseline" },
      { text: "Turn off alerts", desc: "Disable all alert notifications" },
      { text: "What are my settings?", desc: "See current preferences" },
    ],
  },
];

export default function GuidePage() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8e6dc] flex items-center justify-center">
        <p className="text-[#87867f]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e6dc]">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] font-serif">
            What to ask Expo
          </h1>
          <p className="text-[#87867f] mt-1">
            Tap any example to open it in your text messages. Or just ask in your own words — Expo understands plain English.
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.title} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#d97757]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                  </svg>
                </div>
                <h2 className="font-semibold text-[#141413]">{cat.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {cat.examples.map((ex) => (
                  <a
                    key={ex.text}
                    href={ex.text === "[Send a photo]" ? "sms:+13134749394" : `sms:+13134749394&body=${encodeURIComponent(ex.text)}`}
                    className="bg-white border border-[#d4d2c9] rounded-lg p-4 hover:border-[#d97757]/40 hover:shadow-sm transition-all duration-200 block"
                  >
                    <p className="text-[#141413] text-sm font-medium">
                      &quot;{ex.text}&quot;
                    </p>
                    <p className="text-[#87867f] text-xs mt-1">{ex.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 text-center space-y-3">
          <p className="text-[#30302e] font-medium">
            Don&apos;t see what you need?
          </p>
          <p className="text-[#87867f] text-sm">
            Just text Expo in your own words. It understands natural language —
            ask it like you&apos;d ask a friend who knows your business inside and out.
          </p>
          <a
            href="sms:+13134749394"
            className="inline-block bg-[#d97757] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#c4654a] transition"
          >
            Text Expo Now
          </a>
        </div>
      </main>
    </div>
  );
}
