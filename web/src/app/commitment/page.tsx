import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const commitments = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Transparency",
    statement: "We'll always tell you exactly what we do with your data.",
    desc: "Our Privacy Policy is written in plain English. We list every third-party service we use, every type of data we collect, and exactly how we use it. If you have questions, we answer them personally.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Simplicity",
    statement: "If you need a training manual, we failed.",
    desc: "Expo works through text messages because that's what you already know. No app to download, no dashboard to learn, no login to remember. If you can text, you can use Expo.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Owner-First",
    statement: "We build for the person on the floor, not the person at the desk.",
    desc: "Every feature starts with one question: does this help the restaurant owner who's mid-rush, managing a team, and trying to run a business at the same time? If the answer is no, we don't build it.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Honest Pricing",
    statement: "One price, everything included, cancel anytime.",
    desc: "No tiers. No add-ons. No per-message charges. No annual contracts. No cancellation fees. $49/month for everything. We earn your business every single month.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Security",
    statement: "Your data is yours. Period.",
    desc: "We don't sell your data. We don't share it with advertisers. We can't access your bank login or move your money. Every connection is encrypted, every token is secured, and your restaurant's data is isolated from everyone else's.",
    link: { href: "/product/security", label: "See our full security practices" },
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    title: "No Lock-In",
    statement: "We earn your business every month.",
    desc: "If Expo stops being valuable, you should leave. No guilt trip, no exit interview, no hoops to jump through. Text \"Contact Support\" and we'll handle your cancellation personally — and we'll refund you if you're in your first 30 days.",
  },
];

export default function CommitmentPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Our Commitment</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          What we believe in.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          These aren&apos;t marketing slogans. They&apos;re the principles we use to make every decision —
          from what features we build to how we handle your data.
        </p>
      </section>

      {/* Commitments */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 pb-20 sm:pb-28">
          <div className="space-y-6">
            {commitments.map((c) => (
              <div key={c.title} className="bg-white rounded-xl border border-[#d4d2c9] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">{c.title}</h2>
                    <p className="text-[#d97757] font-serif italic">&quot;{c.statement}&quot;</p>
                  </div>
                </div>
                <p className="text-[#87867f] leading-relaxed">{c.desc}</p>
                {c.link && (
                  <Link href={c.link.href} className="text-[#d97757] text-sm font-semibold hover:underline">
                    {c.link.label} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Closing */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <p className="text-2xl font-serif text-[#30302e] leading-relaxed">
              We&apos;re building Expo for the long haul. Not for a quick exit.
              Not for venture capital milestones. For restaurant owners who need a partner they can trust.
            </p>
            <p className="text-[#87867f] mt-6">— Anthony Carbonaro, Founder</p>
          </div>
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
