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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-white">{title}</h3>
          {connected && (
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
              {connectedText}
            </span>
          )}
        </div>
        <p className="text-zinc-500 text-sm">{description}</p>
        {!connected && action && <div className="mt-3">{action}</div>}
      </div>
      {connected && (
        <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}
