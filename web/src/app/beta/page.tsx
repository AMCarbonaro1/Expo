"use client";

import { useState } from "react";
import { LogoSignal } from "@/components/Logo";

export default function BetaPage() {
  const [form, setForm] = useState({
    name: "",
    restaurant_name: "",
    phone: "",
    city: "",
    pos_system: "",
    years_open: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isNonSquare = form.pos_system && form.pos_system !== "square";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.restaurant_name || !form.phone || !form.city || !form.pos_system) return;
    setSubmitting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.carbonaromedia.com"}/api/beta/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1923] text-white">
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-20">
        {/* Logo */}
        <div className="mb-16">
          <LogoSignal size={32} color="#d97757" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight mb-8">
          I need 3 restaurants in Metro Detroit to prove this works.
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-[#d97757] flex items-center justify-center text-white font-bold text-lg">A</div>
          <div>
            <p className="font-medium">Anthony Carbonaro</p>
            <p className="text-white/50 text-sm">Founder, Expo · Detroit, Michigan</p>
          </div>
        </div>

        {/* The pitch */}
        <div className="space-y-6 text-white/70 leading-relaxed mb-16">
          <p>
            I built an AI that connects to your Square POS and your bank account. You text it a phone number and ask anything about your restaurant — sales, staffing, deposits, invoices — and it texts you back with real answers. No app. No dashboard. Just a text conversation.
          </p>
          <p>
            I call it <strong className="text-[#d97757]">Expo</strong>. It sends you a morning recap before you even get to the restaurant. It alerts you when you&apos;re overstaffed. It reads your supplier invoices from a photo and catches price increases. It watches your bank deposits and tells you if something doesn&apos;t match.
          </p>
          <p>
            Before I charge anyone for it, I need to know it works in a real restaurant with real numbers running all day. Not a demo. Not a simulation. A real kitchen, real orders, real invoices, real problems.
          </p>
          <p>
            I&apos;m looking for <strong className="text-white">3 restaurants within an hour of Detroit</strong> to partner with for 60 days. I&apos;ll be in your restaurant on and off — testing, filming, getting your feedback, and making sure Expo actually does what I say it does.
          </p>
          <p>
            In exchange, here&apos;s what you get:
          </p>
        </div>

        {/* What you get */}
        <div className="space-y-4 mb-16">
          {[
            { title: "Expo for life", desc: "Free forever. Not a trial, not a year — for life. No strings." },
            { title: "A 60-day business audit", desc: "I'll be in your restaurant with AI watching every sale, every invoice, every shift. You'll find money you didn't know you were losing." },
            { title: "Priority feature requests", desc: "Whatever you need Expo to do, it goes to the top of the list. You're shaping the product." },
            { title: "Direct founder access", desc: "My personal number. Not a support ticket, not a chatbot. Me." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="w-8 h-8 rounded-full bg-[#d97757]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-white/50 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What I need */}
        <div className="mb-16">
          <h2 className="text-xl font-bold font-serif mb-6">What I need from you:</h2>
          <div className="space-y-3">
            {[
              "You use Square POS",
              "You're within an hour of Detroit",
              "You'll text Expo regularly for 60 days",
              "You'll give honest feedback",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d97757] flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="bg-[#5a9a6e]/10 border border-[#5a9a6e]/30 rounded-xl p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#5a9a6e]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {isNonSquare ? (
              <>
                <h3 className="text-xl font-bold text-white">Got it — we&apos;ll reach out.</h3>
                <p className="text-white/50">We only support Square POS right now, but we&apos;re adding more systems soon. We&apos;ll contact you when yours is ready.</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white">Application received.</h3>
                <p className="text-white/50">I&apos;ll review your info and reach out personally within 48 hours. Talk soon.</p>
                <p className="text-white/30 text-sm">— Anthony</p>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold font-serif mb-2">Interested? Let&apos;s talk.</h2>
            <p className="text-white/50 text-sm mb-6">Fill this out and I&apos;ll reach out personally.</p>

            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Your name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#d97757] transition"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Restaurant name</label>
              <input
                type="text"
                required
                value={form.restaurant_name}
                onChange={(e) => setForm({ ...form, restaurant_name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#d97757] transition"
                placeholder="Joe's Diner"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Phone number</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#d97757] transition"
                placeholder="(313) 555-1234"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">City</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#d97757] transition"
                placeholder="Detroit, Dearborn, Ann Arbor..."
              />
            </div>

            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">What POS do you use?</label>
              <select
                required
                value={form.pos_system}
                onChange={(e) => setForm({ ...form, pos_system: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d97757] transition appearance-none"
              >
                <option value="" className="bg-[#0f1923]">Select your POS...</option>
                <option value="square" className="bg-[#0f1923]">Square</option>
                <option value="toast" className="bg-[#0f1923]">Toast</option>
                <option value="clover" className="bg-[#0f1923]">Clover</option>
                <option value="other" className="bg-[#0f1923]">Other</option>
              </select>
              {isNonSquare && (
                <p className="text-[#d97757] text-xs mt-2">We only support Square right now — but submit anyway and we&apos;ll reach out when we add your system.</p>
              )}
            </div>

            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">How long have you been open?</label>
              <input
                type="text"
                value={form.years_open}
                onChange={(e) => setForm({ ...form, years_open: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#d97757] transition"
                placeholder="2 years, 6 months, etc."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#d97757] text-white font-bold py-4 rounded-lg hover:bg-[#c4654a] transition text-lg mt-4 disabled:opacity-50 shadow-lg shadow-[#d97757]/20"
            >
              {submitting ? "Submitting..." : "I'm Interested"}
            </button>
          </form>
        )}

        {/* Closing */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center space-y-3">
          <p className="text-white/40 text-sm">Only choosing 3. Serious inquiries only.</p>
          <p className="text-white/50">
            Or just call me:{" "}
            <a href="tel:3132004457" className="text-[#d97757] font-medium hover:underline">(313) 200-4457</a>
          </p>
          <p className="text-white/20 text-xs mt-8">Carbonaro Media LLC · Detroit, MI</p>
        </div>
      </div>
    </div>
  );
}
