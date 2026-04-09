import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">About</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Built in Detroit for restaurant owners everywhere.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          Expo exists because independent restaurant owners deserve the same business insights that big chains have —
          without the big chain budget or the big chain software.
        </p>
      </section>

      {/* Founder story */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#d97757] flex items-center justify-center text-white font-bold text-2xl">A</div>
              <div>
                <p className="font-bold text-xl">Anthony Carbonaro</p>
                <p className="text-[#87867f]">Founder &amp; CEO, Carbonaro Media LLC</p>
              </div>
            </div>

            <div className="space-y-5 text-[#30302e] leading-relaxed">
              <p className="text-lg font-serif">
                I grew up around restaurants. I watched owners work 80-hour weeks, pour everything into their businesses,
                and still not know if they were making money until their accountant told them — weeks or months later.
              </p>
              <p>
                The tools that existed were built for people who sit at desks. Dashboards, spreadsheets, reports you
                need a degree to understand. Not for someone who&apos;s on the line at 7pm, managing a rush, and trying
                to figure out if they can afford next week&apos;s food order.
              </p>
              <p>
                I kept thinking: what if there was a way to just ask? What if you could text a number and say
                &quot;how are we doing today?&quot; and actually get an answer? Not a chart. Not a PDF. An actual answer
                in plain English — like asking your best employee, except this one sees everything.
              </p>
              <p>
                That&apos;s Expo. It connects to your Square POS and your bank account, and then you just text it.
                From the kitchen, the floor, your kid&apos;s soccer game. Sales, staffing, deposits, invoices —
                any question, any time.
              </p>
              <p className="text-lg font-serif italic text-[#87867f]">
                Every independent restaurant deserves a business partner. Now they have one.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Mission */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-8">Our mission</h2>
          <p className="text-2xl font-serif text-[#30302e] leading-relaxed">
            Give every independent restaurant owner the same real-time business intelligence
            that billion-dollar chains have — through the simplest interface possible: a text message.
          </p>
        </section>
      </FadeIn>

      {/* Values */}
      <FadeIn>
        <section className="bg-white border-y border-[#d4d2c9]">
          <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-16">What we believe</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Simplicity wins", desc: "If you need a training manual to use our product, we failed. Expo works through text messages because that's what restaurant owners already know." },
                { title: "Owner-first, always", desc: "We build for the person on the floor — not the person at the desk. Every feature, every decision starts with: does this help the owner?" },
                { title: "Transparency over everything", desc: "We tell you exactly what data we collect, how we use it, and what we can't do. No fine print, no gotchas." },
                { title: "No BS pricing", desc: "One plan, one price, everything included, cancel anytime. We earn your business every single month." },
              ].map((val) => (
                <div key={val.title} className="border border-[#d4d2c9] rounded-lg p-6 space-y-3">
                  <h3 className="font-bold text-lg">{val.title}</h3>
                  <p className="text-[#87867f] text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Location */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <h2 className="text-2xl font-bold font-serif mb-4">Based in Detroit, Michigan</h2>
          <p className="text-[#87867f] leading-relaxed max-w-xl mx-auto mb-8">
            Carbonaro Media LLC is proudly based in Detroit — a city that knows a thing or two about
            grit, hard work, and building something from nothing.
          </p>
          <a href="mailto:carbonaromedia@gmail.com" className="text-[#d97757] font-semibold hover:underline">
            carbonaromedia@gmail.com
          </a>
        </section>
      </FadeIn>

      {/* CTA */}
      <section className="bg-[#0f1923] text-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
          <h2 className="text-2xl font-bold font-serif">Ready to meet your new business partner?</h2>
          <Link href="/signup" className="inline-block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg shadow-lg shadow-[#d97757]/30">
            Get Started — $49/mo
          </Link>
        </div>
        <Footer variant="dark" />
      </section>
    </div>
  );
}
