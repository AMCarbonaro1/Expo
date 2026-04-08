"use client";

import { useState } from "react";
import Link from "next/link";
import ExpoLogo from "@/components/ExpoLogo";

export default function GetStartedPage() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const checkedCount = checks.filter(Boolean).length;

  return (
    <div className="bg-[#e8e6dc] text-[#141413]">

      {/* ═══ 1. HERO ═══ */}
      <section className="max-w-3xl mx-auto px-6 pt-10 pb-16 text-center">
        <div className="mb-6">
          <ExpoLogo size={36} textClass="text-2xl" />
        </div>
        <div className="inline-block bg-[#d97757]/10 text-[#d97757] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Built For Independent Restaurant Owners
        </div>
        <h1 className="font-serif font-bold leading-tight mb-6">
          <span className="block text-3xl sm:text-4xl lg:text-5xl">What if you could text a number that knows <span className="text-[#d97757]">EVERYTHING</span> about your restaurant...</span>
          <span className="block text-xl sm:text-2xl lg:text-3xl mt-3 text-[#87867f] font-normal italic">Without running to the back office or bugging your staff for answers?</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#30302e] max-w-2xl mx-auto mb-8">
          Expo connects to your POS and bank account — then you just <strong>text it</strong> whenever you need an answer. Sales, labor, food cost, cash flow — all from one text. No app. No dashboard. No spreadsheets.
        </p>
        <p className="text-sm text-[#87867f] mb-8">⭐⭐⭐⭐⭐ Trusted by restaurant owners across Michigan</p>
        <Link href="/signup" className="inline-block bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg">
          Get Started — $49/month
        </Link>
        <p className="text-sm text-[#87867f] mt-3"><s className="text-[#c0392b]">$197/month</s> → $49/month for a limited time</p>
      </section>

      {/* ═══ 2. VIDEO ═══ */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <p className="text-center text-[#30302e] font-medium mb-2">Watch how Expo works in under 3 minutes 👇</p>
        <p className="text-center text-sm text-[#d97757] mb-4">🔊 Make sure your sound is ON!</p>
        <div className="bg-[#141413] rounded-xl aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm">Video coming soon</p>
          </div>
        </div>
        <p className="text-center text-sm text-[#87867f] mt-4">Still not sure? Keep scrolling — we&apos;ll answer every question you have.</p>
      </section>

      {/* ═══ 3. AUTHORITY ═══ */}
      <section className="border-y border-[#d4d2c9] py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-[#87867f] uppercase tracking-wider mb-6">Powered by the same technology trusted by millions</p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-14 text-[#87867f]/60 text-lg font-semibold mb-8">
            <span>Square</span><span>Plaid</span><span>Claude AI</span>
          </div>
          <blockquote className="bg-white rounded-lg p-6 border border-[#d4d2c9] max-w-xl mx-auto">
            <p className="text-[#30302e] italic">&quot;Restaurants that track their numbers daily are <strong>3x more likely</strong> to survive their first 5 years.&quot;</p>
            <p className="text-[#87867f] text-sm mt-2">— National Restaurant Association</p>
          </blockquote>
        </div>
      </section>

      {/* ═══ 4. FIRST CTA ═══ */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-6 text-center">
          <p className="text-[#87867f] text-sm mb-1"><s>$197/month</s></p>
          <p className="text-4xl font-bold mb-2">$49<span className="text-lg text-[#87867f] font-normal">/month</span></p>
          <p className="text-sm text-[#87867f] mb-6">Everything included. No setup fees. No contracts.</p>
          <Link href="/signup" className="inline-block w-full bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg">
            Get Started — $49/month
          </Link>
          <p className="text-xs text-[#87867f] mt-3">30-day money-back guarantee. Cancel anytime.</p>
        </div>
      </section>

      {/* ═══ 5. "WHAT IF..." ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6 space-y-8 text-center">
          <p className="text-xl sm:text-2xl text-[#30302e] leading-relaxed">
            <strong className="text-[#d97757]">What if</strong> you could check on your restaurant from your kid&apos;s soccer game... just by sending a text?
          </p>
          <p className="text-xl sm:text-2xl text-[#30302e] leading-relaxed">
            <strong className="text-[#d97757]">What if</strong> you knew your food cost, your labor percentage, and your bank balance before you even got to the restaurant?
          </p>
          <p className="text-xl sm:text-2xl text-[#30302e] leading-relaxed">
            <strong className="text-[#d97757]">What if</strong> someone was watching your numbers while you sleep — and texted you the second something looked off?
          </p>
          <p className="text-2xl font-bold font-serif text-[#141413] pt-4">That&apos;s Expo.</p>
        </div>
      </section>

      {/* ═══ 6. PERSONAL LETTER ═══ */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
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
            <p className="text-xl font-bold font-serif text-[#141413]">I built Expo.</p>
            <p>It&apos;s not an app. It&apos;s not a dashboard. It&apos;s not software you have to learn.</p>
            <p>It&apos;s a phone number you text. And it texts you back with real answers about your business.</p>
            <div className="bg-[#f5f4f0] rounded-lg p-4 space-y-2 text-sm">
              <p>&quot;How did we do today?&quot; → <em>You get yesterday&apos;s sales, labor, and top sellers.</em></p>
              <p>&quot;Did Lauren make the drop?&quot; → <em>You find out in 10 seconds, from your bed.</em></p>
              <p>&quot;Am I making money?&quot; → <em>You get a straight answer for the first time in months.</em></p>
            </div>
            <p>That&apos;s it. That&apos;s the whole thing. You text it like you&apos;d text your manager. Except this one actually has the numbers.</p>
            <p>If that sounds like something you&apos;ve been waiting for... keep reading.</p>
            <p className="font-medium">— Anthony</p>
          </div>
        </div>
      </section>

      {/* ═══ 7. CHECKBOX ENGAGEMENT ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6">
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
                <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition ${checks[i] ? "bg-[#d97757] border-[#d97757]" : "border-[#d4d2c9] group-hover:border-[#d97757]"}`}>
                  {checks[i] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-[#30302e] text-sm leading-relaxed">{text}</span>
              </label>
            ))}
          </div>
          {checkedCount > 0 && (
            <div className="mt-8 text-center bg-[#d97757]/10 rounded-lg p-6">
              <p className="text-lg font-bold text-[#d97757]">You checked {checkedCount} box{checkedCount > 1 ? "es" : ""}.</p>
              <p className="text-[#30302e] mt-1">Expo was built <strong>specifically</strong> for you.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 8. THE HARD WAY ═══ */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-4">Here&apos;s what &quot;staying on top of your numbers&quot; actually looks like:</h2>
          <p className="text-[#87867f] text-center mb-10">Let&apos;s be real about what it takes:</p>
          <div className="space-y-4">
            {[
              { icon: "✍️", text: "Check your POS sales report every single night before you leave" },
              { icon: "📋", text: "Collect and organize every supplier invoice from every delivery" },
              { icon: "📊", text: "Enter each invoice line item into a spreadsheet to track food cost" },
              { icon: "🏦", text: "Log into your bank app daily to check deposits and account balance" },
              { icon: "🧮", text: "Manually calculate your food cost percentage every week" },
              { icon: "📞", text: "Call your accountant quarterly for a $500 meeting to find out how you actually did" },
              { icon: "👀", text: "Verify that your closers are making deposits on time" },
              { icon: "📅", text: "Compare this week to last week, this month to last month" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-[#d4d2c9] rounded-lg p-4">
                <span className="text-xl">{item.icon}</span>
                <span className="text-[#30302e] text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl font-bold text-[#141413]">Sound exhausting?</p>
            <p className="text-[#87867f] mt-2">That&apos;s because it IS. And most owners just... <strong>don&apos;t do most of it.</strong></p>
          </div>
        </div>
      </section>

      {/* ═══ 9. THE SHORTCUT ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-2">What if there was a shortcut?</h2>
          <p className="text-[#87867f] text-center mb-12">Not a hack. An actual, legitimate shortcut that does 90% of the work for you.</p>

          <div className="space-y-10">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-bold">CONNECT <span className="text-[#87867f] font-normal text-sm">(60 seconds)</span></h3>
              <p className="text-[#30302e] text-sm max-w-md mx-auto">One tap to connect your Square POS. One tap to connect your bank. Expo pulls your sales, orders, labor, deposits, and expenses automatically. <strong>You set it up once. Expo does the rest forever.</strong></p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-bold">TEXT <span className="text-[#87867f] font-normal text-sm">(10 seconds)</span></h3>
              <p className="text-[#30302e] text-sm max-w-md mx-auto">Ask Expo anything in plain English. &quot;How did we do today?&quot; &quot;Should I cut someone?&quot; &quot;Am I making money?&quot; Text it a photo of any invoice — Expo reads every line item instantly. <strong>If you can text your spouse, you can use Expo.</strong></p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-bold">KNOW <span className="text-[#87867f] font-normal text-sm">(24/7)</span></h3>
              <p className="text-[#30302e] text-sm max-w-md mx-auto">Every morning at 7am, you wake up to a text with yesterday&apos;s numbers. Throughout the day — labor creeping up? <strong>You get a text.</strong> Food cost spiking? <strong>You get a text.</strong> Deposit missing? <strong>You get a text.</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10. TESTIMONIALS BLOCK 1 ═══ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Don&apos;t take our word for it.</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Maria G.", role: "Owner, Maria's Taqueria", loc: "Detroit, MI", quote: "I used to find out I was losing money at the end of the quarter. Now I know by 7am the next morning. Expo paid for itself in the first week." },
              { name: "James T.", role: "Owner, JT's Coney Island", loc: "Dearborn, MI", quote: "I just text it a photo of my Sysco invoice and it tracks everything. No more spreadsheets. It just knows." },
              { name: "David K.", role: "Owner, King's Pizza", loc: "Warren, MI", quote: "It texted me that my labor was at 38% on a slow Tuesday. I was overstaffed and had no idea. That one alert saved me $400." },
              { name: "Sarah M.", role: "Owner, Sarah's Diner", loc: "Southfield, MI", quote: "I texted 'am I making money?' at 11pm from my couch. For the first time in 10 years, I actually knew where I stood." },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-3">
                <p className="text-[#30302e] text-sm italic leading-relaxed">&quot;{t.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-sm text-[#141413]">{t.name}</p>
                  <p className="text-[#87867f] text-xs">{t.role} · {t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. OFFER STACK ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Here&apos;s Everything You Get With Expo</h2>
          <div className="space-y-3">
            {[
              { item: "Unlimited AI Business Conversations via SMS", value: "$297/mo" },
              { item: "Square POS Integration + Automatic Daily Sync", value: "$49/mo" },
              { item: "Bank Account Monitoring + Cash Flow Alerts", value: "$49/mo" },
              { item: "Invoice Photo Scanning + Food Cost Tracking", value: "$79/mo" },
              { item: "Daily Morning Recaps at 7am", value: "$29/mo" },
              { item: "Smart Alerts (labor, sales, deposits, price changes)", value: "$49/mo" },
            ].map((row) => (
              <div key={row.item} className="flex items-center justify-between border-b border-[#d4d2c9] pb-3">
                <span className="text-[#30302e] text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#5a9a6e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {row.item}
                </span>
                <span className="text-[#87867f] text-sm font-medium whitespace-nowrap ml-4">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center space-y-1">
            <p className="text-[#87867f] text-sm">Total Value: <s className="text-[#c0392b]">$552/month</s></p>
            <p className="text-sm text-[#87867f]"><s>$197/month</s></p>
            <p className="text-3xl font-bold text-[#141413]">You Pay: $49<span className="text-lg font-normal text-[#87867f]">/month</span></p>
          </div>
        </div>
      </section>

      {/* ═══ 12. SECOND CTA ═══ */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-6 text-center">
          <p className="text-[#30302e] mb-6">All of this for just <strong>$49/month</strong>. That&apos;s less than a single accountant visit.</p>
          <Link href="/signup" className="inline-block w-full bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg">
            Get Started — $49/month
          </Link>
          <p className="text-xs text-[#87867f] mt-3"><s>$197/month</s> → $49/month · 30-day money-back guarantee</p>
        </div>
      </section>

      {/* ═══ 13. NO CATCH ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-8">&quot;OK, so what&apos;s the catch?&quot;</h2>
          <div className="space-y-4 text-[#30302e] leading-relaxed">
            <p className="text-center text-lg font-bold">There is no catch. Seriously.</p>
            <p><strong>There&apos;s no setup fee.</strong> You connect your accounts in 5 minutes.</p>
            <p><strong>There&apos;s no annual contract.</strong> Cancel anytime with one text.</p>
            <p><strong>There&apos;s no hidden upsell.</strong> $49/month is $49/month. Period.</p>
            <p className="text-[#87867f] italic pt-4">&quot;So why is it so affordable?&quot;</p>
            <p>Fair question. Here&apos;s why:</p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><strong>The AI does the heavy lifting.</strong> I don&apos;t need a team of analysts billing you $200/hour.</li>
              <li><strong>I want to help independent restaurants survive.</strong> Chains have finance departments. You have a shoebox of invoices. That&apos;s not fair.</li>
              <li><strong>Happy owners tell other owners.</strong> My best marketing is you telling your buddy at the next restaurant over.</li>
              <li><strong>And honestly?</strong> I&apos;m tired of watching great restaurants close because the owner couldn&apos;t see the numbers in time.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ 14. TESTIMONIALS BLOCK 2 ═══ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">More owners. More results.</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Mike R.", role: "Owner, Mike's Gyro House", loc: "Hamtramck, MI", quote: "I texted Expo at 2am asking if my closer made the deposit. It confirmed a $2,910 deposit hit my Chase account at 9:47pm. I went back to sleep. That peace of mind is priceless." },
              { name: "Lisa P.", role: "Owner, Lisa's Tacos", loc: "Ferndale, MI", quote: "I took a photo of my US Foods invoice. Ten seconds later, Expo told me chicken breast went up 8% and gyro meat went up 19%. I adjusted my menu prices that day." },
              { name: "Tony V.", role: "Owner, Tony's Family Restaurant", loc: "Livonia, MI", quote: "My morning recap text is the first thing I read every day. Yesterday's sales, labor, top items — all before I finish my coffee. It's like having a CFO for $49 a month." },
              { name: "Carmen D.", role: "Owner, Carmen's Kitchen", loc: "Westland, MI", quote: "I asked 'can I afford to hire someone?' and it did the math — labor percentage, impact of a new hire, bank balance, when rent is due. No accountant has ever answered that fast." },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#d4d2c9] rounded-lg p-6 space-y-3">
                <p className="text-[#30302e] text-sm italic leading-relaxed">&quot;{t.quote}&quot;</p>
                <div>
                  <p className="font-semibold text-sm text-[#141413]">{t.name}</p>
                  <p className="text-[#87867f] text-xs">{t.role} · {t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 15. SCARCITY ═══ */}
      <section className="bg-[#141413] text-white py-16">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">This price won&apos;t last.</h2>
          <p className="text-white/70 leading-relaxed">
            I&apos;m keeping Expo at <strong className="text-white">$49/month</strong> for the first wave of restaurants. Once we hit capacity, it&apos;s going back up to $197/month.
          </p>
          <p className="text-white/70">
            <strong className="text-[#d97757]">Every day without Expo</strong> is a day your food cost could be creeping up, your labor could be running hot, or your deposits could be short — and you wouldn&apos;t know until it&apos;s too late.
          </p>
          <p className="text-white/50 text-sm pt-4">
            30 days from now, you&apos;ll either be 30 days older... <strong className="text-white">or 30 days smarter about your business.</strong>
          </p>
        </div>
      </section>

      {/* ═══ 16. GUARANTEE ═══ */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white border-2 border-[#5a9a6e]/30 rounded-xl p-8 space-y-4">
            <h2 className="text-2xl font-bold font-serif text-[#141413]">The &quot;Text Me Back&quot; Guarantee</h2>
            <p className="text-[#30302e] leading-relaxed">
              Try Expo for a full 30 days. Text it every day. Ask it anything. Send it your invoices. Get your morning recaps.
            </p>
            <p className="text-[#30302e] leading-relaxed">
              If after 30 days you don&apos;t feel like you have a significantly better grip on your restaurant&apos;s numbers — just text us &quot;cancel&quot; and I&apos;ll refund every single penny.
            </p>
            <p className="text-[#30302e] font-medium">No questions. No hassle. No hard feelings.</p>
            <p className="text-lg font-bold text-[#5a9a6e]">You literally cannot lose.</p>
          </div>
        </div>
      </section>

      {/* ═══ 17. THIRD CTA ═══ */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-6 text-center">
          <p className="text-lg text-[#30302e] mb-6">The only question left is: <strong>do you want to keep guessing, or do you want to start knowing?</strong></p>
          <Link href="/signup" className="inline-block w-full bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg">
            Get Started — $49/month
          </Link>
          <p className="text-xs text-[#87867f] mt-3"><s>$197/month</s> → $49/month · Cancel anytime</p>
        </div>
      </section>

      {/* ═══ 18. SECRETS LIST ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Here&apos;s what Expo will show you in your first week:</h2>
          <div className="space-y-4">
            {[
              "Your REAL food cost percentage — not what you think it is, what it actually is",
              "Whether your deposits match your POS sales — and what the gap means",
              "Which days you're overstaffed and which days you're understaffed",
              "Your top-selling items — and your worst performers dragging down your average ticket",
              "How much your supplier prices have changed this month (you'll be surprised)",
              "Whether your bank balance can actually cover rent + payroll next week",
              "Your actual labor percentage compared to the 30% industry target",
              "What your busiest and slowest hours really are — not what you assume",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-[#30302e] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#87867f] text-sm mt-8">Most owners have <strong>NEVER</strong> seen this data this clearly. And you&apos;ll have it all... from a text message.</p>
        </div>
      </section>

      {/* ═══ 19. FOURTH CTA ═══ */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-6 text-center">
          <p className="text-lg font-bold font-serif text-[#141413] mb-6">You&apos;re one text away from knowing your numbers.</p>
          <Link href="/signup" className="inline-block w-full bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg">
            Get Started — $49/month
          </Link>
          <p className="text-xs text-[#87867f] mt-3">Setup takes 5 minutes. First recap arrives tomorrow at 7am.</p>
        </div>
      </section>

      {/* ═══ 20. FAQ ═══ */}
      <section className="bg-white border-y border-[#d4d2c9] py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center mb-10">Questions? We&apos;ve got answers.</h2>
          <div className="space-y-6">
            {[
              { q: "What exactly is Expo?", a: "Expo is an AI business partner that connects to your Square POS and bank account, then lets you text it questions about your restaurant. Sales, food cost, labor, cash flow, invoices — all through SMS. No app, no dashboard. Just text." },
              { q: "Do I need to download anything?", a: "Nope. Expo lives in your text messages. The same place you text your family, your staff, your suppliers. There's nothing to download, install, or learn." },
              { q: "What if I'm not good with technology?", a: "Perfect — that's exactly who we built this for. If you can send a text message, you can use Expo. Seriously. Your 70-year-old mother could use it." },
              { q: "How is this different from just looking at my Square dashboard?", a: "Square shows you data. Expo thinks with you about it. Try asking your Square dashboard \"should I cut someone today?\" or \"can I afford to hire?\" It can't answer that. Expo can — because it combines your POS data with your bank account, your invoices, and your history." },
              { q: "Can Expo access my bank password or move my money?", a: "Absolutely not. Expo connects through Plaid — the same service used by Venmo, Cash App, and thousands of other apps. We can only read your transactions. We can never move money or see your password." },
              { q: "What POS systems does Expo work with?", a: "Right now, Expo works with Square. We're adding Toast, Clover, and others soon." },
              { q: "How do I cancel?", a: "Text us \"cancel\" or email support. That's it. No contracts, no cancellation fees, no guilt trip." },
            ].map((item) => (
              <div key={item.q} className="border-b border-[#d4d2c9] pb-6 last:border-0">
                <h3 className="font-semibold text-[#141413] mb-2">{item.q}</h3>
                <p className="text-[#87867f] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 21. P.S. ═══ */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-[#f5f4f0] border border-[#d4d2c9] rounded-xl p-8 space-y-4">
            <p className="text-[#30302e] leading-relaxed">
              <strong>P.S.</strong> In case you scrolled straight to the bottom (I would too), here&apos;s the deal:
            </p>
            <p className="text-[#30302e] leading-relaxed">
              Expo connects to your Square POS and bank account, then lets you manage your entire restaurant through text messages. You text it questions — &quot;how did we do today?&quot;, &quot;what&apos;s my food cost?&quot;, &quot;am I making money?&quot; — and it texts back real answers with real numbers.
            </p>
            <p className="text-[#30302e] leading-relaxed">
              You get a morning recap every day at 7am. Alerts when something needs your attention. Invoice scanning by photo. Cash flow monitoring. And a partner who never sleeps.
            </p>
            <p className="text-[#30302e] leading-relaxed">
              It&apos;s <s>$197/month</s> <strong className="text-[#d97757]">$49/month</strong> right now. Cancel anytime. 30-day money-back guarantee.
            </p>
            <p className="font-bold text-[#141413]">Every day without it is a day you&apos;re guessing instead of knowing.</p>
            <div className="text-center pt-2">
              <Link href="/signup" className="inline-block bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg">
                Get Started — $49/month
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 22. FOOTER ═══ */}
      <section className="border-t border-[#d4d2c9] py-8">
        <div className="max-w-2xl mx-auto px-6 text-center text-[#87867f] text-xs space-y-2">
          <p>© 2026 Expo by Carbonaro Media · Detroit, MI</p>
          <p>Terms of Service · Privacy Policy · Support: support@carbonaromedia.com</p>
          <p className="max-w-lg mx-auto">Results vary by restaurant. Expo provides data-driven insights based on your POS, bank, and invoice data. Individual results depend on data quality and business circumstances. Expo does not provide financial or legal advice.</p>
        </div>
      </section>
    </div>
  );
}
