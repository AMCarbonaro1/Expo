"use client";

import { useEffect, useState, useRef } from "react";

type Message = {
  from: "user" | "expo";
  text: string;
};

const thread: Message[] = [
  { from: "user", text: "How much did we sell today?" },
  { from: "expo", text: "$3,847 across 187 orders. That's 8% above your Tuesday average. Labor was 28.3%." },
  { from: "user", text: "Did Lauren make the drop?" },
  { from: "expo", text: "Yes, a $2,910 deposit hit your Chase account this evening." },
  { from: "user", text: "Why is that less than sales?" },
  { from: "expo", text: "Card fees, tips paid out, and cash transactions. The gap is normal — nothing missing." },
  { from: "user", text: "What's my food cost this week?" },
  { from: "expo", text: "Running 31.2% vs your 30% target. Gyro meat went up 12% on your last Sysco order — that's the main driver." },
  { from: "user", text: "Am I making money?" },
  { from: "expo", text: "$18K revenue this month, $5.4K food, $5K labor, $4.2K rent. Netting ~$2.4K. Raising your avg ticket by $2 would add $3K/month." },
  { from: "user", text: "Can I afford to hire someone?" },
  { from: "expo", text: "Labor is 28% right now. Adding someone at $15/hr for 30hrs pushes it to 32%. I'd wait until after rent clears on the 23rd." },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-sm w-fit">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export default function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    if (paused) return;

    if (msgIndex >= thread.length) {
      // Pause at end, then restart
      const timer = setTimeout(() => {
        setVisibleMessages([]);
        setMsgIndex(0);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const msg = thread[msgIndex];

    if (msg.from === "expo") {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, msg]);
        setMsgIndex((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(typingTimer);
    } else {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg]);
        setMsgIndex((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [msgIndex, paused]);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      <div className="rounded-[3rem] border-[8px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="bg-gray-800 text-white text-center text-xs py-2 px-6 flex justify-between items-center">
          <span>9:41</span>
          <span className="w-20 h-5 bg-gray-900 rounded-full" />
          <span>100%</span>
        </div>

        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d97757] flex items-center justify-center text-white text-xs font-bold">
            E
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Expo</p>
            <p className="text-xs text-gray-500">Your business partner</p>
          </div>
        </div>

        {/* Messages area */}
        <div className="h-[360px] sm:h-[400px] bg-white px-3 py-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed animate-[fadeSlideUp_0.3s_ease-out] ${
                msg.from === "user"
                  ? "self-end bg-[#d97757] text-white rounded-2xl rounded-br-sm"
                  : "self-start bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="self-start animate-[fadeSlideUp_0.3s_ease-out]">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="bg-white border-t border-gray-200 px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">
            Text message
          </div>
          <div className="w-8 h-8 rounded-full bg-[#d97757] flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
