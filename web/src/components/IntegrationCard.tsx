"use client";

import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  connected: boolean;
  connectedText?: string;
  action?: ReactNode;
  icon: ReactNode;
};

export default function IntegrationCard({
  title,
  description,
  connected,
  connectedText = "Connected",
  action,
  icon,
}: Props) {
  return (
    <div className="bg-white border border-[#d4d2c9] rounded-lg p-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-[#f5f4f0] flex items-center justify-center flex-shrink-0 text-[#87867f]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-[#141413]">{title}</h3>
          {connected && (
            <span className="text-xs bg-[#5a9a6e]/15 text-[#5a9a6e] px-2 py-0.5 rounded-full font-medium">
              {connectedText}
            </span>
          )}
        </div>
        <p className="text-[#87867f] text-sm">{description}</p>
        {!connected && action && <div className="mt-3">{action}</div>}
      </div>
      {connected && (
        <svg className="w-6 h-6 text-[#5a9a6e] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}
