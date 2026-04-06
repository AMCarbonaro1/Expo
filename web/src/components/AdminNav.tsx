"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ExpoLogo from "./ExpoLogo";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/accounts", label: "Accounts" },
  { href: "/admin/tools", label: "Tools" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-[#d4d2c9]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <ExpoLogo />
            </Link>
            <span className="text-xs font-medium bg-[#d97757]/10 text-[#d97757] px-2 py-0.5 rounded">
              Admin
            </span>
          </div>
          <button
            onClick={logout}
            className="text-[#87867f] text-sm hover:text-[#141413] transition"
          >
            Log out
          </button>
        </div>
        <nav className="flex gap-1 -mb-px">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || (tab.href !== "/admin" && pathname.startsWith(tab.href));
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
