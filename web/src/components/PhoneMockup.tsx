"use client";

import { useEffect, useState } from "react";

type Message = {
  from: "user" | "expo";
  text: string;
};

const conversations: Message[][] = [
  [
    { from: "user", text: "How did we do today?" },
    {
      from: "expo",
      text: "Yesterday: $3,847 sales across 187 orders ($20.57 avg). That's 8% above your Tuesday average. Labor was 28.3%. Looking solid!",
    },
  ],
  [
    { from: "expo", text: "GM! Yesterday: $4,230 (192 orders, $22.03 avg). Labor: 27.1%. Food cost running 31.2% vs your 30% target. Top seller: Gyro Platter (43 sold). No alerts. Have a great day!" },
  ],
  [
    { from: "user", text: "What's in my bank account?" },
    {
      from: "expo",
      text: "Chase balance: $12,450. You've got rent ($4,200) hitting in 3 days. After that you'll be at ~$8,250. Cash flow looks healthy.",
    },
  ],
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
  const [convoIndex, setConvoIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const convo = conversations[convoIndex];

    if (msgIndex >= convo.length) {
      // Pause then move to next conversation
      const timer = setTimeout(() => {
        setConvoIndex((prev) => (prev + 1) % conversations.length);
        setVisibleMessages([]);
        setMsgIndex(0);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const msg = convo[msgIndex];

    if (msg.from === "expo") {
      // Show typing indicator first
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, msg]);
        setMsgIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(typingTimer);
    } else {
      // User messages appear after a short delay
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg]);
        setMsgIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [convoIndex, msgIndex]);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      {/* Phone frame */}
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
        <div className="h-[360px] sm:h-[400px] bg-white px-3 py-4 flex flex-col justify-end gap-2 overflow-hidden">
          {visibleMessages.map((msg, i) => (
            <div
              key={`${convoIndex}-${i}`}
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
