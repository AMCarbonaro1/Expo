"use client";

import { useState } from "react";
import Link from "next/link";
import StickyNav from "@/components/StickyNav";
import Footer from "@/components/Footer";
import { articles } from "./articles";

const categories = ["All", "Food Cost", "Staffing", "Finance", "Operations", "Using Expo"];

export default function BlogPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        <p className="text-sm font-bold text-[#d97757] uppercase tracking-wider mb-4">Blog</p>
        <h1 className="text-4xl sm:text-5xl font-bold font-serif leading-tight mb-6">
          Insights for independent restaurant owners.
        </h1>
        <p className="text-xl text-[#87867f] max-w-2xl mx-auto">
          Practical advice on food cost, staffing, finance, and operations — written for owners
          who are too busy for textbooks.
        </p>
      </section>

      {/* Category filters */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === cat
                  ? "bg-[#d97757] text-white"
                  : "bg-white border border-[#d4d2c9] text-[#87867f] hover:text-[#141413] hover:border-[#87867f]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Article grid */}
      <section className="max-w-5xl mx-auto px-6 pb-20 sm:pb-28">
        {filtered.length === 0 ? (
          <p className="text-center text-[#87867f] py-16">No articles in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-lg border border-[#d4d2c9] overflow-hidden hover:border-[#d97757]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#d97757] uppercase tracking-wider bg-[#d97757]/10 px-2 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-[#87867f]">{article.readTime} read</span>
                  </div>
                  <h2 className="font-bold text-lg mb-2 flex-1">{article.title}</h2>
                  <p className="text-[#87867f] text-sm leading-relaxed mb-4">{article.excerpt}</p>
                  <p className="text-xs text-[#87867f]">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
