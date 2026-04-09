import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const securityFeatures = [
  { title: "TLS/HTTPS Encryption", desc: "All data transmitted between your phone, our servers, and third-party services is encrypted in transit using industry-standard TLS." },
  { title: "Bcrypt Password Hashing", desc: "Your password is never stored in plain text. We use bcrypt hashing — the same standard used by major banks and financial institutions." },
  { title: "Plaid Read-Only Access", desc: "We connect to your bank through Plaid (used by Venmo, Coinbase, and thousands of apps). Expo can only READ your transactions and balance. We cannot move, transfer, or withdraw money." },
  { title: "Signed OAuth States", desc: "When you connect Square or other services, the authorization flow uses HMAC-SHA256 signed states with 1-hour expiry to prevent tampering." },
  { title: "Rate Limiting", desc: "Our API enforces rate limits on login attempts, signups, and all endpoints to prevent brute-force attacks and abuse." },
  { title: "Twilio Signature Verification", desc: "Every incoming SMS is verified with Twilio's HMAC-SHA1 signature to ensure it actually came from Twilio — not a spoofed request." },
  { title: "Stripe PCI Compliance", desc: "All payment processing is handled by Stripe, which is PCI Level 1 certified. We never see, store, or handle your credit card number." },
  { title: "Row Level Security", desc: "Our database uses Row Level Security (RLS) on every table. Your data is isolated at the database level — no other restaurant can access it." },
];

export default function SecurityPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#5a9a6e]/10 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-[#5a9a6e] uppercase tracking-wider mb-4">Security</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Your data is safe with Expo.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          We take security seriously. Here&apos;s exactly how we protect your business data,
          your customers&apos; information, and your peace of mind.
        </p>
      </section>

      {/* Security features grid */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
            <div className="grid sm:grid-cols-2 gap-6">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4 p-5 rounded-lg border border-[#d4d2c9]">
                  <div className="w-8 h-8 rounded-full bg-[#5a9a6e]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#5a9a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-[#87867f] text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* What we CAN'T do */}
      <FadeIn>
        <section className="relative bg-[#0f1923] text-white">
          <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-12">
              What Expo <span className="text-[#c0392b]">can&apos;t</span> do
            </h2>
            <p className="text-white/60 text-center mb-10 max-w-xl mx-auto">
              These aren&apos;t limitations — they&apos;re protections. We intentionally restrict what Expo can access to keep your data safe.
            </p>
            <div className="space-y-3">
              {[
                "Move, transfer, or withdraw money from your bank account",
                "See your bank login password or credentials",
                "Access another restaurant's data — ever",
                "Share your data with advertisers or marketing companies",
                "Store your credit card number (Stripe handles that)",
                "Read or store your Square login credentials",
              ].map((item) => (
                <div key={item} className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 flex items-center gap-4">
                  <svg className="w-5 h-5 text-[#c0392b] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Privacy link */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-[#87867f] mb-4">
            For full details on what data we collect and how we use it, read our Privacy Policy.
          </p>
          <Link href="/privacy" className="text-[#d97757] font-semibold hover:underline">
            Read our Privacy Policy &rarr;
          </Link>
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
