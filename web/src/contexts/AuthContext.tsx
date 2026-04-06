"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type User = { id: number; email: string };
type Restaurant = { id: number; owner_name: string; restaurant_name: string; phone: string };

type AuthState = {
  user: User | null;
  restaurant: Restaurant | null;
  token: string | null;
  loading: boolean;
  subscriptionStatus: string | null;
  trialActive: boolean;
  daysLeft: number;
  isActive: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    owner_name: string;
    restaurant_name: string;
    phone: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function apiFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("expo_token") : null;
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}

function setToken(token: string) {
  localStorage.setItem("expo_token", token);
  document.cookie = `expo_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
}

function clearToken() {
  localStorage.removeItem("expo_token");
  document.cookie = "expo_token=; path=/; max-age=0";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [trialActive, setTrialActive] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  function updateSubscription(data: { subscription_status?: string; trial_active?: boolean; days_left?: number; is_active?: boolean; is_admin?: boolean }) {
    setSubscriptionStatus(data.subscription_status || null);
    setTrialActive(data.trial_active || false);
    setDaysLeft(data.days_left || 0);
    setIsActive(data.is_active || false);
    setIsAdmin(data.is_admin || false);
  }

  useEffect(() => {
    const saved = localStorage.getItem("expo_token");
    if (saved) {
      setTokenState(saved);
      apiFetch("/api/auth/me")
        .then((r) => r.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            setRestaurant(data.restaurant);
            updateSubscription(data);
          } else {
            clearToken();
          }
        })
        .catch(() => clearToken())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Login failed");
    }
    const data = await res.json();
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    setRestaurant(data.restaurant);
    updateSubscription(data);
    router.push(data.is_admin ? "/admin" : "/dashboard");
  }

  async function signup(formData: {
    email: string;
    password: string;
    owner_name: string;
    restaurant_name: string;
    phone: string;
  }) {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Signup failed");
    }
    const data = await res.json();
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    setRestaurant(data.restaurant);
    updateSubscription(data);
    router.push("/dashboard");
  }

  function logout() {
    clearToken();
    localStorage.removeItem("expo_texted");
    localStorage.removeItem("expo_invoice");
    setTokenState(null);
    setUser(null);
    setRestaurant(null);
    setSubscriptionStatus(null);
    setTrialActive(false);
    setDaysLeft(0);
    setIsActive(false);
    setIsAdmin(false);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, restaurant, token, loading, subscriptionStatus, trialActive, daysLeft, isActive, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
