import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const techStack = [
  { name: "Square API", category: "Point of Sale", desc: "Real-time access to your sales data, orders, item-level details, labor, timecards, and payment breakdowns. Expo queries Square live so your answers are always current.", color: "#141413" },
  { name: "Plaid", category: "Banking", desc: "Read-only connection to your business checking account. Expo sees balances, transactions, and deposits — but can never move, transfer, or withdraw your money.", color: "#141413" },
  { name: "Claude AI by Anthropic", category: "Intelligence", desc: "The AI brain behind every conversation. Claude analyzes your POS data, bank activity, and invoice history to give you real, personalized business answers — not generic advice.", color: "#d97757" },
  { name: "Twilio", category: "SMS Delivery", desc: "Industry-leading SMS infrastructure that delivers your messages reliably. Every text you send and receive goes through Twilio's carrier-grade network.", color: "#c0392b" },
  { name: "Stripe", category: "Billing", desc: "Secure subscription billing. Your payment information is handled entirely by Stripe — we never see or store your credit card number.", color: "#635bff" },
  { name: "Google Cloud Vision", category: "Invoice OCR", desc: "When you text a photo of an invoice, Google's AI reads every line item, price, and quantity. Expo then tracks it all and alerts you to price changes.", color: "#4285f4" },
  { name: "Amazon Web Services", category: "Infrastructure", desc: "Our servers and invoice image storage run on AWS — the same cloud infrastructure used by Netflix, Airbnb, and thousands of enterprise applications.", color: "#ff9900" },
];

export default function TechnologyPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Technology</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Built on the best tools in the business.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          Expo brings together seven industry-leading technologies into one simple text conversation.
          Here&apos;s what&apos;s under the hood.
        </p>
      </section>

      {/* Tech stack grid */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
            <div className="grid sm:grid-cols-2 gap-6">
              {techStack.map((tech) => (
                <div key={tech.name} className="border border-[#d4d2c9] rounded-lg p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }} />
                    <div>
                      <h3 className="font-semibold text-lg">{tech.name}</h3>
                      <p className="text-xs text-[#87867f] uppercase tracking-wider">{tech.category}</p>
                    </div>
                  </div>
                  <p className="text-[#87867f] text-sm leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* How it connects */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">How it all works together</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            {[
              { step: "1", text: "You connect Square and your bank (takes 60 seconds each)" },
              { step: "2", text: "Expo pulls your sales, orders, labor, deposits, and transaction data" },
              { step: "3", text: "When you text a question, Claude AI analyzes everything in context and responds" },
              { step: "4", text: "When you text an invoice photo, Google Vision reads it and Expo tracks every line item" },
              { step: "5", text: "Every morning, Expo generates a recap from the latest data and texts it to you" },
              { step: "6", text: "Throughout the day, Expo watches for anomalies and alerts you before problems grow" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white rounded-lg border border-[#d4d2c9] p-4">
                <span className="w-8 h-8 rounded-full bg-[#d97757] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <p className="text-[#30302e] text-sm leading-relaxed pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Security callout */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <div className="bg-[#5a9a6e]/5 border border-[#5a9a6e]/20 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#5a9a6e]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-serif">Security is built in, not bolted on.</h3>
              <p className="text-[#87867f] text-sm leading-relaxed">
                Every connection is encrypted. Every token is secured. Every request is authenticated.
              </p>
              <Link href="/product/security" className="inline-block text-[#5a9a6e] font-semibold text-sm hover:underline">
                Read about our security practices &rarr;
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
