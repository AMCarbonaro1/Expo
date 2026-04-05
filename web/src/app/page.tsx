import Link from "next/link";
import PhoneMockup from "@/components/PhoneMockup";

export default function Home() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">EXPO</span>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-[#87867f] hover:text-[#141413] transition hidden sm:block">How It Works</a>
          <a href="#features" className="text-sm text-[#87867f] hover:text-[#141413] transition hidden sm:block">Features</a>
          <a href="#pricing" className="text-sm text-[#87867f] hover:text-[#141413] transition hidden sm:block">Pricing</a>
          <Link href="/login" className="text-sm text-[#87867f] hover:text-[#141413] transition">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#d97757] text-white font-medium px-5 py-2.5 rounded hover:bg-[#c4654a] transition text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-block bg-[#d97757]/10 text-[#d97757] text-sm font-medium px-4 py-1.5 rounded-full">
            Built for independent restaurant owners
          </div>
          <h1 className="font-bold tracking-tight font-serif">
            <span className="block text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#141413]">
              What if your restaurant had a brain —
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-7xl leading-tight mt-2 text-[#d97757]">
              and you could text it?
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#30302e] max-w-lg mx-auto lg:mx-0">
            Your personal AI business phone number you can text about
            anything — sales, costs, staffing, cash flow, invoices. It
            connects to your POS and bank, then talks to you like a partner
            who knows every detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              href="/signup"
              className="bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg"
            >
              Get Started
            </Link>
            <a
              href="#how-it-works"
              className="border border-[#d4d2c9] text-[#30302e] font-semibold px-8 py-4 rounded-lg hover:bg-white transition text-lg"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm text-[#87867f]">
            No app to download. No dashboard to learn. If you can text, you can use Expo.
          </p>
        </div>
        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#d4d2c9]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-[#d97757]">10 sec</div>
            <div className="text-sm text-[#87867f] mt-1">to get any answer</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#d97757]">7am</div>
            <div className="text-sm text-[#87867f] mt-1">recap waiting for you</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#d97757]">3</div>
            <div className="text-sm text-[#87867f] mt-1">sources, one conversation</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#d97757]">$0</div>
            <div className="text-sm text-[#87867f] mt-1">apps to install</div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-sm font-medium text-[#87867f] uppercase tracking-wider mb-8">
          Connects with tools you already use
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
          {["Square", "Plaid", "Twilio", "Claude AI"].map((name) => (
            <span key={name} className="text-xl font-semibold text-[#87867f]">{name}</span>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="border-y border-[#d4d2c9]">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-serif">
            There&apos;s an easier way to run your restaurant
          </h2>
          <p className="text-[#87867f] text-center mb-16 max-w-2xl mx-auto">
            You didn&apos;t get into this business to stare at spreadsheets.
            Expo lets you talk through your business the way you&apos;d talk to a trusted partner.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-[#d4d2c9] space-y-5">
              <div className="text-sm font-bold text-[#c0392b] uppercase tracking-wider">How it usually goes</div>
              <ul className="space-y-4 text-[#30302e]">
                {[
                  "Quick glance at the POS before you lock up",
                  "Shoebox full of invoices you'll sort... eventually",
                  "Find out your food cost at your quarterly accountant visit",
                  "Gut feel on whether you should cut someone",
                  "Discover you're short when rent bounces",
                  "Sysco raises prices and you don't catch it for weeks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#c0392b] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 border-2 border-[#d97757]/30 space-y-5">
              <div className="text-sm font-bold text-[#d97757] uppercase tracking-wider">How it goes with Expo</div>
              <ul className="space-y-4 text-[#30302e]">
                {[
                  "Wake up to yesterday's full recap in your texts",
                  "Snap a photo of each invoice — Expo tracks it all",
                  "Ask \"what's my food cost?\" and get a real answer",
                  "Get a text when labor is running high — then ask what to do",
                  "\"Will I make rent this month?\" — Expo knows before you do",
                  "Talk through pricing, staffing, costs — like a real partner",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#5a9a6e] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-serif">
          Up and running in 5 minutes
        </h2>
        <p className="text-[#87867f] text-center mb-16 max-w-xl mx-auto">
          No software to install. No training. No IT guy needed.
          Just connect your accounts and start texting.
        </p>
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          {[
            { step: "1", title: "Connect Your POS", desc: "Tap one button to connect Square. Expo starts pulling your sales, orders, and labor data right away." },
            { step: "2", title: "Connect Your Bank", desc: "Link your business checking in 60 seconds through Plaid. Expo watches your deposits, bills, and balance." },
            { step: "3", title: "Start Talking", desc: "Text Expo like you'd text a business partner. Ask questions, talk through decisions, get advice — all in plain English." },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#d97757]/10 text-[#d97757] flex items-center justify-center text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-[#87867f] leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-[#d4d2c9]">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-serif">
            Like texting a partner who knows everything
          </h2>
          <p className="text-[#87867f] text-center mb-16 max-w-xl mx-auto">
            Expo doesn&apos;t just report numbers — it thinks with you. Ask it
            anything about your business and get a real conversation, not a dashboard.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Morning Recaps", desc: "Every morning at 7am, Expo texts you a recap of yesterday — what went well, what didn't, and what to watch today. Like a manager's briefing, in your texts." },
              { title: "Smart Alerts", desc: "Labor creeping up? Sales dropping? A deposit missing? Expo texts you the moment something looks off — before it becomes a real problem." },
              { title: "Food Cost Conversations", desc: "Text a photo of any invoice and Expo tracks it. Then ask \"what's my food cost running?\" or \"did chicken go up?\" and talk through it." },
              { title: "Invoice Scanning", desc: "No more shoeboxes. Snap a photo of your Sysco or US Foods invoice and text it over. Expo reads every line item and confirms with you." },
              { title: "Cash Flow Advice", desc: "\"Can I afford a new hire?\" \"Is rent going to be tight?\" Expo knows your balance, your bills, and when things are coming due." },
              { title: "Talk Through Anything", desc: "\"Should I cut someone today?\" \"How does this week compare to last?\" \"Am I actually making money?\" Have real conversations about your business." },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 border border-[#d4d2c9] space-y-3 hover:border-[#d97757]/40 transition"
              >
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-[#87867f] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-serif">
          Restaurant owners love Expo
        </h2>
        <p className="text-[#87867f] text-center mb-16">
          Don&apos;t take our word for it.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { quote: "I used to find out I was losing money at the end of the quarter. Now I know by 7am the next morning. Expo paid for itself in the first week.", name: "Maria G.", role: "Owner, Maria's Taqueria", location: "Detroit, MI" },
            { quote: "I just text it a photo of my Sysco invoice and it tracks everything. No more spreadsheets, no more guessing what my food cost is. It just knows.", name: "James T.", role: "Owner, JT's Coney Island", location: "Dearborn, MI" },
            { quote: "It texted me that my labor was at 38% on a slow Tuesday. I was overstaffed and had no idea. That one alert saved me $400 that week alone.", name: "David K.", role: "Owner, King's Pizza", location: "Warren, MI" },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-lg p-6 border border-[#d4d2c9] space-y-4">
              <p className="text-[#30302e] leading-relaxed text-sm italic">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-[#87867f] text-sm">{t.role}</p>
                <p className="text-[#87867f] text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-[#d4d2c9]">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
            One simple price. Everything included.
          </h2>
          <p className="text-[#87867f] mb-12">
            No tiers. No add-ons. No surprises.
          </p>
          <div className="bg-white border-2 border-[#d97757]/30 rounded-lg p-8 sm:p-10 max-w-md mx-auto space-y-6">
            <div>
              <span className="text-5xl font-bold">$49</span>
              <span className="text-[#87867f] text-lg">/month</span>
            </div>
            <ul className="text-left space-y-3 text-[#30302e] text-sm">
              {[
                "Daily morning recaps via text",
                "Unlimited questions — ask Expo anything",
                "Square POS integration",
                "Bank account monitoring via Plaid",
                "Invoice photo scanning and tracking",
                "Food cost, labor, and sales alerts",
                "Cash flow warnings",
                "Supplier price change detection",
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
            <p className="text-[#87867f] text-sm">Cancel anytime. No contracts.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 font-serif">
          Questions? We&apos;ve got answers.
        </h2>
        <div className="space-y-6">
          {[
            { q: "Do I need to download an app?", a: "Nope. Expo lives in your text messages — the same place you text your family, your staff, your suppliers. There's nothing to download, install, or log into." },
            { q: "What POS systems does Expo work with?", a: "Right now, Expo connects with Square. We're working on Toast, Clover, and others — if you use a different system, let us know and we'll prioritize it." },
            { q: "Can Expo see my bank password or move my money?", a: "Absolutely not. Expo connects through Plaid, the same service used by Venmo and thousands of other apps. We can only read your transactions and balance." },
            { q: "How does the invoice scanning work?", a: "Just take a photo of any supplier invoice with your phone and text it to Expo. Our AI reads every line item, price, and quantity — then confirms with you before logging it." },
            { q: "I'm not great with technology. Can I still use this?", a: "That's exactly who we built Expo for. If you can send a text message, you can use Expo. No dashboards, no reports, no software to learn." },
            { q: "Can I cancel anytime?", a: "Of course. No contracts, no commitments, no cancellation fees. If Expo isn't helping your business, you can cancel anytime." },
          ].map((item) => (
            <div key={item.q} className="border-b border-[#d4d2c9] pb-6">
              <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
              <p className="text-[#87867f] leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#141413] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">
            Your restaurant deserves
            <br />
            a partner who never sleeps.
          </h2>
          <p className="text-[#87867f] text-lg">
            Set up in 5 minutes. Cancel anytime. Just text.
          </p>
          <div className="pt-4">
            <Link
              href="/signup"
              className="inline-block bg-[#d97757] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg"
            >
              Get Started
            </Link>
          </div>
          <p className="text-[#87867f]/50 text-sm pt-8">EXPO</p>
        </div>
      </section>
    </div>
  );
}
