"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ExpoLogo from "./ExpoLogo";

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-[#d4d2c9]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <ExpoLogo />
        </Link>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-[#87867f] hover:text-[#141413] transition hidden sm:block">
            How It Works
          </a>
          <a href="#features" className="text-sm text-[#87867f] hover:text-[#141413] transition hidden sm:block">
            Features
          </a>
          <a href="#pricing" className="text-sm text-[#87867f] hover:text-[#141413] transition hidden sm:block">
            Pricing
          </a>
          <Link href="/login" className="text-sm text-[#87867f] hover:text-[#141413] transition">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#d97757] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#c4654a] transition text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
