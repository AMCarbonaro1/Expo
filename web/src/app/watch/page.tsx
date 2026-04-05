import Link from "next/link";
import ExpoLogo from "@/components/ExpoLogo";

export default function WatchPage() {
  // Replace with your actual Vimeo video ID
  const vimeoId = "REPLACE_WITH_VIMEO_ID";

  return (
    <div className="min-h-screen bg-[#141413] text-white">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/">
          <ExpoLogo size={28} color="#ffffff" />
        </Link>
        <Link
          href="/signup"
          className="bg-[#d97757] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#c4654a] transition text-sm"
        >
          Get Started
        </Link>
      </nav>

      {/* Live badge + headline */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#d97757]/20 text-[#d97757] text-sm font-medium px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#d97757] animate-pulse" />
          Live Presentation
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
          What if your restaurant had a brain —
          <br />
          <span className="text-[#d97757]">and you could text it?</span>
        </h1>
        <p className="text-[#87867f] text-lg max-w-2xl mx-auto">
          See how Expo connects to your POS, bank, and invoices — then lets you
          run your entire restaurant from your text messages.
        </p>
      </div>

      {/* Video */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-2xl mx-auto px-6 py-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif">
          Ready to try it?
        </h2>
        <p className="text-[#87867f]">
          Set up in 5 minutes. $49/month. Cancel anytime.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-[#d97757] text-white font-semibold px-10 py-4 rounded-lg hover:bg-[#c4654a] transition text-lg"
        >
          Get Started — $49/month
        </Link>

        {/* Quick benefits */}
        <div className="grid sm:grid-cols-3 gap-6 pt-8 text-left">
          {[
            { title: "SMS-Based", desc: "No app to download. Just text." },
            { title: "Connects Everything", desc: "POS, bank, and invoices in one thread." },
            { title: "AI-Powered", desc: "Ask anything about your business." },
          ].map((item) => (
            <div key={item.title} className="space-y-1">
              <p className="text-white font-medium text-sm">{item.title}</p>
              <p className="text-[#87867f] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8 text-center">
        <div className="flex justify-center opacity-40">
          <ExpoLogo size={20} color="#87867f" textClass="text-sm" />
        </div>
      </div>
    </div>
  );
}
