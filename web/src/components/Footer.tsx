import Link from "next/link";
import ExpoLogo from "./ExpoLogo";

export default function Footer({ variant = "light" }: { variant?: "light" | "dark" }) {
  if (variant === "dark") {
    return (
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid sm:grid-cols-4 gap-8 mb-8">
            <div>
              <ExpoLogo size={20} color="#87867f" textClass="text-sm" />
              <p className="text-white/30 text-xs mt-3 leading-relaxed">
                The AI business partner for independent restaurant owners.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Product</p>
              <div className="space-y-2">
                <Link href="/product" className="block text-xs text-white/30 hover:text-white/60 transition">Overview</Link>
                <Link href="/product/technology" className="block text-xs text-white/30 hover:text-white/60 transition">Technology</Link>
                <Link href="/product/security" className="block text-xs text-white/30 hover:text-white/60 transition">Security</Link>
                <Link href="/product/integrations" className="block text-xs text-white/30 hover:text-white/60 transition">Integrations</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Company</p>
              <div className="space-y-2">
                <Link href="/about" className="block text-xs text-white/30 hover:text-white/60 transition">About</Link>
                <Link href="/commitment" className="block text-xs text-white/30 hover:text-white/60 transition">Our Commitment</Link>
                <Link href="/learning" className="block text-xs text-white/30 hover:text-white/60 transition">Learning Center</Link>
                <Link href="/blog" className="block text-xs text-white/30 hover:text-white/60 transition">Blog</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Get Started</p>
              <div className="space-y-2">
                <Link href="/pricing" className="block text-xs text-white/30 hover:text-white/60 transition">Pricing</Link>
                <Link href="/get-started" className="block text-xs text-white/30 hover:text-white/60 transition">Meet Expo</Link>
                <Link href="/signup" className="block text-xs text-white/30 hover:text-white/60 transition">Sign Up</Link>
                <Link href="/login" className="block text-xs text-white/30 hover:text-white/60 transition">Login</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} Carbonaro Media LLC. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-white/20">
              <Link href="/terms" className="hover:text-white/40 transition">Terms</Link>
              <Link href="/privacy" className="hover:text-white/40 transition">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer className="border-t border-[#d4d2c9] bg-[#e8e6dc]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-4 gap-8 mb-8">
          <div>
            <ExpoLogo />
            <p className="text-[#87867f] text-xs mt-3 leading-relaxed">
              The AI business partner for independent restaurant owners.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#87867f] uppercase tracking-wider mb-3">Product</p>
            <div className="space-y-2">
              <Link href="/product" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Overview</Link>
              <Link href="/product/technology" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Technology</Link>
              <Link href="/product/security" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Security</Link>
              <Link href="/product/integrations" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Integrations</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-[#87867f] uppercase tracking-wider mb-3">Company</p>
            <div className="space-y-2">
              <Link href="/about" className="block text-xs text-[#87867f] hover:text-[#141413] transition">About</Link>
              <Link href="/commitment" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Our Commitment</Link>
              <Link href="/learning" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Learning Center</Link>
              <Link href="/blog" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Blog</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-[#87867f] uppercase tracking-wider mb-3">Get Started</p>
            <div className="space-y-2">
              <Link href="/pricing" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Pricing</Link>
              <Link href="/get-started" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Meet Expo</Link>
              <Link href="/signup" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Sign Up</Link>
              <Link href="/login" className="block text-xs text-[#87867f] hover:text-[#141413] transition">Login</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#d4d2c9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#87867f]">&copy; {new Date().getFullYear()} Carbonaro Media LLC. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-[#87867f]">
            <Link href="/terms" className="hover:text-[#141413] transition">Terms</Link>
            <Link href="/privacy" className="hover:text-[#141413] transition">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
