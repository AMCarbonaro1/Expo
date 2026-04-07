"use client";

import { useEffect, useState, useCallback } from "react";
import { LogoSignal } from "./Logo";

const phrases = [
  // Kitchen life
  "Flipping burgers...",
  "Dropping fries...",
  "Firing table 6...",
  "Plating the special...",
  "Restocking the line...",
  "Wiping down the pass...",
  "Rolling silverware...",
  "Refilling the ice...",
  "Checking the walk-in...",
  "Rotating the stock...",
  // The real ones
  "Picking up dropped tongs...",
  "Finding the ticket printer paper...",
  "Unjamming the receipt printer...",
  "Cleaning the grease trap...",
  "Counting the drawer...",
  "Hiding from the health inspector...",
  "Pretending to look busy...",
  "Avoiding the dish pit...",
  "Burning my arm on the oven...",
  "Tasting the soup...",
  // Front of house
  "86ing the fish...",
  "Splitting the check...",
  "Cutting someone early...",
  "Flipping the open sign...",
  "Locking the back door...",
  "Turning off the fryers...",
  "Mopping the walk-in...",
  "Counting the till...",
  // Insider lingo
  "Heard...",
  "Behind you...",
  "Corner...",
  "Hot behind...",
  "Yes chef...",
  "All day...",
  "On the fly...",
  "In the weeds...",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TypingHero() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shuffledPhrases, setShuffledPhrases] = useState<string[]>([]);

  useEffect(() => {
    setShuffledPhrases(shuffle(phrases));
  }, []);

  useEffect(() => {
    if (shuffledPhrases.length === 0) return;

    const currentPhrase = shuffledPhrases[phraseIndex % shuffledPhrases.length];

    if (!isDeleting && charIndex <= currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 50 + Math.random() * 30); // slight randomness for natural feel
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex > currentPhrase.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
        setDisplayText(currentPhrase.slice(0, charIndex - 1));
      }, 25);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => {
        const next = prev + 1;
        if (next >= shuffledPhrases.length) {
          setShuffledPhrases(shuffle(phrases));
          return 0;
        }
        return next;
      });
    }
  }, [charIndex, isDeleting, phraseIndex, shuffledPhrases]);

  return (
    <div className="flex items-center gap-4">
      <LogoSignal size={48} color="#d97757" />
      <div className="relative">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141413] font-serif">
          {displayText}
          <span className="animate-pulse text-[#d97757]">|</span>
        </span>
      </div>
    </div>
  );
}
