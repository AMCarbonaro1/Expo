"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ExpoLogo from "./ExpoLogo";

type DropdownItem = { href: string; label: string };

const productLinks: DropdownItem[] = [
  { href: "/product", label: "Overview" },
  { href: "/product/technology", label: "Technology" },
  { href: "/product/security", label: "Security" },
  { href: "/product/integrations", label: "Integrations" },
];

const companyLinks: DropdownItem[] = [
  { href: "/about", label: "About" },
  { href: "/commitment", label: "Our Commitment" },
  { href: "/learning", label: "Learning Center" },
];

function Dropdown({ label, items, open, onOpen, onClose }: {
  label: string;
  items: DropdownItem[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleEnter = () => {
    clearTimeout(timeout.current);
    onOpen();
  };

  const handleLeave = () => {
    timeout.current = setTimeout(onClose, 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        onClick={() => (open ? onClose() : onOpen())}
        className="text-sm text-[#87867f] hover:text-[#141413] transition flex items-center gap-1"
      >
        {label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#d4d2c9] py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-[#30302e] hover:bg-[#f5f4f0] hover:text-[#d97757] transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <ExpoLogo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Dropdown
            label="Product"
            items={productLinks}
            open={openDropdown === "product"}
            onOpen={() => setOpenDropdown("product")}
            onClose={() => setOpenDropdown(null)}
          />
          <Link href="/pricing" className="text-sm text-[#87867f] hover:text-[#141413] transition">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm text-[#87867f] hover:text-[#141413] transition">
            Blog
          </Link>
          <Dropdown
            label="Company"
            items={companyLinks}
            open={openDropdown === "company"}
            onOpen={() => setOpenDropdown("company")}
            onClose={() => setOpenDropdown(null)}
          />
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#87867f] hover:text-[#141413] transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#d4d2c9] px-6 py-4 space-y-4 shadow-lg">
          <div>
            <p className="text-xs font-bold text-[#87867f] uppercase tracking-wider mb-2">Product</p>
            {productLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[#30302e] hover:text-[#d97757] transition">
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-[#87867f] uppercase tracking-wider mb-2">Company</p>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[#30302e] hover:text-[#d97757] transition">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2 pt-2 border-t border-[#d4d2c9]">
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[#30302e] hover:text-[#d97757] transition">Pricing</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[#30302e] hover:text-[#d97757] transition">Blog</Link>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[#30302e] hover:text-[#d97757] transition">Log In</Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} className="block bg-[#d97757] text-white font-medium px-5 py-3 rounded-lg hover:bg-[#c4654a] transition text-sm text-center mt-2">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
