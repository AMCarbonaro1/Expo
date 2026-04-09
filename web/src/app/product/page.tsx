import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import PhoneMockup from "@/components/PhoneMockup";

export default function ProductPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Product</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Meet Expo — your restaurant&apos;s AI business partner.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto mb-8">
          Expo connects to your Square POS and bank account, then lets you text it about anything.
          Sales, staffing, deposits, invoices — any question, any time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/20">
            Get Started — $49/mo
          </Link>
          <Link href="/get-started" className="border border-[#d4d2c9] text-[#30302e] font-semibold px-8 py-4 rounded-lg hover:bg-white transition text-lg">
            See the Full Demo
          </Link>
        </div>
      </section>

      {/* How data flows */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-4">How it all connects</h2>
            <p className="text-[#87867f] mb-16 max-w-xl mx-auto">Your POS, your bank, and your invoices — all flowing into one conversation on your phone.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {[
                { icon: "square", label: "Square POS", sub: "Sales, orders, labor" },
                { icon: "bank", label: "Your Bank", sub: "Balances, deposits" },
                { icon: "camera", label: "Invoice Photos", sub: "Prices, line items" },
              ].map((src, i) => (
                <div key={src.label} className="flex items-center gap-4 sm:gap-6">
                  <div className="bg-[#f5f4f0] rounded-xl p-5 text-center w-36">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#d97757]/10 flex items-center justify-center mb-2">
                      {src.icon === "square" && <svg className="w-5 h-5 text-[#d97757]" fill="currentColor" viewBox="0 0 24 24"><path d="M4.01 0A4.01 4.01 0 000 4.01v15.98A4.01 4.01 0 004.01 24h15.98A4.01 4.01 0 0024 19.99V4.01A4.01 4.01 0 0019.99 0H4.01zm2.04 6.05h11.9c.56 0 1.01.45 1.01 1.01v9.88c0 .56-.45 1.01-1.01 1.01H6.05c-.56 0-1.01-.45-1.01-1.01V7.06c0-.56.45-1.01 1.01-1.01z"/></svg>}
                      {src.icon === "bank" && <svg className="w-5 h-5 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9-4 9 4M3 6v14l9 4 9-4V6M3 6l9 4 9-4M12 10v10" /></svg>}
                      {src.icon === "camera" && <svg className="w-5 h-5 text-[#d97757]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    </div>
                    <p className="font-semibold text-sm">{src.label}</p>
                    <p className="text-xs text-[#87867f]">{src.sub}</p>
                  </div>
                  {i < 2 && (
                    <svg className="w-6 h-6 text-[#d97757]/40 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
              <svg className="w-6 h-6 text-[#d97757]/40 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="bg-[#d97757] rounded-xl p-5 text-center w-36 text-white shadow-lg shadow-[#d97757]/20">
                <div className="w-10 h-10 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <p className="font-semibold text-sm">Your Phone</p>
                <p className="text-xs text-white/70">Just text</p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 6 Capabilities */}
      <FadeIn>
        <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-16">Everything you can do with Expo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Ask anything mid-shift", desc: "\"How many gyros have we sold?\" \"Who's clocked in?\" \"Are we ahead or behind today?\" Get answers in seconds without leaving the floor.", emoji: "💬" },
              { title: "Morning recaps at 7am", desc: "Yesterday's sales, labor %, top sellers, deposits — delivered to your texts before you even get to the restaurant.", emoji: "☀️" },
              { title: "Smart alerts", desc: "Expo texts YOU when something needs attention. Overstaffing, missing deposits, cash flow warnings — before they become expensive.", emoji: "🔔" },
              { title: "Invoice scanning", desc: "Snap a photo of any supplier invoice. Expo reads every line item, tracks prices over time, and catches increases.", emoji: "📸" },
              { title: "Deposit verification", desc: "\"Did the deposit go through?\" Expo checks your bank and matches it to yesterday's card sales. No more wondering at midnight.", emoji: "🏦" },
              { title: "Talk through decisions", desc: "\"Should I send someone home?\" \"Can I afford to hire?\" Expo knows your numbers and gives you real advice.", emoji: "🤝" },
            ].map((cap) => (
              <div key={cap.title} className="bg-white rounded-lg p-6 border border-[#d4d2c9] space-y-3 hover:border-[#d97757]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <span className="text-2xl">{cap.emoji}</span>
                <h3 className="font-semibold text-lg">{cap.title}</h3>
                <p className="text-[#87867f] text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* See it in action */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold font-serif">See it in action</h2>
                <p className="text-[#87867f] leading-relaxed">
                  This is what a conversation with Expo actually looks like. No app. No dashboard. Just your
                  regular text messages — the same place you text your family and your staff.
                </p>
                <p className="text-[#87867f] leading-relaxed">
                  Ask about sales, check on a deposit, get a morning recap, send an invoice photo — it all
                  happens right here.
                </p>
                <Link href="/get-started" className="inline-block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/20">
                  See the Full Story
                </Link>
              </div>
              <div className="flex justify-center">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Explore more */}
      <FadeIn>
        <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-12">Go deeper</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { href: "/product/technology", title: "Technology", desc: "See the tools and infrastructure powering Expo." },
              { href: "/product/security", title: "Security", desc: "How we protect your data and your customers' data." },
              { href: "/product/integrations", title: "Integrations", desc: "What connects today and what's coming next." },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="bg-white rounded-lg p-6 border border-[#d4d2c9] hover:border-[#d97757]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-2">
                <h3 className="font-semibold text-lg text-[#d97757]">{card.title} &rarr;</h3>
                <p className="text-[#87867f] text-sm">{card.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
