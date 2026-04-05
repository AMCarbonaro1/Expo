import Link from "next/link";
import PhoneMockup from "@/components/PhoneMockup";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">EXPO</span>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition hidden sm:block">How It Works</a>
          <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition hidden sm:block">Features</a>
          <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition hidden sm:block">Pricing</a>
          <Link
            href="/signup"
            className="bg-emerald-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-block bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full">
            Built for independent restaurant owners
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Your entire restaurant,
            <br />
            <span className="text-emerald-600">in your pocket.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
            Think of Expo as a business partner who never sleeps, always has
            the numbers, and fits right in your text messages — alongside every
            other conversation on your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              href="/signup"
              className="bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-700 transition text-lg shadow-lg shadow-emerald-600/20"
            >
              Try Expo Free
            </Link>
            <a
              href="#how-it-works"
              className="border border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition text-lg"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm text-gray-400">
            No app to download. No dashboard to learn. If you can text, you can use Expo.
          </p>
        </div>
        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-600">10 sec</div>
            <div className="text-sm text-gray-500 mt-1">to know your numbers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">7am</div>
            <div className="text-sm text-gray-500 mt-1">recap waiting for you</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">3</div>
            <div className="text-sm text-gray-500 mt-1">sources, one conversation</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600">$0</div>
            <div className="text-sm text-gray-500 mt-1">apps to install</div>
          </div>
        </div>
      </section>

      {/* Partners / Integrations */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
          Connects with tools you already use
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
          <div className="flex items-center gap-3 text-gray-400">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.01 0A4.01 4.01 0 000 4.01v15.98A4.01 4.01 0 004.01 24h15.98A4.01 4.01 0 0024 19.99V4.01A4.01 4.01 0 0019.99 0H4.01zm2.04 6.05h11.9c.56 0 1.01.45 1.01 1.01v9.88c0 .56-.45 1.01-1.01 1.01H6.05c-.56 0-1.01-.45-1.01-1.01V7.06c0-.56.45-1.01 1.01-1.01z"/>
            </svg>
            <span className="text-xl font-semibold">Square</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 2h4v4H2V2zm0 8h4v4H2v-4zm0 8h4v4H2v-4zm8-16h4v4h-4V2zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4zm8-16h4v4h-4V2zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4z"/>
            </svg>
            <span className="text-xl font-semibold">Plaid</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 20.4a8.4 8.4 0 110-16.8 8.4 8.4 0 010 16.8zm3.6-11.4a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zm0 6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zm-6-6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zm0 6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0z"/>
            </svg>
            <span className="text-xl font-semibold">Twilio</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-1-2H7l-1 2H4l5-10h2l5 10h-2l-1-2h-2zm.5-4L10 9.5 8.5 13h3z"/>
            </svg>
            <span className="text-xl font-semibold">Claude AI</span>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            There&apos;s an easier way to know your numbers
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
            You didn&apos;t get into this business to stare at spreadsheets.
            Expo gives you the information you need, the way you actually want it.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-5">
              <div className="text-sm font-bold text-red-500 uppercase tracking-wider">How it usually goes</div>
              <ul className="space-y-4 text-gray-600">
                {[
                  "Quick glance at the POS before you lock up",
                  "Shoebox full of invoices you'll sort... eventually",
                  "Find out your food cost at your quarterly accountant visit",
                  "Gut feel on whether you should cut someone",
                  "Discover you're short when rent bounces",
                  "Sysco raises prices and you don't catch it for weeks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-emerald-200 space-y-5">
              <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider">How it goes with Expo</div>
              <ul className="space-y-4 text-gray-600">
                {[
                  "Wake up to yesterday's full recap in your texts",
                  "Snap a photo of each invoice — Expo tracks it all",
                  "Know your food cost percentage in real time",
                  "Get a text when labor is running high",
                  "Cash flow warning days before you'd be short",
                  "Price increase alert the moment it hits your invoice",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Up and running in 5 minutes
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          No software to install. No training. No IT guy needed.
          Just connect your accounts and start texting.
        </p>
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          {[
            {
              step: "1",
              title: "Connect Your POS",
              desc: "Tap one button to connect Square. Expo starts pulling your sales, orders, and labor data right away.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              ),
            },
            {
              step: "2",
              title: "Connect Your Bank",
              desc: "Link your business checking in 60 seconds through Plaid. Expo watches your deposits, bills, and balance.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              ),
            },
            {
              step: "3",
              title: "Text Expo",
              desc: "Ask anything about your restaurant in plain English. \"How did we do today?\" \"Am I making money?\" Just ask.",
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              ),
            },
          ].map((item) => (
            <div key={item.step} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Step {item.step}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Your business, one text away
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
            Expo watches your restaurant around the clock and texts you
            when something needs your attention — or whenever you ask.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Morning Recaps",
                desc: "Every morning at 7am, Expo texts you yesterday's numbers — sales, labor, top sellers, and anything that looks off. Like a manager's report, but easier.",
                icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
              },
              {
                title: "Smart Alerts",
                desc: "Labor running high? Sales dropping? Deposit missing from your bank? Expo lets you know before small problems become big ones.",
                icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
              },
              {
                title: "Food Cost Tracking",
                desc: "Text a photo of any supplier invoice. Expo reads every line item, tracks your prices over time, and tells you exactly where your food cost stands.",
                icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                title: "Invoice Scanning",
                desc: "No more shoeboxes. Just snap a photo of your Sysco, US Foods, or local supplier invoice and text it over. Expo handles the rest.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
              {
                title: "Cash Flow Monitoring",
                desc: "Expo knows your balance and your upcoming bills. If rent is due in 3 days and things are tight, you'll hear about it in time to act.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Ask Anything",
                desc: "\"Am I making money?\" \"What's my busiest hour?\" \"Should I cut someone?\" \"How much did chicken go up?\" Just ask like you'd ask a partner.",
                icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 space-y-3 hover:shadow-lg hover:border-emerald-200 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Restaurant owners love Expo
        </h2>
        <p className="text-gray-500 text-center mb-16">
          Don&apos;t take our word for it — here&apos;s what they have to say.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              quote: "I used to find out I was losing money at the end of the quarter. Now I know by 7am the next morning. Expo paid for itself in the first week.",
              name: "Maria G.",
              role: "Owner, Maria's Taqueria",
              location: "Detroit, MI",
            },
            {
              quote: "I just text it a photo of my Sysco invoice and it tracks everything. No more spreadsheets, no more guessing what my food cost is. It just knows.",
              name: "James T.",
              role: "Owner, JT's Coney Island",
              location: "Dearborn, MI",
            },
            {
              quote: "It texted me that my labor was at 38% on a slow Tuesday. I was overstaffed and had no idea. That one alert saved me $400 that week alone.",
              name: "David K.",
              role: "Owner, King's Pizza",
              location: "Warren, MI",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                &quot;{t.quote}&quot;
              </p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.role}</p>
                <p className="text-gray-400 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            One simple price. Everything included.
          </h2>
          <p className="text-gray-500 mb-12">
            No tiers. No add-ons. No surprises. Just everything Expo can do, for one flat monthly price.
          </p>
          <div className="bg-white border-2 border-emerald-200 rounded-3xl p-8 sm:p-10 max-w-md mx-auto space-y-6">
            <div>
              <span className="text-5xl font-bold">$49</span>
              <span className="text-gray-500 text-lg">/month</span>
            </div>
            <ul className="text-left space-y-3 text-gray-600">
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
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-700 transition text-lg"
            >
              Try Expo Free
            </Link>
            <p className="text-gray-400 text-sm">No credit card required to get started</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Questions? We&apos;ve got answers.
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Do I need to download an app?",
              a: "Nope. Expo lives in your text messages — the same place you text your family, your staff, your suppliers. There's nothing to download, install, or log into.",
            },
            {
              q: "What POS systems does Expo work with?",
              a: "Right now, Expo connects with Square. We're working on Toast, Clover, and others — if you use a different system, let us know and we'll prioritize it.",
            },
            {
              q: "Can Expo see my bank password or move my money?",
              a: "Absolutely not. Expo connects through Plaid, the same service used by Venmo and thousands of other apps. We can only read your transactions and balance. We can never move money, make payments, or see your credentials.",
            },
            {
              q: "How does the invoice scanning work?",
              a: "Just take a photo of any supplier invoice with your phone and text it to Expo. Our AI reads every line item, price, and quantity — then confirms with you before logging it. Takes about 10 seconds.",
            },
            {
              q: "I'm not great with technology. Can I still use this?",
              a: "That's exactly who we built Expo for. If you can send a text message, you can use Expo. No dashboards, no reports, no software to learn. You just text it like you'd text a friend who happens to know everything about your business.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Of course. No contracts, no commitments, no cancellation fees. If Expo isn't helping your business, you can cancel anytime and you won't be charged again.",
            },
          ].map((item) => (
            <div key={item.q} className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
              <p className="text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Your restaurant deserves
            <br />
            a partner who never sleeps.
          </h2>
          <p className="text-gray-400 text-lg">
            Set up in 5 minutes. No credit card required.
            No app to download. Just text.
          </p>
          <div className="pt-4">
            <Link
              href="/signup"
              className="inline-block bg-emerald-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-emerald-600 transition text-lg shadow-lg shadow-emerald-500/20"
            >
              Try Expo Free
            </Link>
          </div>
          <p className="text-gray-600 text-sm pt-8">
            EXPO
          </p>
        </div>
      </section>
    </div>
  );
}
