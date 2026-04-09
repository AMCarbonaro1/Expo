"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoSignal } from "@/components/Logo";

export default function BetaPage() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const checkedCount = checks.filter(Boolean).length;

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
    <div className="text-[#141413]">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative bg-[#0f1923] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d97757]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d97757]/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-16">
          {/* Nav */}
          <div className="flex items-center gap-2 mb-12">
            <LogoSignal size={32} color="#d97757" />
            <span className="text-xl font-bold tracking-tight">EXPO</span>
          </div>

          {/* Banner */}
          <div className="bg-[#d97757] text-white text-center text-sm font-bold py-2 px-4 rounded-lg mb-8 tracking-wide">
            LOOKING FOR 3 RESTAURANTS IN METRO DETROIT
          </div>

          {/* Headline */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-serif leading-tight">
              <span className="block text-2xl sm:text-3xl text-white/70">What if you could text a number that knows</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-[#d97757] relative inline-block mt-2">
                EVERYTHING
                <svg className="absolute -inset-3 sm:-inset-4" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="150" cy="40" rx="145" ry="35" stroke="#d97757" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" transform="rotate(-1 150 40)" />
                </svg>
              </span>
              <span className="block text-2xl sm:text-3xl text-white/70 mt-2">about your restaurant?</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/50 italic font-serif max-w-3xl mx-auto">
              We built it. Now we need 3 restaurants to prove it works.
            </p>
          </div>

          {/* Video + Beta info box */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <div className="bg-black rounded-xl aspect-video flex items-center justify-center border-2 border-white/10 shadow-2xl shadow-[#d97757]/10">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#d97757] flex items-center justify-center mb-3 animate-pulse">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/30 text-sm">Demo coming soon</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 space-y-4">
                <p className="text-center text-sm text-white/70">Founding Partner Program</p>
                <div className="text-center space-y-1">
                  <p className="text-white/40 text-sm">3 spots available · Metro Detroit</p>
                  <p className="text-3xl font-bold text-[#d97757]">Completely Free</p>
                  <p className="text-white/40 text-sm">Expo for life — no strings</p>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {["Free forever — not a trial", "60-day embedded business audit", "Priority feature requests", "Direct founder access"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d97757] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#apply" className="block w-full bg-[#d97757] text-white font-bold py-4 rounded-lg hover:bg-[#c4654a] transition text-center text-lg shadow-lg shadow-[#d97757]/30">
                  APPLY NOW ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. TRUST LOGOS ═══ */}
      <div className="relative z-10 -mt-8 mb-[-2rem] px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-[#d4d2c9] py-5 px-8">
          <p className="text-center text-[10px] font-bold text-[#87867f] uppercase tracking-[0.2em] mb-3">Powered By Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {["Square", "Plaid", "Twilio", "Claude AI"].map((name) => (
              <span key={name} className="text-sm font-bold text-[#141413]/50">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 3. WHAT IF... ═══ */}
      <section className="bg-[#e8e6dc] py-20 sm:py-28 px-6">
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          {[
            <><strong className="text-[#d97757]">What if</strong>{" "}you could text one number from the kitchen and instantly know how many gyro platters you&apos;ve sold today — without pulling anyone off the line?</>,
            <><strong className="text-[#d97757]">What if</strong>{" "}you could check if the deposit went through from your bed at midnight — instead of worrying about it until morning?</>,
            <><strong className="text-[#d97757]">What if</strong>{" "}you had a partner watching everything in real time — and it texted YOU when something needed attention, before you even had to ask?</>,
          ].map((q, i) => (
            <p key={i} className="text-xl sm:text-2xl font-serif text-[#30302e] leading-relaxed">{q}</p>
          ))}
          <div className="pt-4">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-[#141413]">That&apos;s Expo.</p>
            <p className="text-lg text-[#d97757] font-semibold mt-2">And we&apos;re giving it to 3 restaurants for free.</p>
          </div>
        </div>
      </section>

      {/* ═══ 4. FOUNDER NOTE ═══ */}
      <section className="bg-[#e8e6dc] pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#fffdf8] rounded-2xl shadow-xl border border-[#d4d2c9] p-8 sm:p-12">
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-t-[#e8e6dc] border-l-[48px] border-l-transparent" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#d97757] flex items-center justify-center text-white font-bold text-lg">A</div>
              <div>
                <p className="font-bold text-[#141413]">Anthony Carbonaro</p>
                <p className="text-[#87867f] text-sm">Founder, Expo · Detroit, Michigan</p>
              </div>
            </div>
            <div className="space-y-4 text-[#30302e] leading-relaxed">
              <p>I built an AI that connects to your Square POS and bank account. You text it a phone number and ask anything — sales, staffing, deposits, invoices — and it texts back with real answers. No app. No dashboard. Just a conversation about your business.</p>
              <p>Before I charge anyone for it, I need to prove it works in a real restaurant with real numbers running all day. Not a demo. Not a simulation.</p>
              <p>I&apos;m looking for <strong className="text-[#d97757]">3 restaurants within an hour of Detroit</strong>{" "}to partner with for 60 days. I&apos;ll be in your restaurant on and off — testing, getting feedback, and making sure this thing actually does what I say it does.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. CHECKBOXES ═══ */}
      <section className="bg-[#e8e6dc] pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-2">Be honest with yourself for a second.</h2>
          <p className="text-[#87867f] mb-8">Check every box that sounds like you:</p>
          <div className="space-y-3 text-left">
            {[
              "You interrupt your cooks mid-rush to ask how many of something you've sold",
              "You walk to the back office just to check one number on the POS screen",
              "You have a pile of invoices somewhere that you'll 'get to eventually'",
              "You've been burned by a supplier raising prices and you didn't catch it for weeks",
              "You make staffing decisions on gut feel because you're too busy to check the data",
              "You've laid in bed at night wondering if your closer made the bank deposit",
              "You can't get a straight answer about your business without stopping everything you're doing",
            ].map((text, i) => (
              <label key={i} className="flex items-start gap-3 bg-white border border-[#d4d2c9] rounded-lg p-4 cursor-pointer hover:border-[#d97757]/40 transition">
                <input
                  type="checkbox"
                  checked={checks[i]}
                  onChange={() => {
                    const next = [...checks];
                    next[i] = !next[i];
                    setChecks(next);
                  }}
                  className="mt-0.5 w-5 h-5 rounded border-[#d4d2c9] text-[#d97757] focus:ring-[#d97757] accent-[#d97757]"
                />
                <span className="text-[#30302e] text-sm">{text}</span>
              </label>
            ))}
          </div>
          {checkedCount > 0 && (
            <div className="mt-6 bg-[#d97757] text-white rounded-xl p-6 space-y-3">
              <p className="text-lg">You checked <strong>{checkedCount} box{checkedCount > 1 ? "es" : ""}</strong>.</p>
              <p className="mt-1 text-white/80">You&apos;re exactly who we&apos;re looking for.</p>
              <a href="#apply" className="inline-block bg-white text-[#d97757] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition mt-2">
                APPLY BELOW ↓
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 6. THE HARD WAY ═══ */}
      <section className="bg-[#e8e6dc] pb-10 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-[#d4d2c9] p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-4">Here&apos;s what &quot;staying on top of your numbers&quot; actually looks like:</h2>
          <p className="text-[#87867f] text-center mb-10">Let&apos;s be real about what it takes:</p>
          <div className="space-y-3">
            {[
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "Walk to the back office every time you want to check a number" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, text: "Interrupt your servers and cooks to ask about orders and counts" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, text: "Collect and organize every supplier invoice from every delivery" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, text: "Enter each invoice line item into a spreadsheet to track food cost" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l9-4 9 4M3 6v14l9 4 9-4V6M3 6l9 4 9-4M12 10v10" /></svg>, text: "Log into your bank app to check if the deposit went through" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, text: "Try to figure out if you're overstaffed while you're mid-rush" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, text: "Call your accountant quarterly for a $500 meeting to find out how you did" },
              { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>, text: "Lay awake at night wondering if everything got done" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#fdf2f0] border border-[#c0392b]/10 rounded-lg p-4">
                <div className="w-9 h-9 rounded-full bg-[#c0392b]/10 text-[#c0392b] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-[#30302e] text-sm line-through decoration-[#c0392b]/50 decoration-2">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-2xl font-bold text-[#141413]">Sound exhausting?</p>
            <p className="text-[#87867f] mt-2">That&apos;s because it IS. And most owners just... <strong className="text-[#c0392b]">don&apos;t do most of it.</strong></p>
          </div>
        </div>
      </section>

      {/* ═══ 7. THE SHORTCUT ═══ */}
      <section className="bg-[#0f1923] text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-2">What if there was a shortcut?</h2>
          <p className="text-white/50 text-center mb-12">Connect in 60 seconds. Ask in 10. Know everything 24/7.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "CONNECT", time: "60 seconds", desc: "One tap to connect your Square POS. One tap for your bank through Plaid. That's it." },
              { step: "2", title: "TEXT", time: "10 seconds", desc: "Ask anything. Send an invoice photo. Talk to it like your smartest employee." },
              { step: "3", title: "KNOW", time: "24/7", desc: "Morning recaps at 7am. Smart alerts mid-shift. A partner who never sleeps." },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#d97757] text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#d97757]/30">{item.step}</div>
                <h3 className="text-lg font-bold tracking-wider">{item.title}</h3>
                <span className="inline-block bg-white/10 text-white/70 text-xs font-bold px-3 py-1 rounded-full">{item.time}</span>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#d97757] font-bold text-lg mt-10">And for our founding partners, it&apos;s completely free.</p>
        </div>
      </section>

      {/* ═══ 8. WHAT YOU GET ═══ */}
      <section className="bg-[#e8e6dc] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-4">What you get as a founding partner</h2>
          <p className="text-[#87867f] text-center mb-12">This isn&apos;t a trial. It&apos;s a partnership.</p>
          <div className="space-y-4">
            {[
              { title: "Expo for life", desc: "Free forever. Not a year. Not a trial. For life. No strings, no catches, no credit card." },
              { title: "A 60-day business audit", desc: "I'll be in your restaurant with AI analyzing every sale, every invoice, every shift. You'll find money you didn't know you were losing." },
              { title: "Priority feature requests", desc: "Whatever you need Expo to do, it goes to the top of the build list. You're shaping what this becomes." },
              { title: "Direct founder access", desc: "My personal phone number. Not a support ticket. Not a chatbot. Me — Anthony. Call or text anytime." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[#d4d2c9] p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d97757]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg text-[#141413]">{item.title}</p>
                  <p className="text-[#87867f] text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. WHAT WE NEED ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-8">What we need from you</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              { text: "You use Square POS", detail: "We connect directly to Square for real-time data" },
              { text: "You're within an hour of Detroit", detail: "So I can actually be in your restaurant" },
              { text: "You text Expo regularly for 60 days", detail: "Ask it questions, send invoices, use it like a partner" },
              { text: "You give honest feedback", detail: "Tell us what works, what doesn't, and what you wish it did" },
            ].map((item) => (
              <div key={item.text} className="border border-[#d4d2c9] rounded-lg p-5">
                <p className="font-semibold text-[#141413]">{item.text}</p>
                <p className="text-[#87867f] text-sm mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[#87867f] mt-8">That&apos;s it. We handle everything else.</p>
        </div>
      </section>

      {/* ═══ 10. THE FORM ═══ */}
      <section id="apply" className="bg-[#0f1923] text-white py-20 px-6">
        <div className="max-w-lg mx-auto">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#5a9a6e]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {isNonSquare ? (
                <>
                  <h3 className="text-xl font-bold">Got it — we&apos;ll reach out.</h3>
                  <p className="text-white/50">We only support Square POS right now, but we&apos;re adding more systems soon. We&apos;ll contact you when yours is ready.</p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">Application received.</h3>
                  <p className="text-white/50">I&apos;ll review your info and reach out personally within 48 hours.</p>
                  <p className="text-white/30 text-sm">— Anthony</p>
                </>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-2">Only 3 spots.</h2>
              <p className="text-white/50 text-center mb-8">Fill this out and I&apos;ll reach out personally.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "Your name", type: "text", placeholder: "John Smith", required: true },
                  { key: "restaurant_name", label: "Restaurant name", type: "text", placeholder: "Joe's Diner", required: true },
                  { key: "phone", label: "Phone number", type: "tel", placeholder: "(313) 555-1234", required: true },
                  { key: "city", label: "City", type: "text", placeholder: "Detroit, Dearborn, Ann Arbor...", required: true },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#d97757] transition"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

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
            </>
          )}

          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">Or just call me:</p>
            <a href="tel:3132004457" className="text-[#d97757] font-bold text-lg hover:underline">(313) 200-4457</a>
          </div>
        </div>
      </section>

      {/* ═══ 11. WHAT YOU'LL DISCOVER ═══ */}
      <section className="bg-[#e8e6dc] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-12">In your first week with Expo, you&apos;ll know:</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "What's selling right now — mid-shift, not end of day",
              "Whether you're overstaffed TODAY, not after payroll",
              "If last night's deposit went through — from your bed",
              "Your real food cost, not an estimate from memory",
              "Which supplier prices went up and by how much",
              "Your bank balance vs. upcoming expenses",
              "How today compares to the same day last week",
              "Who's clocked in, their hours, and sales per server",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg border border-[#d4d2c9] p-4">
                <span className="w-7 h-7 rounded-full bg-[#d97757] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <span className="text-[#30302e] text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 12. FOOTER ═══ */}
      <section className="bg-[#0f1923] text-white/20 py-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs space-y-2">
          <p>&copy; {new Date().getFullYear()} Carbonaro Media LLC · Detroit, MI</p>
          <div className="flex justify-center gap-4">
            <Link href="/terms" className="hover:text-white/40 transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white/40 transition">Privacy</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
