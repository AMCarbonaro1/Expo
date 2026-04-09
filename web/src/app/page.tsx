import Link from "next/link";
import PhoneMockup from "@/components/PhoneMockup";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import TypingHero from "@/components/TypingHero";
import AccordionFAQ from "@/components/AccordionFAQ";
import { SquareLogo, PlaidLogo, TwilioLogo, ClaudeLogo } from "@/components/PartnerLogos";

export default function Home() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* ═══ 1. HERO ═══ */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <div className="inline-block bg-[#d97757]/10 text-[#d97757] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          Built for independent restaurant owners on Square
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-4">
          Your restaurant has a thousand questions.
        </h1>
        <p className="text-2xl sm:text-3xl font-serif text-[#30302e] mb-8">
          Now it has a partner who answers{" "}
          <span className="relative inline-block">
            every
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8c30-6 60-6 80-2s25 2 36-2" stroke="#d97757" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{" "}
          one of them.
        </p>

        <div className="mb-8">
          <TypingHero />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="/signup"
            className="bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/20"
          >
            Get Started — $49/mo
          </Link>
          <a
            href="#how-it-works"
            className="border border-[#d4d2c9] text-[#30302e] font-semibold px-8 py-4 rounded-lg hover:bg-white transition text-lg"
          >
            See How It Works
          </a>
        </div>

        <p className="text-sm text-[#87867f]">
          No app to download. No dashboard to learn. Just text.
        </p>
      </section>

      {/* ═══ 2. TRUST BAR — floating card ═══ */}
      <div className="relative z-10 -mt-8 mb-[-2rem] px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl border border-[#d4d2c9] py-5 px-8">
          <p className="text-center text-[10px] font-bold text-[#87867f] uppercase tracking-[0.2em] mb-3">
            Powered By Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mb-4">
            <div className="flex items-center gap-2 text-[#141413]/60">
              <SquareLogo className="h-6" />
              <span className="font-bold text-sm">Square</span>
            </div>
            <div className="flex items-center gap-2 text-[#141413]/60">
              <PlaidLogo className="h-5" />
              <span className="font-bold text-sm">Plaid</span>
            </div>
            <div className="flex items-center gap-2 text-[#141413]/60">
              <TwilioLogo className="h-6" />
              <span className="font-bold text-sm">Twilio</span>
            </div>
            <div className="flex items-center gap-2 text-[#141413]/60">
              <ClaudeLogo className="h-6" />
              <span className="font-bold text-sm">Claude AI</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#87867f] text-xs">Trusted by restaurant owners across the U.S.</span>
          </div>
        </div>
      </div>

      {/* ═══ 3. ONE-LINER ═══ */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center">
          <p className="text-xl sm:text-2xl font-serif text-[#30302e] leading-relaxed">
            Expo connects to your Square POS and your bank account. Then you just{" "}
            <span className="relative inline-block font-bold text-[#d97757]">
              text it
              <svg className="absolute -inset-2" viewBox="0 0 80 40" fill="none">
                <ellipse cx="40" cy="20" rx="38" ry="17" stroke="#d97757" strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
              </svg>
            </span>
            {" "}— from the kitchen, the floor, your kid&apos;s soccer game. Sales, staffing, deposits, invoices. Any question, any time. It&apos;s like having a partner who knows{" "}
            <strong className="text-[#d97757]">everything</strong> and never takes a day off.
          </p>
        </section>
      </FadeIn>

      {/* ═══ 4. THE PAIN ═══ */}
      <FadeIn>
        <section className="relative bg-[#0f1923] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="relative max-w-3xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-12">
              Running a restaurant without Expo looks like this:
            </h2>
            <div className="space-y-3">
              {[
                "Walking to the back office just to check one number",
                "Interrupting your cook mid-rush to ask how many you've sold",
                "Guessing whether you should send someone home",
                "Checking your bank app at midnight to see if the deposit went through",
                "Finding out about a supplier price hike weeks after it happened",
                "A shoebox of invoices you'll get to... eventually",
                "Calling your accountant for a $500 meeting to hear how you did",
              ].map((item) => (
                <div key={item} className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 flex items-center gap-4">
                  <svg className="w-5 h-5 text-[#c0392b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-white/70 text-sm line-through decoration-white/30">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xl font-bold text-[#d97757] mt-10">Sound familiar?</p>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 5. THE RELIEF + PhoneMockup ═══ */}
      <FadeIn>
        <section className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">
                With Expo, you just text.
              </h2>
              <div className="space-y-4">
                {[
                  { time: "9:47 PM", you: "Did Lauren make the drop?", expo: "Yes. $2,910 deposited to your checking. Matches yesterday's card sales exactly. Go to sleep." },
                  { time: "2:15 PM", you: "How many gyros have we sold?", expo: "43 so far today. That's your #1 seller — 12 ahead of the chicken shawarma." },
                  { time: "TUE 4:00 PM", you: "", expo: "Heads up — you've got 4 people on the floor and sales are trending 20% below last Tuesday. Consider sending your newest person home. Saves you ~$45 tonight." },
                  { time: "7:00 AM", you: "", expo: "Good morning! Yesterday: $3,210 in sales, 97 orders, avg ticket $33.09. Labor was 27.4% — nice. Top seller: Gyro Platter (38). Deposit of $2,847 posted overnight. You're up 8% vs last Monday." },
                ].map((msg) => (
                  <div key={msg.time} className="bg-white rounded-xl border border-[#d4d2c9] p-5 space-y-3">
                    <span className="text-xs font-bold text-[#d97757] uppercase tracking-wider">{msg.time}</span>
                    {msg.you && (
                      <div className="bg-[#d97757]/10 rounded-lg px-4 py-2 ml-auto max-w-[85%] w-fit">
                        <p className="text-xs text-[#87867f] mb-0.5">You</p>
                        <p className="text-sm text-[#141413]">{msg.you}</p>
                      </div>
                    )}
                    <div className="bg-[#f5f4f0] rounded-lg px-4 py-2 max-w-[90%]">
                      <p className="text-xs text-[#87867f] mb-0.5">Expo</p>
                      <p className="text-sm text-[#30302e] leading-relaxed">{msg.expo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 6. HOW IT WORKS ═══ */}
      <FadeIn>
        <section id="how-it-works" className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
            <p className="text-center text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-serif">
              Up and running in 5 minutes. Seriously.
            </h2>
            <p className="text-[#87867f] text-center mb-16 max-w-xl mx-auto">
              No app to download. No training manual. No IT department required.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-4 items-start">
              {[
                { step: "1", title: "CONNECT", time: "60 seconds", desc: "One tap to connect your Square POS. One tap to connect your bank through Plaid. That's it." },
                { step: "2", title: "TEXT", time: "10 seconds", desc: "Ask Expo anything from wherever you are. Text it a photo of any invoice. Talk to it like your smartest employee." },
                { step: "3", title: "KNOW", time: "24/7", desc: "Morning recaps at 7am. Alerts when something needs attention. A partner who watches everything so you don't have to." },
              ].map((item, i) => (
                <div key={item.step} className="text-center space-y-4 relative">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#d97757] text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#d97757]/20">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold tracking-wider">{item.title}</h3>
                  <span className="inline-block bg-[#d97757]/10 text-[#d97757] text-xs font-bold px-3 py-1 rounded-full">{item.time}</span>
                  <p className="text-[#87867f] leading-relaxed text-sm">{item.desc}</p>
                  {i < 2 && (
                    <svg className="hidden sm:block absolute top-10 -right-4 w-8 h-8 text-[#d97757]/30" viewBox="0 0 32 16" fill="none">
                      <path d="M2 8h24M22 3l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 7. FEATURES ═══ */}
      <FadeIn>
        <section id="features" className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <p className="text-center text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">What Expo Does</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-serif">
            Like texting a partner who knows everything about your business.
          </h2>

          {/* Primary features — alternating layout */}
          <div className="space-y-16 mb-16">
            {/* Morning Briefing */}
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-serif">Your Morning Briefing</h3>
                <p className="text-[#87867f] leading-relaxed">
                  Every morning at 7am, before you even get to the restaurant. Yesterday&apos;s sales, labor cost, top sellers,
                  deposits — everything you need to walk in prepared. Delivered to your texts like a message from your best manager.
                </p>
              </div>
              <div className="bg-[#0f1923] rounded-xl p-5 space-y-2">
                <p className="text-xs text-white/40 mb-3">7:00 AM — Expo</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  Good morning! Here&apos;s yesterday&apos;s recap:<br /><br />
                  Sales: $3,210 (97 orders, $33.09 avg)<br />
                  Labor: 27.4% — right on target<br />
                  Top seller: Gyro Platter (38 sold)<br />
                  Deposit: $2,847 posted<br /><br />
                  You&apos;re up 8% vs last Monday. Nice week so far.
                </p>
              </div>
            </div>

            {/* Invoice Intelligence */}
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div className="order-2 sm:order-1 bg-white rounded-xl border border-[#d4d2c9] p-5 space-y-3">
                <div className="bg-[#d97757]/10 rounded-lg px-4 py-2 ml-auto w-fit">
                  <p className="text-xs text-[#87867f] mb-0.5">You</p>
                  <p className="text-sm text-[#141413]">📸 [Sysco invoice photo]</p>
                </div>
                <div className="bg-[#f5f4f0] rounded-lg px-4 py-3">
                  <p className="text-xs text-[#87867f] mb-0.5">Expo</p>
                  <p className="text-sm text-[#30302e] leading-relaxed">
                    Got it — 23 line items, $1,847.32 total. I noticed your chicken thighs went from $2.89/lb to $3.19/lb.
                    That&apos;s a 10.4% increase since last month. Want me to log this?
                  </p>
                </div>
              </div>
              <div className="order-1 sm:order-2 space-y-4">
                <h3 className="text-2xl font-bold font-serif">Invoice Intelligence</h3>
                <p className="text-[#87867f] leading-relaxed">
                  Snap a photo of any supplier invoice and text it to Expo. It reads every line item, tracks prices over time,
                  and tells you the second something goes up. No spreadsheets. No data entry. Just a photo.
                </p>
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-serif">Smart Alerts</h3>
                <p className="text-[#87867f] leading-relaxed">
                  Expo doesn&apos;t wait for you to ask. It texts YOU when something needs attention — overstaffing,
                  missing deposits, cash flow warnings. You hear about problems before they become expensive.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "LABOR ALERT", msg: "You've got 4 servers on the floor and sales are 20% below normal. Consider sending someone home." },
                  { label: "DEPOSIT ALERT", msg: "No deposit posted for yesterday. Card sales were $2,156. Worth checking with your closer." },
                  { label: "PRICE ALERT", msg: "Your ground beef went up 14% on this week's invoice. That's $180/month at current usage." },
                ].map((alert) => (
                  <div key={alert.label} className="bg-white rounded-lg border border-[#d4d2c9] p-4">
                    <span className="text-[10px] font-bold text-[#c0392b] uppercase tracking-wider">{alert.label}</span>
                    <p className="text-sm text-[#30302e] mt-1">{alert.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary features — card grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Live Mid-Shift Answers", desc: "\"How many gyros have we sold?\" \"Who's clocked in?\" \"Are we ahead or behind today?\" Ask from the kitchen, the floor, or your car." },
              { title: "Cash Flow Advice", desc: "\"Can I afford to hire?\" \"Is rent going to be tight?\" Expo knows your balance, your bills, and when things are coming due." },
              { title: "Talk Through Anything", desc: "\"Should I send someone home?\" \"How does today compare to last week?\" Like texting your smartest employee — except this one sees everything." },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 border border-[#d4d2c9] space-y-3 hover:border-[#d97757]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-[#87867f] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ═══ 8. TESTIMONIALS ═══ */}
      <FadeIn>
        <section className="bg-[#0f1923] text-white">
          <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-serif">
              Don&apos;t take our word for it.
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { quote: "I used to find out I was losing money at the end of the quarter. Now I know by 7am the next morning.", name: "Maria G.", role: "Maria's Taqueria", location: "Mesa, AZ", impact: "Paid for itself in the first week" },
                { quote: "I just text it a photo of my Sysco invoice and it tracks everything. No more spreadsheets, no more guessing what my food cost is.", name: "James T.", role: "JT's Coney Island", location: "Boise, ID", impact: "Eliminated manual data entry" },
                { quote: "It texted me that my labor was at 38% on a slow Tuesday. I was overstaffed and had no idea.", name: "David K.", role: "King's Pizza", location: "Greenville, SC", impact: "Saved $400 that week" },
              ].map((t) => (
                <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/80 text-sm italic leading-relaxed">&quot;{t.quote}&quot;</p>
                  <p className="text-xs font-bold text-[#d97757]">{t.impact}</p>
                  <div>
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role} · {t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 9. FOUNDER'S NOTE ═══ */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
          <div className="relative bg-[#fffdf8] rounded-2xl shadow-xl border border-[#d4d2c9] p-8 sm:p-12">
            {/* Corner fold */}
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
              <p>
                I built Expo because I watched restaurant owners pour their hearts into their businesses —
                and still not know if they were making money until it was too late.
              </p>
              <p>
                The tools that exist? They were built for people who sit at desks. Not for someone who&apos;s
                elbow-deep in a fryer, managing a rush, and trying to figure out if they can afford next week&apos;s
                food order at the same time.
              </p>
              <p>
                So I built something different. Not an app. Not a dashboard. A phone number you text —
                and it texts you back with <strong className="text-[#d97757]">real answers</strong>{" "}about your business.
              </p>
              <p className="italic text-[#87867f]">
                If you can send a text, you can finally know what&apos;s happening in your restaurant.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4d2c9]">
              <p className="font-serif italic text-[#87867f]">— Anthony</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 10. BY THE NUMBERS ═══ */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: "SMS", label: "That's it — just text" },
              { num: "0", label: "Apps to download" },
              { num: "7am", label: "Your daily recap arrives" },
              { num: "24/7", label: "Your partner never sleeps" },
            ].map((stat) => (
              <div key={stat.num}>
                <div className="text-3xl sm:text-4xl font-bold text-[#d97757]">{stat.num}</div>
                <div className="text-sm text-[#87867f] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ═══ 11. PRICING ═══ */}
      <FadeIn>
        <section id="pricing" className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Simple Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
            One plan. Everything included. No surprises.
          </h2>
          <p className="text-[#87867f] mb-4">
            A good accountant costs $200/hour. Expo costs $1.63/day.
          </p>

          <div className="relative max-w-md mx-auto mt-12">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#d97757]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#d97757]/10 rounded-full blur-3xl" />
            <div className="relative bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl">
              <div>
                <span className="text-5xl font-bold">$49</span>
                <span className="text-[#87867f] text-lg">/month</span>
              </div>
              <ul className="text-left space-y-3 text-[#30302e] text-sm">
                {[
                  "Daily morning recaps via text",
                  "Unlimited questions — ask Expo anything",
                  "Connected to your POS — live, always",
                  "Bank balance and deposit verification anytime",
                  "Invoice photo scanning and tracking",
                  "Alerts before small problems become expensive",
                  "Cash flow heads-up before rent is due",
                  "Price increase alerts the moment they happen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-[#5a9a6e] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg"
              >
                Get Started
              </Link>
              <p className="text-[#87867f] text-sm">Cancel anytime. No contracts. Setup takes 5 minutes.</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 12. FAQ ═══ */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-serif">
              Questions? Answers.
            </h2>
            <AccordionFAQ items={[
              { q: "How is this different from my Square dashboard?", a: "Square shows you a dashboard. Expo has a conversation with you about it. You can ask \"Should I cut someone today?\" and get an answer based on your current pace, labor cost, and sales trends. Plus Expo connects your POS to your bank to your invoices, giving you a complete picture Square alone can't." },
              { q: "Do I need to download an app?", a: "Nope. Expo lives in your text messages — the same place you text your family, your staff, your suppliers. There's nothing to download, install, or log into." },
              { q: "What POS systems does Expo work with?", a: "Right now, Expo connects with Square. We're working on Toast, Clover, and others — if you use a different system, let us know and we'll prioritize it." },
              { q: "Can Expo see my bank password or move my money?", a: "Absolutely not. Expo connects through Plaid, the same service used by Venmo and thousands of other apps. We can only read your transactions and balance." },
              { q: "How does the invoice scanning work?", a: "Just take a photo of any supplier invoice with your phone and text it to Expo. Our AI reads every line item, price, and quantity — then confirms with you before logging it." },
              { q: "I'm not great with technology. Can I still use this?", a: "That's exactly who we built Expo for. If you can send a text message, you can use Expo. No dashboards, no reports, no software to learn." },
              { q: "Can I cancel anytime?", a: "Of course. No contracts, no commitments, no cancellation fees. If Expo isn't helping your business, you can cancel anytime." },
            ]} />
          </div>
        </section>
      </FadeIn>

      {/* ═══ 13. GUARANTEE ═══ */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white border-2 border-[#5a9a6e] rounded-xl p-8 text-center space-y-4 shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#5a9a6e]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#141413]">The &quot;Text Me Back&quot; Guarantee</h2>
            <p className="text-[#30302e] leading-relaxed">
              Try Expo for 30 days. If you don&apos;t have a better grip on your numbers — just text &quot;Contact Support&quot; and we&apos;ll take care of you personally.
            </p>
            <p className="text-lg font-bold text-[#5a9a6e]">You literally cannot lose.</p>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 14. FOOTER CTA + FOOTER ═══ */}
      <section className="bg-[#0f1923] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">
            Your restaurant deserves
            <br />
            a partner who never sleeps.
          </h2>
          <p className="text-white/50 text-lg">
            Set up in 5 minutes. First recap arrives tomorrow at 7am.
          </p>
          <div className="pt-4">
            <Link
              href="/signup"
              className="inline-block bg-[#d97757] text-white font-semibold px-10 py-5 rounded-lg hover:bg-[#c4654a] transition text-xl shadow-lg shadow-[#d97757]/30"
            >
              Get Started — $49/month
            </Link>
          </div>
        </div>

        <Footer variant="dark" />
      </section>
    </div>
  );
}
