"use client";

import { useAuth } from "@/contexts/AuthContext";
import DashboardChecklist from "@/components/DashboardChecklist";

export default function DashboardPage() {
  const { user, restaurant, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">EXPO</span>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-sm hidden sm:block">
              {restaurant?.restaurant_name}
            </span>
            <button
              onClick={logout}
              className="text-zinc-500 text-sm hover:text-white transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome{restaurant?.owner_name ? `, ${restaurant.owner_name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-zinc-400 mt-1">
            Complete the steps below to get Expo fully connected to your restaurant.
          </p>
        </div>

        {/* Checklist */}
        <DashboardChecklist />

        {/* Restaurant Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-lg">Restaurant Profile</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Restaurant</span>
              <p className="text-white">{restaurant?.restaurant_name}</p>
            </div>
            <div>
              <span className="text-zinc-500">Owner</span>
              <p className="text-white">{restaurant?.owner_name}</p>
            </div>
            <div>
              <span className="text-zinc-500">Phone</span>
              <p className="text-white">{restaurant?.phone}</p>
            </div>
            <div>
              <span className="text-zinc-500">Email</span>
              <p className="text-white">{user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
