"use client";

import { useEffect, useState, useRef } from "react";

type Message = {
  from: "user" | "expo";
  text: string;
  isImage?: boolean;
};

const thread: Message[] = [
  { from: "user", text: "How much did we sell today?" },
  { from: "expo", text: "$3,847 across 187 orders. That's 8% above your Tuesday average. Labor was 28.3%." },
  { from: "user", text: "Did Lauren make the drop?" },
  { from: "expo", text: "Yes, a $2,910 deposit hit your Chase account at 9:47pm. Everything looks right." },
  { from: "user", text: "📎 This week's schedule", isImage: true },
  { from: "expo", text: "Got it — saved. You've got 6 people on Thursday and 4 on Friday. Friday looks light for a typical weekend. Want me to flag if sales outpace your staffing?" },
  { from: "user", text: "How did we finish?" },
  { from: "expo", text: "Closed at $4,620 today. 214 orders, $21.59 avg ticket. Your best Wednesday in 3 weeks. Labor finished at 26.8% — solid day." },
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

function ScheduleImage() {
  return (
    <div className="bg-[#d97757] rounded-xl p-3 space-y-1.5 text-white text-xs w-full">
      <div className="flex justify-between font-semibold text-[10px] uppercase tracking-wider opacity-80">
        <span>This Week</span>
        <span>Staff</span>
      </div>
      {[
        { day: "Mon", names: "Alex, Sam, Tina", count: 3 },
        { day: "Tue", names: "Alex, Sam, Kim", count: 3 },
        { day: "Wed", names: "Alex, Sam, Tina, Jo", count: 4 },
        { day: "Thu", names: "All staff", count: 6 },
        { day: "Fri", names: "Alex, Sam, Kim, Jo", count: 4 },
      ].map((row) => (
        <div key={row.day} className="flex justify-between items-center bg-white/15 rounded px-2 py-1">
          <span className="font-medium w-8">{row.day}</span>
          <span className="flex-1 truncate opacity-80 text-[10px] px-2">{row.names}</span>
          <span className="font-semibold">{row.count}</span>
        </div>
      ))}
    </div>
  );
}

export default function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    if (msgIndex >= thread.length) {
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
  }, [msgIndex]);

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
        <div ref={scrollRef} className="h-[360px] sm:h-[400px] bg-white px-3 py-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] animate-[fadeSlideUp_0.3s_ease-out] ${
                msg.from === "user"
                  ? "self-end"
                  : "self-start"
              }`}
            >
              {msg.isImage ? (
                <div className="space-y-1">
                  <ScheduleImage />
                  <div className="bg-[#d97757] text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div
                  className={`px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-[#d97757] text-white rounded-2xl rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              )}
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
