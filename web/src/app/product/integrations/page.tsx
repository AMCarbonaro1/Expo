import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const liveIntegrations = [
  { name: "Square POS", desc: "Real-time access to sales, orders, item-level data, labor, timecards, and payment breakdowns. Connect in one tap.", status: "live" },
  { name: "Plaid Banking", desc: "Read-only connection to your business checking account. See balances, transactions, and deposit verification.", status: "live" },
];

const comingSoon = [
  { name: "Toast POS", category: "Point of Sale" },
  { name: "Clover POS", category: "Point of Sale" },
  { name: "Lightspeed", category: "Point of Sale" },
  { name: "TouchBistro", category: "Point of Sale" },
  { name: "Revel", category: "Point of Sale" },
  { name: "QuickBooks", category: "Accounting" },
  { name: "Xero", category: "Accounting" },
  { name: "DoorDash", category: "Delivery" },
  { name: "Uber Eats", category: "Delivery" },
  { name: "Grubhub", category: "Delivery" },
];

export default function IntegrationsPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Integrations</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Connects with tools you already use.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          Expo pulls data from your existing systems — no manual entry, no imports, no CSV files. Just connect and go.
        </p>
      </section>

      {/* Live integrations */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-2xl font-bold font-serif text-center mb-4">Live Now</h2>
            <p className="text-[#87867f] text-center mb-12">Connect in under 60 seconds each.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {liveIntegrations.map((int) => (
                <div key={int.name} className="border-2 border-[#5a9a6e]/30 rounded-xl p-6 space-y-3 bg-[#5a9a6e]/5">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#5a9a6e]" />
                    <h3 className="font-bold text-lg">{int.name}</h3>
                  </div>
                  <p className="text-[#87867f] text-sm leading-relaxed">{int.desc}</p>
                  <span className="inline-block bg-[#5a9a6e]/10 text-[#5a9a6e] text-xs font-bold px-3 py-1 rounded-full">Connected</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Coming soon */}
      <FadeIn>
        <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-2xl font-bold font-serif text-center mb-4">Coming Soon</h2>
          <p className="text-[#87867f] text-center mb-12">We&apos;re adding new integrations based on what restaurant owners ask for most.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {comingSoon.map((int) => (
              <div key={int.name} className="bg-white border border-[#d4d2c9] rounded-lg p-4 text-center opacity-60 hover:opacity-100 transition">
                <p className="font-semibold text-sm">{int.name}</p>
                <p className="text-[10px] text-[#87867f] uppercase tracking-wider mt-1">{int.category}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Request */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl font-bold font-serif mb-4">Don&apos;t see your system?</h2>
            <p className="text-[#87867f] mb-6">
              We prioritize integrations based on what owners need most. Let us know what you use and we&apos;ll move it up the list.
            </p>
            <a
              href="mailto:carbonaromedia@gmail.com?subject=Integration%20Request"
              className="inline-block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg"
            >
              Request an Integration
            </a>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-[#87867f] mb-4">Ready to connect your restaurant?</p>
        <Link href="/signup" className="inline-block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/20">
          Get Started — $49/mo
        </Link>
      </section>

      <Footer />
    </div>
  );
}
