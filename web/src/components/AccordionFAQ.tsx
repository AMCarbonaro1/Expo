"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };

export default function AccordionFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border border-[#d4d2c9] rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#f5f4f0] transition"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[#141413] text-lg">{item.q}</span>
              <svg
                className={`w-5 h-5 text-[#87867f] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[#87867f] leading-relaxed text-sm">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
