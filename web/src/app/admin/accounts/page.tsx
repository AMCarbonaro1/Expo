"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/contexts/AuthContext";

type Account = {
  id: number;
  restaurant_name: string;
  owner_name: string;
  email: string;
  phone: string;
  subscription_status: string;
  square_connected: boolean;
  bank_connected: boolean;
  message_count: number;
  created_at: string;
};

const statusColors: Record<string, string> = {
  active: "bg-[#5a9a6e]/15 text-[#5a9a6e]",
  incomplete: "bg-[#87867f]/15 text-[#87867f]",
  past_due: "bg-[#c0392b]/15 text-[#c0392b]",
  canceled: "bg-[#c0392b]/15 text-[#c0392b]",
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      apiFetch(`/api/admin/accounts?search=${encodeURIComponent(search)}`)
        .then((r) => r.json())
        .then((data) => {
          setAccounts(data.accounts || []);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#141413] font-serif">Accounts</h1>
        <span className="text-[#87867f] text-sm">{accounts.length} total</span>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, email, or restaurant..."
        className="w-full bg-white border border-[#d4d2c9] rounded-lg px-4 py-3 text-[#141413] focus:outline-none focus:border-[#d97757] focus:ring-2 focus:ring-[#d97757]/20 transition"
      />

      {loading ? (
        <p className="text-[#87867f]">Loading...</p>
      ) : (
        <div className="bg-white border border-[#d4d2c9] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#d4d2c9] bg-[#f5f4f0]">
                  <th className="text-left px-4 py-3 text-[#87867f] font-medium">Restaurant</th>
                  <th className="text-left px-4 py-3 text-[#87867f] font-medium">Owner</th>
                  <th className="text-left px-4 py-3 text-[#87867f] font-medium hidden sm:table-cell">Email</th>
                  <th className="text-center px-4 py-3 text-[#87867f] font-medium">Status</th>
                  <th className="text-center px-4 py-3 text-[#87867f] font-medium">POS</th>
                  <th className="text-center px-4 py-3 text-[#87867f] font-medium">Bank</th>
                  <th className="text-center px-4 py-3 text-[#87867f] font-medium">Msgs</th>
                  <th className="text-right px-4 py-3 text-[#87867f] font-medium hidden sm:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.id} className="border-b border-[#d4d2c9] last:border-0 hover:bg-[#f5f4f0]/50 transition">
                    <td className="px-4 py-3">
                      <Link href={`/admin/accounts/${a.id}`} className="text-[#d97757] font-medium hover:underline">
                        {a.restaurant_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#141413]">{a.owner_name}</td>
                    <td className="px-4 py-3 text-[#87867f] hidden sm:table-cell">{a.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[a.subscription_status] || statusColors.incomplete}`}>
                        {a.subscription_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`w-2 h-2 rounded-full inline-block ${a.square_connected ? "bg-[#5a9a6e]" : "bg-[#d4d2c9]"}`} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`w-2 h-2 rounded-full inline-block ${a.bank_connected ? "bg-[#5a9a6e]" : "bg-[#d4d2c9]"}`} />
                    </td>
                    <td className="px-4 py-3 text-center text-[#87867f]">{a.message_count}</td>
                    <td className="px-4 py-3 text-right text-[#87867f] text-xs hidden sm:table-cell">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {accounts.length === 0 && (
            <p className="text-[#87867f] text-sm text-center py-8">No accounts found.</p>
          )}
        </div>
      )}
    </main>
  );
}
