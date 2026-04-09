import StickyNav from "@/components/StickyNav";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const categories = [
  {
    title: "Getting Started",
    desc: "Set up Expo in 5 minutes.",
    items: [
      { step: "Sign up", detail: "Create your account at carbonaromedia.com/signup with your name, email, phone, and restaurant info." },
      { step: "Connect Square", detail: "From your dashboard, tap \"Connect Square\" and authorize Expo to access your POS data. Takes one tap." },
      { step: "Connect your bank", detail: "Tap \"Connect Bank\" and link your business checking through Plaid. Read-only access — Expo can never move money." },
      { step: "Start texting", detail: "Text the Expo number from the phone you registered with. Ask anything about your business." },
    ],
  },
  {
    title: "Asking Questions",
    desc: "What you can ask Expo — and how to phrase it.",
    examples: [
      "How are sales today?",
      "How many gyros have we sold?",
      "Who's clocked in right now?",
      "What's our labor cost at?",
      "Are we ahead or behind vs last Tuesday?",
      "What's our best seller this week?",
      "Should I send someone home?",
      "Can I afford to hire another cook?",
      "How does this month compare to last month?",
      "Did the deposit go through?",
    ],
    tip: "Talk to Expo like you'd talk to your best employee. Plain English, no special commands. It understands context.",
  },
  {
    title: "Morning Recaps",
    desc: "Your daily briefing, delivered before you even get to the restaurant.",
    items: [
      { step: "What's included", detail: "Yesterday's total sales, order count, average ticket, labor cost %, top sellers, deposit status, and day-over-day comparison." },
      { step: "When it arrives", detail: "Every morning at your chosen time (default: 7am). You can change the time via text or in your dashboard settings." },
      { step: "Enable or disable", detail: "Text Expo \"Turn off recaps\" to disable or \"Turn on recaps\" to re-enable. Or toggle in your dashboard settings." },
    ],
  },
  {
    title: "Invoice Scanning",
    desc: "Text a photo and Expo tracks everything.",
    items: [
      { step: "Take a photo", detail: "Use your phone's camera to photograph any supplier invoice (Sysco, US Foods, local vendors, etc.)." },
      { step: "Text it to Expo", detail: "Send the photo as a text message to your Expo number, just like you'd text a photo to anyone." },
      { step: "Expo reads it", detail: "AI reads every line item, price, quantity, and vendor name. It confirms what it found and asks you to approve." },
      { step: "Reply YES", detail: "Once you confirm, the invoice is logged. Expo tracks prices over time and alerts you when something goes up." },
    ],
  },
  {
    title: "Smart Alerts",
    desc: "Expo texts YOU when something needs attention.",
    examples: [
      "Labor alert — you're overstaffed for current sales volume",
      "Deposit alert — no deposit posted for yesterday's sales",
      "Cash flow warning — upcoming expenses may exceed your balance",
      "Price alert — a supplier increased prices on your latest invoice",
    ],
    tip: "Alerts are on by default. Text Expo \"Turn off alerts\" to disable or \"Turn on alerts\" to re-enable.",
  },
  {
    title: "Settings via Text",
    desc: "Change your preferences without logging in.",
    examples: [
      "\"Change my recap time to 6am\"",
      "\"Turn off recaps\"",
      "\"Turn on alerts\"",
      "\"Set my food cost target to 30%\"",
      "\"Change my restaurant name to Mario's Pizzeria\"",
      "\"Contact Support\" — creates a support ticket and our team calls you",
    ],
    tip: "When you request a settings change, Expo will confirm before applying. Reply YES to confirm or NO to cancel.",
  },
];

export default function LearningPage() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Learning Center</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Get the most out of Expo.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          Everything you need to know about using Expo — from setup to advanced tips.
          Remember: if you can send a text, you can use Expo.
        </p>
      </section>

      {/* Categories */}
      {categories.map((cat, i) => (
        <FadeIn key={cat.title}>
          <section className={i % 2 === 0 ? "bg-white border-y border-[#d4d2c9]" : ""}>
            <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-serif mb-2">{cat.title}</h2>
                <p className="text-[#87867f]">{cat.desc}</p>
              </div>

              {cat.items && (
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-4 bg-[#f5f4f0] rounded-lg p-4 border border-[#d4d2c9]">
                      <span className="w-7 h-7 rounded-full bg-[#d97757] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-sm">{item.step}</p>
                        <p className="text-[#87867f] text-sm leading-relaxed mt-1">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cat.examples && (
                <div className="space-y-2">
                  {cat.examples.map((ex, j) => (
                    <div key={j} className="bg-[#f5f4f0] rounded-lg px-4 py-3 border border-[#d4d2c9]">
                      <p className="text-sm text-[#30302e] font-mono">{ex}</p>
                    </div>
                  ))}
                </div>
              )}

              {cat.tip && (
                <div className="mt-6 bg-[#d97757]/5 border border-[#d97757]/20 rounded-lg px-5 py-4">
                  <p className="text-sm text-[#30302e]">
                    <strong className="text-[#d97757]">Tip:</strong>{" "}{cat.tip}
                  </p>
                </div>
              )}
            </div>
          </section>
        </FadeIn>
      ))}

      {/* CTA */}
      <FadeIn>
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold font-serif mb-4">Still have questions?</h2>
          <p className="text-[#87867f] mb-6">
            Text &quot;Contact Support&quot; to your Expo number and our team will reach out to you personally.
            Or email us anytime.
          </p>
          <a href="mailto:carbonaromedia@gmail.com" className="text-[#d97757] font-semibold hover:underline">
            carbonaromedia@gmail.com
          </a>
        </section>
      </FadeIn>

      <Footer />
    </div>
  );
}
