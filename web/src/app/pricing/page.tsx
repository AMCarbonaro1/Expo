import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import AccordionFAQ from "@/components/AccordionFAQ";

export default function PricingPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Pricing</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Simple pricing for restaurants that want answers.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          One plan. Everything included. No tiers, no add-ons, no surprises.
        </p>
      </section>

      {/* Pricing card */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
          <div className="relative max-w-md mx-auto">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#d97757]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#d97757]/10 rounded-full blur-3xl" />
            <div className="relative bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl">
              <div>
                <span className="text-5xl font-bold">$49</span>
                <span className="text-[#87867f] text-lg">/month</span>
              </div>
              <p className="text-[#87867f] text-sm">Less than $2/day. Less than one wasted shift.</p>
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
              <Link href="/signup" className="block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg">
                Get Started
              </Link>
              <p className="text-[#87867f] text-sm">Cancel anytime. No contracts. Setup takes 5 minutes.</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Comparison table */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-4">Expo vs. the alternatives</h2>
            <p className="text-[#87867f] text-center mb-12">How does $49/month compare to other ways of getting answers about your restaurant?</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#d4d2c9]">
                    <th className="text-left py-4 px-4 text-[#87867f] font-medium"></th>
                    <th className="text-center py-4 px-4 text-[#d97757] font-bold">Expo</th>
                    <th className="text-center py-4 px-4 text-[#87867f] font-medium">Accountant</th>
                    <th className="text-center py-4 px-4 text-[#87867f] font-medium">Consultant</th>
                    <th className="text-center py-4 px-4 text-[#87867f] font-medium">Doing Nothing</th>
                  </tr>
                </thead>
                <tbody className="text-[#30302e]">
                  {[
                    { label: "Monthly cost", expo: "$49", acct: "$200-500/hr", consult: "$2,000+/mo", nothing: "$0" },
                    { label: "Available 24/7", expo: "check", acct: "no", consult: "no", nothing: "no" },
                    { label: "Real-time POS data", expo: "check", acct: "no", consult: "no", nothing: "no" },
                    { label: "Answers in seconds", expo: "check", acct: "no", consult: "no", nothing: "no" },
                    { label: "Invoice tracking", expo: "check", acct: "Sometimes", consult: "no", nothing: "no" },
                    { label: "Deposit verification", expo: "check", acct: "Monthly", consult: "no", nothing: "no" },
                    { label: "Proactive alerts", expo: "check", acct: "no", consult: "Sometimes", nothing: "no" },
                    { label: "No appointments needed", expo: "check", acct: "no", consult: "no", nothing: "check" },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-[#d4d2c9]">
                      <td className="py-3 px-4 font-medium">{row.label}</td>
                      {[row.expo, row.acct, row.consult, row.nothing].map((val, i) => (
                        <td key={i} className={`py-3 px-4 text-center ${i === 0 ? "bg-[#d97757]/5 font-semibold" : ""}`}>
                          {val === "check" ? (
                            <svg className={`w-5 h-5 mx-auto ${i === 0 ? "text-[#5a9a6e]" : "text-[#87867f]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : val === "no" ? (
                            <svg className="w-5 h-5 mx-auto text-[#d4d2c9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <span className={i === 0 ? "text-[#d97757]" : "text-[#87867f]"}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* FAQ */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-serif">Pricing FAQ</h2>
          <AccordionFAQ items={[
            { q: "Is there a free trial?", a: "We offer a 30-day money-back guarantee instead. Sign up, connect your accounts, and use Expo for a full month. If you don't see the value, text \"Contact Support\" and we'll refund every penny." },
            { q: "Are there any hidden fees?", a: "None. $49/month is $49/month. No setup fees, no per-message charges, no add-ons. Standard carrier messaging rates from your phone plan may apply, but that's between you and your carrier." },
            { q: "Can I cancel anytime?", a: "Yes. No contracts, no commitments, no cancellation fees. Cancel from your dashboard or text \"Contact Support\" and we'll handle it." },
            { q: "What payment methods do you accept?", a: "All major credit and debit cards through Stripe. We never see or store your card information." },
            { q: "Will the price go up?", a: "The $49/month price is locked in for early customers. If we raise prices later, existing customers keep their current rate." },
          ]} />
        </section>
      </FadeIn>

      {/* Guarantee */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="bg-white border-2 border-[#5a9a6e] rounded-xl p-8 text-center space-y-4 shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#5a9a6e]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-serif">The &quot;Text Me Back&quot; Guarantee</h2>
            <p className="text-[#30302e] leading-relaxed">
              Try Expo for 30 days. If you don&apos;t have a better grip on your numbers — just text &quot;Contact Support&quot; and we&apos;ll take care of you personally.
            </p>
            <p className="text-lg font-bold text-[#5a9a6e]">You literally cannot lose.</p>
          </div>
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
