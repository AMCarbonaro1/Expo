"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const tabs = [
  { href: "/dashboard", label: "Home" },
  { href: "/dashboard/guide", label: "Guide" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/billing", label: "Billing" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { restaurant, logout } = useAuth();

  return (
    <header className="bg-white border-b border-[#d4d2c9]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight text-[#141413]">
            EXPO
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[#87867f] text-sm hidden sm:block">
              {restaurant?.restaurant_name}
            </span>
            <button
              onClick={logout}
              className="text-[#87867f] text-sm hover:text-[#141413] transition"
            >
              Log out
            </button>
          </div>
        </div>
        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
                  isActive
                    ? "border-[#d97757] text-[#d97757]"
                    : "border-transparent text-[#87867f] hover:text-[#141413] hover:border-[#d4d2c9]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
