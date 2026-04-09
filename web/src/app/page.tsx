import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import TypingHero from "@/components/TypingHero";
import { SquareLogo, PlaidLogo, TwilioLogo, ClaudeLogo } from "@/components/PartnerLogos";
import { articles } from "./blog/articles";

export default function Home() {
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* ═══ 1. HERO — Full-width video background + TypingHero ═══ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video background placeholder — dark navy until video URL is added */}
        <div className="absolute inset-0 bg-[#0f1923]">
          {/* Replace this div with <video> when ready:
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video> */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6 py-24 sm:py-32 max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-white/10">
            Built for independent restaurant owners on Square
          </div>

          <div className="mb-6">
            <TypingHero />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight mb-8">
            Your restaurant&apos;s AI business partner.
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/30"
            >
              Meet Expo
            </Link>
            <a
              href="#explore"
              className="border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition text-lg"
            >
              Explore
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHAT IS EXPO ═══ */}
      <FadeIn>
        <section id="explore" className="max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center">
          <p className="text-2xl sm:text-3xl font-serif text-[#30302e] leading-relaxed max-w-3xl mx-auto">
            Expo connects to your Square POS and your bank account — then you just{" "}
            <strong className="text-[#d97757]">text it</strong>. From the kitchen, the floor, your kid&apos;s soccer game. Sales, staffing, deposits, invoices.
            Any question, any time. No app. No dashboard. Just a conversation about your business.
          </p>
          <div className="mt-8">
            <Link href="/product" className="text-[#d97757] font-semibold hover:underline">
              See how it works &rarr;
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 3. PRODUCT SHOWCASE ═══ */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-6">
                <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider">Product</p>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif">One text. Real answers.</h2>
                <div className="space-y-4 text-[#30302e]">
                  {[
                    "Ask about sales, staffing, or deposits from wherever you are",
                    "Get a morning recap at 7am before you even arrive",
                    "Snap a photo of any invoice — Expo reads every line",
                    "Receive alerts when something needs your attention",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#d97757] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/product" className="inline-block text-[#d97757] font-semibold hover:underline">
                  Explore the product &rarr;
                </Link>
              </div>

              {/* SMS conversation mock */}
              <div className="space-y-3">
                {[
                  { from: "you", text: "How are we doing today?" },
                  { from: "expo", text: "Great question. So far today: $1,847 in sales across 62 orders. Average ticket $29.79. You're up 14% vs last Wednesday. Labor is at 26% — right on target. Top seller: Gyro Platter with 31 sold." },
                  { from: "you", text: "Who's clocked in?" },
                  { from: "expo", text: "Sarah (since 10am), Mike (since 11am), Jose (since 11:30am), and Lauren (since 4pm). Four on the floor." },
                ].map((msg, i) => (
                  <div key={i} className={`max-w-[85%] px-4 py-3 rounded-xl text-sm ${
                    msg.from === "you"
                      ? "bg-[#d97757]/10 text-[#141413] ml-auto"
                      : "bg-[#f5f4f0] text-[#30302e] border border-[#d4d2c9]"
                  }`}>
                    <p className="text-[10px] text-[#87867f] mb-1 font-medium uppercase tracking-wider">
                      {msg.from === "you" ? "You" : "Expo"}
                    </p>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 4. FROM THE BLOG ═══ */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-2">Blog</p>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">From the blog</h2>
            </div>
            <Link href="/blog" className="text-[#d97757] font-semibold hover:underline hidden sm:block">
              View all articles &rarr;
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-lg border border-[#d4d2c9] overflow-hidden hover:border-[#d97757]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#d97757] uppercase tracking-wider bg-[#d97757]/10 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-[#87867f]">{article.readTime} read</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 flex-1">{article.title}</h3>
                  <p className="text-[#87867f] text-sm leading-relaxed">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="text-[#d97757] font-semibold hover:underline">
              View all articles &rarr;
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 5. OUR TECHNOLOGY ═══ */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28 text-center">
            <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-2">Technology</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-12">Powered by industry leaders</h2>
            <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 mb-10">
              <div className="flex items-center gap-3 text-[#141413]/70">
                <SquareLogo className="h-8" />
                <span className="text-lg font-bold">Square</span>
              </div>
              <div className="flex items-center gap-3 text-[#141413]/70">
                <PlaidLogo className="h-7" />
                <span className="text-lg font-bold">Plaid</span>
              </div>
              <div className="flex items-center gap-3 text-[#141413]/70">
                <ClaudeLogo className="h-8" />
                <span className="text-lg font-bold">Claude AI</span>
              </div>
              <div className="flex items-center gap-3 text-[#141413]/70">
                <TwilioLogo className="h-8" />
                <span className="text-lg font-bold">Twilio</span>
              </div>
            </div>
            <Link href="/product/technology" className="text-[#d97757] font-semibold hover:underline">
              See our full tech stack &rarr;
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 6. ABOUT + COMMITMENT ═══ */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Founder mini-card */}
            <div className="bg-white rounded-xl border border-[#d4d2c9] p-8 space-y-4">
              <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider">About</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#d97757] flex items-center justify-center text-white font-bold text-xl">A</div>
                <div>
                  <p className="font-bold text-lg">Anthony Carbonaro</p>
                  <p className="text-[#87867f] text-sm">Founder, Expo</p>
                </div>
              </div>
              <p className="text-[#30302e] leading-relaxed italic font-serif">
                &quot;I built Expo because I watched restaurant owners pour their hearts into their businesses —
                and still not know if they were making money until it was too late.&quot;
              </p>
              <Link href="/about" className="inline-block text-[#d97757] font-semibold hover:underline text-sm">
                Read the full story &rarr;
              </Link>
            </div>

            {/* Commitment highlights */}
            <div className="bg-white rounded-xl border border-[#d4d2c9] p-8 space-y-5">
              <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider">Our Commitment</p>
              {[
                { icon: "eye", title: "Transparency", statement: "We tell you exactly what we do with your data." },
                { icon: "bolt", title: "Simplicity", statement: "If you need a training manual, we failed." },
                { icon: "user", title: "Owner-First", statement: "Built for the floor, not the desk." },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center flex-shrink-0">
                    {c.icon === "eye" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    {c.icon === "bolt" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    {c.icon === "user" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                  </div>
                  <div>
                    <p className="font-bold">{c.title}</p>
                    <p className="text-[#87867f] text-sm">{c.statement}</p>
                  </div>
                </div>
              ))}
              <Link href="/commitment" className="inline-block text-[#d97757] font-semibold hover:underline text-sm">
                See our full commitment &rarr;
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 7. LEARNING CENTER ═══ */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
            <div className="text-center mb-12">
              <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-2">Learning Center</p>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">Get the most out of Expo</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Getting Started", icon: "🚀" },
                { label: "Asking Questions", icon: "💬" },
                { label: "Morning Recaps", icon: "☀️" },
                { label: "Invoice Scanning", icon: "📸" },
                { label: "Smart Alerts", icon: "🔔" },
                { label: "Settings", icon: "⚙️" },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href="/learning"
                  className="bg-[#f5f4f0] border border-[#d4d2c9] rounded-lg p-4 text-center hover:border-[#d97757]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.label}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/learning" className="text-[#d97757] font-semibold hover:underline">
                Visit the Learning Center &rarr;
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ═══ 8. FOOTER ═══ */}
      <section className="bg-[#0f1923]">
        <Footer variant="dark" />
      </section>
    </div>
  );
}
