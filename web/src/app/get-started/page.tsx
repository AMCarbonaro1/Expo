"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoSignal } from "@/components/Logo";

export default function GetStartedPage() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const checkedCount = checks.filter(Boolean).length;

  return (
    <div className="text-[#141413]">

      {/* ═══ 1. HERO — Dark, bold, dramatic ═══ */}
      <section className="relative bg-[#0f1923] text-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d97757]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d97757]/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-16">
          {/* Nav */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <LogoSignal size={32} color="#d97757" />
              <span className="text-xl font-bold tracking-tight">EXPO</span>
            </div>
            <Link href="/login" className="text-white/50 text-sm hover:text-white transition">Login</Link>
          </div>

          {/* Top banner */}
          <div className="bg-[#d97757] text-white text-center text-sm font-bold py-2 px-4 rounded-lg mb-8 tracking-wide">
            FOR INDEPENDENT RESTAURANT OWNERS WHO ARE TIRED OF GUESSING
          </div>

          {/* Headline */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-serif leading-tight">
              <span className="block text-2xl sm:text-3xl text-white/70">What if you could text a number that knows</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-[#d97757] relative inline-block mt-2">
                EVERYTHING
                {/* Hand-drawn circle around EVERYTHING */}
                <svg className="absolute -inset-3 sm:-inset-4" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="150" cy="40" rx="145" ry="35" stroke="#d97757" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" transform="rotate(-1 150 40)" />
                </svg>
              </span>
              <span className="block text-2xl sm:text-3xl text-white/70 mt-2">about your restaurant...</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/50 italic font-serif max-w-3xl mx-auto">
              Without running to the back office or bugging your staff for answers?
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-center text-white/60 max-w-2xl mx-auto mb-8">
            Expo connects to your POS and bank account — then you just <strong className="text-white">text it</strong> whenever you need an answer. Sales, labor, food cost, cash flow — all from one text.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/50 text-sm">Trusted by restaurant owners across Michigan</span>
          </div>

          {/* Video + CTA side by side on desktop */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Video */}
            <div className="lg:col-span-3">
              <p className="text-center text-sm text-white/70 mb-2">
                🎬 Watch The <strong className="text-[#d97757]">FREE</strong> Demo Below
              </p>
              <p className="text-center text-xs text-[#d97757] mb-3">🔊 Make Sure Your Sound Is Turned ON!</p>
              <div className="bg-black rounded-xl aspect-video flex items-center justify-center border-2 border-white/10 shadow-2xl shadow-[#d97757]/10">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#d97757] flex items-center justify-center mb-3 animate-pulse">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/30 text-sm">Press Play!</p>
                </div>
              </div>
            </div>

            {/* CTA / Offer box */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 space-y-4">
                <p className="text-center text-sm text-white/70">Get Started With Expo Today</p>
                <div className="text-center">
                  <p className="text-white/40 text-sm">
                    <span className="line-through decoration-[#c0392b] decoration-2">$197/month</span>
                    {/* Hand-drawn arrow */}
                    <svg className="inline w-8 h-4 mx-1" viewBox="0 0 32 16" fill="none"><path d="M2 8h24M22 3l6 5-6 5" stroke="#d97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </p>
                  <p className="text-4xl font-bold text-white">
                    <span className="text-[#d97757]">$49</span>
                    <span className="text-lg text-white/50 font-normal">/month</span>
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {["Unlimited AI text conversations", "Square POS integration", "Bank monitoring + alerts", "Invoice photo scanning", "Daily morning recaps"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#d97757] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block w-full bg-[#d97757] text-white font-bold py-4 rounded-lg hover:bg-[#c4654a] transition text-center text-lg shadow-lg shadow-[#d97757]/30">
                  GET STARTED NOW →
                </Link>
                <p className="text-center text-xs text-white/30">30-Day Money Back Guarantee · Cancel Anytime</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ TRUST LOGOS — floating between hero and quote ═══ */}
      <div className="relative z-10 -mt-8 mb-[-2rem] px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-[#d4d2c9] py-5 px-8">
          <p className="text-center text-[10px] font-bold text-[#87867f] uppercase tracking-[0.2em] mb-3">Powered By Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2 text-[#141413]/60">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.01 0A4.01 4.01 0 000 4.01v15.98A4.01 4.01 0 004.01 24h15.98A4.01 4.01 0 0024 19.99V4.01A4.01 4.01 0 0019.99 0H4.01zm2.04 6.05h11.9c.56 0 1.01.45 1.01 1.01v9.88c0 .56-.45 1.01-1.01 1.01H6.05c-.56 0-1.01-.45-1.01-1.01V7.06c0-.56.45-1.01 1.01-1.01z"/></svg>
              <span className="font-bold text-sm">Square</span>
            </div>
            <div className="flex items-center gap-2 text-[#141413]/60">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9.5" y="2" width="5" height="5" rx="1"/><rect x="17" y="2" width="5" height="5" rx="1"/><rect x="2" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><rect x="17" y="9.5" width="5" height="5" rx="1"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="9.5" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/></svg>
              <span className="font-bold text-sm">Plaid</span>
            </div>
            <div className="flex items-center gap-2 text-[#141413]/60">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 20.4a8.4 8.4 0 110-16.8 8.4 8.4 0 010 16.8zm3.6-11.4a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zm0 6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zm-6-6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zm0 6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0z"/></svg>
              <span className="font-bold text-sm">Twilio</span>
            </div>
            <div className="flex items-center gap-2 text-[#141413]/60">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-1-2H7l-1 2H4l5-10h2l5 10h-2l-1-2h-2zm.5-4L10 9.5 8.5 13h3z"/></svg>
              <span className="font-bold text-sm">Claude AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 3. AUTHORITY QUOTE — floating dark card ═══ */}
      <section className="bg-[#e8e6dc] pt-14 pb-8 px-6">
        <div className="relative max-w-4xl mx-auto bg-[#141413] rounded-2xl shadow-2xl py-14 px-8 sm:px-14 overflow-hidden">
          {/* Decorative quote marks */}
          <div className="absolute top-2 left-6 text-[#d97757]/10 text-[180px] font-serif leading-none select-none">&ldquo;</div>
          <div className="absolute bottom-[-2rem] right-6 text-[#d97757]/10 text-[180px] font-serif leading-none select-none">&rdquo;</div>
          <div className="relative text-center">
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif italic leading-relaxed">
              &quot;The difference between a restaurant that makes it and one that doesn&apos;t? <strong className="text-[#d97757] not-italic">The owner who knows what&apos;s happening before it becomes a problem.</strong>&quot;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-0.5 bg-[#d97757]" />
              <p className="text-[#d97757] font-bold text-lg tracking-wide">GORDON RAMSAY</p>
              <div className="w-10 h-0.5 bg-[#d97757]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. "WHAT IF..." ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8 text-center">
          <p className="text-xl sm:text-2xl text-[#30302e] leading-relaxed">
            <strong className="text-[#d97757]">What if</strong> you could check on your restaurant from your kid&apos;s soccer game... just by sending a text?
          </p>
          <p className="text-xl sm:text-2xl text-[#30302e] leading-relaxed">
            <strong className="text-[#d97757]">What if</strong> you knew your food cost, your labor percentage, and your bank balance before you even got to the restaurant?
          </p>
          <p className="text-xl sm:text-2xl text-[#30302e] leading-relaxed">
            <strong className="text-[#d97757]">What if</strong> someone was watching your numbers while you sleep — and texted you the second something looked off?
          </p>
          <p className="text-3xl font-bold font-serif text-[#141413] pt-4">That&apos;s Expo.</p>
        </div>
      </section>

      {/* ═══ 6. PERSONAL LETTER ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm text-[#87867f] mb-1">From: <strong className="text-[#141413]">Anthony Carbonaro</strong></p>
          <p className="text-sm text-[#87867f] mb-8">Detroit, Michigan</p>
          <div className="space-y-4 text-[#30302e] leading-relaxed">
            <p>Dear fellow restaurant owner,</p>
            <p>I&apos;m going to be honest with you.</p>
            <p>Running a restaurant is one of the hardest things a person can do. You&apos;re the cook, the manager, the accountant, the HR department, the janitor, and the therapist — all in one.</p>
            <p>And after a 14-hour day on your feet, the <strong>LAST</strong> thing you want to do is sit down at a computer and look at spreadsheets.</p>
            <p>I get it. I grew up around this industry. I watched owners pour their entire lives into their restaurants and still not know — <em>really know</em> — if they were making money.</p>
            <p>Not because they were bad at business. Because the tools available to them were built for people who sit at desks. Not for people who are elbow-deep in a fryer at 2pm on a Tuesday.</p>
            <p>So I built something different.</p>
            <p className="text-2xl font-bold font-serif text-[#141413]">I built Expo.</p>
            <p>It&apos;s not an app. It&apos;s not a dashboard. It&apos;s not software you have to learn.</p>
            <p>It&apos;s a phone number you text. And it texts you back with real answers about your business.</p>
            <div className="bg-[#0f1923] rounded-xl p-5 space-y-3 text-sm text-white/80 my-6">
              <p><span className="text-[#d97757] font-medium">You:</span> &quot;How did we do today?&quot;</p>
              <p><span className="text-white/50 font-medium">Expo:</span> <em>Yesterday&apos;s sales, labor, and top sellers — in 10 seconds.</em></p>
              <p><span className="text-[#d97757] font-medium">You:</span> &quot;Did Lauren make the drop?&quot;</p>
              <p><span className="text-white/50 font-medium">Expo:</span> <em>Confirmed. $2,910 deposited at 9:47pm.</em></p>
              <p><span className="text-[#d97757] font-medium">You:</span> &quot;Am I making money?&quot;</p>
              <p><span className="text-white/50 font-medium">Expo:</span> <em>$18K revenue, $5.4K food, $5K labor. Netting ~$2.4K.</em></p>
            </div>
            <p>That&apos;s it. You text it like you&apos;d text your manager. Except this one actually has the numbers.</p>
            <p className="font-medium">— Anthony</p>
          </div>
        </div>
      </section>

      {/* ═══ 7. CHECKBOX ENGAGEMENT ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-2">Be honest with yourself for a second.</h2>
          <p className="text-[#87867f] text-center mb-8">Check every box that sounds like you:</p>
          <div className="space-y-4">
            {[
              "You glance at the POS before you lock up, but you don't really analyze anything",
              "You have a pile of invoices somewhere that you'll \"get to eventually\"",
              "You find out your real food cost when your accountant tells you — 90 days too late",
              "You've been burned by a supplier raising prices and you didn't catch it for weeks",
              "You make staffing decisions based on gut feel because you don't have time to check the data",
              "You've laid in bed at night wondering if your closer made the bank deposit",
              "You know you should be tracking your numbers more closely, but who has the time?",
            ].map((text, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group" onClick={() => {
                const newChecks = [...checks];
                newChecks[i] = !newChecks[i];
                setChecks(newChecks);
              }}>
                <div className={`w-6 h-6 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition ${checks[i] ? "bg-[#d97757] border-[#d97757]" : "border-[#d4d2c9] bg-white group-hover:border-[#d97757]"}`}>
                  {checks[i] && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-[#30302e] leading-relaxed">{text}</span>
              </label>
            ))}
          </div>
          {checkedCount > 0 && (
            <div className="mt-8 text-center bg-[#d97757] text-white rounded-xl p-6 shadow-lg">
              <p className="text-2xl font-bold">You checked {checkedCount} box{checkedCount > 1 ? "es" : ""}.</p>
              <p className="mt-1 text-white/80">Expo was built <strong>specifically</strong> for you.</p>
              <Link href="/signup" className="inline-block mt-4 bg-white text-[#d97757] font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition">
                GET STARTED NOW →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 8. THE HARD WAY — floating card ═══ */}
      <section className="bg-[#e8e6dc] py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-[#d4d2c9] p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-4">Here&apos;s what &quot;staying on top of your numbers&quot; actually looks like:</h2>
          <p className="text-[#87867f] text-center mb-10">Let&apos;s be real about what it takes:</p>
          <div className="space-y-3">
            {[
              { icon: "✍️", text: "Check your POS sales report every single night before you leave" },
              { icon: "📋", text: "Collect and organize every supplier invoice from every delivery" },
              { icon: "📊", text: "Enter each invoice line item into a spreadsheet to track food cost" },
              { icon: "🏦", text: "Log into your bank app daily to check deposits and account balance" },
              { icon: "🧮", text: "Manually calculate your food cost percentage every week" },
              { icon: "📞", text: "Call your accountant quarterly for a $500 meeting" },
              { icon: "👀", text: "Verify that your closers are making deposits on time" },
              { icon: "📅", text: "Compare this week to last week, this month to last month" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#fdf2f0] border border-[#c0392b]/10 rounded-lg p-4">
                <span className="text-xl">{item.icon}</span>
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

      {/* ═══ 9. THE SHORTCUT ═══ */}
      <section className="bg-[#0f1923] text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-2">What if there was a
            <span className="relative inline-block mx-2">
              shortcut
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none"><path d="M2 8c40-6 80-6 100-2s60 2 96-2" stroke="#d97757" strokeWidth="3" strokeLinecap="round"/></svg>
            </span>
            ?
          </h2>
          <p className="text-white/50 text-center mb-14">Not a hack. An actual, legitimate shortcut that does 90% of the work for you.</p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: "1", title: "CONNECT", time: "60 seconds", desc: "One tap to connect your Square POS. One tap to connect your bank. Expo pulls everything automatically. You set it up once. Expo does the rest forever." },
              { num: "2", title: "TEXT", time: "10 seconds", desc: "Ask Expo anything in plain English. \"How did we do today?\" \"Should I cut someone?\" Text it a photo of any invoice — it reads every line item instantly." },
              { num: "3", title: "KNOW", time: "24/7", desc: "Morning recap at 7am. Alerts when labor spikes, food cost creeps, deposits are missing, or cash flow is tight. A partner who never sleeps." },
            ].map((s) => (
              <div key={s.num} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#d97757] flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#d97757]/30">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold">{s.title} <span className="text-white/40 text-sm font-normal">({s.time})</span></h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. TESTIMONIALS BLOCK 1 ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Don&apos;t take our word for it.</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Maria G.", role: "Maria's Taqueria · Detroit", quote: "I used to find out I was losing money at the end of the quarter. Now I know by 7am the next morning. Expo paid for itself in the first week." },
              { name: "James T.", role: "JT's Coney Island · Dearborn", quote: "I just text it a photo of my Sysco invoice and it tracks everything. No more spreadsheets. It just knows." },
              { name: "David K.", role: "King's Pizza · Warren", quote: "It texted me that my labor was at 38% on a slow Tuesday. I was overstaffed and had no idea. That one alert saved me $400." },
              { name: "Sarah M.", role: "Sarah's Diner · Southfield", quote: "I texted 'am I making money?' at 11pm from my couch. For the first time in 10 years, I actually knew where I stood." },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#d4d2c9] rounded-xl p-6 space-y-3 shadow-sm">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                <p className="text-[#30302e] text-sm italic leading-relaxed">&quot;{t.quote}&quot;</p>
                <p className="font-semibold text-sm text-[#141413]">{t.name} <span className="font-normal text-[#87867f]">— {t.role}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. OFFER STACK — floating card ═══ */}
      <section className="bg-[#e8e6dc] py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#d4d2c9] p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Here&apos;s Everything You Get</h2>
          <div className="space-y-3">
            {[
              { item: "Unlimited AI Business Conversations via SMS", value: "$297/mo" },
              { item: "Square POS Integration + Automatic Daily Sync", value: "$49/mo" },
              { item: "Bank Account Monitoring + Cash Flow Alerts", value: "$49/mo" },
              { item: "Invoice Photo Scanning + Food Cost Tracking", value: "$79/mo" },
              { item: "Daily Morning Recaps at 7am", value: "$29/mo" },
              { item: "Smart Alerts (labor, sales, deposits, price changes)", value: "$49/mo" },
            ].map((row) => (
              <div key={row.item} className="flex items-center justify-between py-3 border-b border-[#d4d2c9] last:border-0">
                <span className="text-[#30302e] text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#5a9a6e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {row.item}
                </span>
                <span className="text-[#87867f] text-sm font-medium whitespace-nowrap ml-4 line-through">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#0f1923] rounded-xl p-8 text-center text-white">
            <p className="text-white/50 text-sm">Total Value: <span className="line-through">$552/month</span></p>
            <p className="text-5xl font-bold mt-2">
              <span className="text-white/30 text-2xl line-through mr-3">$197</span>
              <span className="text-[#d97757]">$49</span>
              <span className="text-lg text-white/50 font-normal">/month</span>
            </p>
            <Link href="/signup" className="inline-block mt-6 bg-[#d97757] text-white font-bold px-12 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/30">
              GET STARTED NOW →
            </Link>
            <p className="text-white/30 text-xs mt-3">30-Day Money Back Guarantee · Cancel Anytime</p>
          </div>
        </div>
      </section>

      {/* ═══ 13. NO CATCH ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-8">&quot;OK, so what&apos;s the catch?&quot;</h2>
          <div className="space-y-4 text-[#30302e] leading-relaxed">
            <p className="text-center text-xl font-bold">There is no catch. Seriously.</p>
            <p><strong>There&apos;s no setup fee.</strong> You connect your accounts in 5 minutes.</p>
            <p><strong>There&apos;s no annual contract.</strong> Cancel anytime with one text.</p>
            <p><strong>There&apos;s no hidden upsell.</strong> $49/month is $49/month. Period.</p>
            <p className="text-[#87867f] italic pt-4">&quot;So why is it so affordable?&quot;</p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><strong>The AI does the heavy lifting.</strong> I don&apos;t need a team of analysts billing you $200/hour.</li>
              <li><strong>I want to help independent restaurants survive.</strong> Chains have finance departments. You have a shoebox of invoices.</li>
              <li><strong>Happy owners tell other owners.</strong> My best marketing is you telling your buddy at the next restaurant over.</li>
              <li><strong>And honestly?</strong> I&apos;m tired of watching great restaurants close because the owner couldn&apos;t see the numbers in time.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ 14. TESTIMONIALS BLOCK 2 ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">More owners. More results.</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Mike R.", role: "Mike's Gyro House · Hamtramck", quote: "I texted Expo at 2am asking if my closer made the deposit. It confirmed a $2,910 deposit hit my Chase account at 9:47pm. I went back to sleep." },
              { name: "Lisa P.", role: "Lisa's Tacos · Ferndale", quote: "I took a photo of my US Foods invoice. Ten seconds later, Expo told me chicken breast went up 8% and gyro meat went up 19%. I adjusted my menu prices that day." },
              { name: "Tony V.", role: "Tony's Family Restaurant · Livonia", quote: "My morning recap text is the first thing I read every day. It's like having a CFO for $49 a month." },
              { name: "Carmen D.", role: "Carmen's Kitchen · Westland", quote: "I asked 'can I afford to hire someone?' and it did the math. No accountant has ever given me an answer that fast." },
            ].map((t) => (
              <div key={t.name} className="bg-[#f5f4f0] border border-[#d4d2c9] rounded-xl p-6 space-y-3">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                <p className="text-[#30302e] text-sm italic leading-relaxed">&quot;{t.quote}&quot;</p>
                <p className="font-semibold text-sm text-[#141413]">{t.name} <span className="font-normal text-[#87867f]">— {t.role}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 15. SCARCITY ═══ */}
      <section className="bg-[#0f1923] text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">This price
            <span className="relative inline-block mx-2">
              won&apos;t last
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 180 12" fill="none"><path d="M2 8c30-6 60-6 90-2s60 2 86-2" stroke="#c0392b" strokeWidth="3" strokeLinecap="round"/></svg>
            </span>.
          </h2>
          <p className="text-white/60 leading-relaxed">
            I&apos;m keeping Expo at <strong className="text-[#d97757]">$49/month</strong> for the first wave. Once we hit capacity, it&apos;s going back to $197/month.
          </p>
          <p className="text-white/40 text-sm pt-4">
            30 days from now, you&apos;ll either be 30 days older... <strong className="text-white">or 30 days smarter about your business.</strong>
          </p>
        </div>
      </section>

      {/* ═══ 16. GUARANTEE ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-white border-2 border-[#5a9a6e] rounded-xl p-8 space-y-4 shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#5a9a6e]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#141413]">The &quot;Text Me Back&quot; Guarantee</h2>
            <p className="text-[#30302e] leading-relaxed">
              Try Expo for 30 days. If you don&apos;t have a better grip on your numbers — text us &quot;cancel&quot; and I&apos;ll refund every penny.
            </p>
            <p className="text-lg font-bold text-[#5a9a6e]">You literally cannot lose.</p>
          </div>
        </div>
      </section>

      {/* ═══ 17. CTA ═══ */}
      <section className="bg-[#0f1923] text-white py-16">
        <div className="max-w-lg mx-auto px-6 text-center space-y-6">
          <p className="text-xl font-serif">Do you want to keep <span className="line-through text-white/40">guessing</span>... or start <strong className="text-[#d97757]">knowing</strong>?</p>
          <Link href="/signup" className="block w-full bg-[#d97757] text-white font-bold py-5 rounded-lg hover:bg-[#c4654a] transition text-xl shadow-lg shadow-[#d97757]/30">
            GET STARTED — $49/MONTH →
          </Link>
          <p className="text-white/30 text-xs">Setup takes 5 minutes. First recap arrives tomorrow at 7am.</p>
        </div>
      </section>

      {/* ═══ 18. SECRETS LIST ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">What you&apos;ll discover in your first week:</h2>
          <div className="space-y-4">
            {[
              "Your REAL food cost percentage — not what you think it is",
              "Whether your deposits match your POS sales",
              "Which days you're overstaffed and which you're understaffed",
              "Your top sellers — and worst performers dragging down your ticket",
              "How much your supplier prices changed this month",
              "Whether your bank can cover rent + payroll next week",
              "Your labor percentage vs the 30% industry target",
              "Your actual busiest and slowest hours",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-[#d97757] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-[#30302e] leading-relaxed pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 20. FAQ ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Questions? We&apos;ve got answers.</h2>
          <div className="space-y-6">
            {[
              { q: "What exactly is Expo?", a: "An AI business partner that connects to your Square POS and bank, then lets you text it about your restaurant. No app, no dashboard." },
              { q: "Do I need to download anything?", a: "Nope. It lives in your text messages. If you can text, you can use Expo." },
              { q: "What if I'm not good with technology?", a: "That's exactly who we built this for. Your 70-year-old mother could use it." },
              { q: "How is this different from my Square dashboard?", a: "Square shows data. Expo thinks with you. Try asking Square \"should I cut someone today?\" — it can't answer that. Expo can." },
              { q: "Can Expo move my money?", a: "Absolutely not. Read-only access through Plaid. We can never move money or see your password." },
              { q: "How do I cancel?", a: "Text us \"cancel\" or email support. No contracts. No fees. No guilt trip." },
            ].map((item) => (
              <div key={item.q} className="border-b border-[#d4d2c9] pb-6 last:border-0">
                <h3 className="font-bold text-[#141413] mb-2">{item.q}</h3>
                <p className="text-[#87867f] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 21. P.S. ═══ */}
      <section className="bg-[#e8e6dc] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#0f1923] text-white rounded-xl p-8 space-y-4">
            <p>
              <strong className="text-[#d97757]">P.S.</strong> In case you scrolled straight to the bottom (I would too), here&apos;s the deal:
            </p>
            <p className="text-white/70">
              Expo connects to your Square POS and bank, then lets you run your restaurant from text messages. Morning recaps. Smart alerts. Invoice scanning. Cash flow monitoring. A partner who never sleeps.
            </p>
            <p className="text-white/70">
              <span className="line-through text-white/40">$197/month</span> → <strong className="text-[#d97757]">$49/month</strong> right now. Cancel anytime. 30-day money-back guarantee.
            </p>
            <p className="font-bold text-white">Every day without it is a day you&apos;re guessing instead of knowing.</p>
            <div className="text-center pt-2">
              <Link href="/signup" className="inline-block bg-[#d97757] text-white font-bold px-12 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/30">
                GET STARTED NOW →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 22. FOOTER ═══ */}
      <section className="bg-[#0f1923] text-white/30 py-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs space-y-2">
          <p>© 2026 Expo by Carbonaro Media · Detroit, MI</p>
          <p>Terms of Service · Privacy Policy · support@carbonaromedia.com</p>
          <p className="max-w-lg mx-auto">Results vary. Expo provides data-driven insights based on your POS, bank, and invoice data. Expo does not provide financial or legal advice.</p>
        </div>
      </section>
    </div>
  );
}
