"use client";

// Option 1: Abstract "E" made of horizontal lines (like a signal/brain)
export function LogoSignal({ size = 40, color = "#141413" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="22" height="4" rx="2" fill={color} />
      <rect x="6" y="14" width="16" height="4" rx="2" fill={color} />
      <rect x="6" y="22" width="20" height="4" rx="2" fill={color} />
      <rect x="6" y="30" width="22" height="4" rx="2" fill={color} />
      <circle cx="32" cy="20" r="5" fill="#d97757" />
    </svg>
  );
}

// Option 2: Chat bubble with brain-like dots (SMS + AI)
export function LogoBrain({ size = 40, color = "#141413" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M8 10C8 7.79 9.79 6 12 6H28C30.21 6 32 7.79 32 10V24C32 26.21 30.21 28 28 28H16L10 34V28H12H8V10Z"
        fill={color}
      />
      <circle cx="15" cy="17" r="2.5" fill="#d97757" />
      <circle cx="23" cy="13" r="2" fill="#d97757" opacity="0.7" />
      <circle cx="25" cy="21" r="2.5" fill="#d97757" />
      <circle cx="19" cy="19" r="1.5" fill="#d97757" opacity="0.5" />
    </svg>
  );
}

// Option 3: Minimal starburst/node (Anthropic-style abstract mark)
export function LogoNode({ size = 40, color = "#141413" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="6" fill={color} />
      <line x1="20" y1="4" x2="20" y2="14" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="26" x2="20" y2="36" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="4" y1="20" x2="14" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="20" x2="36" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="9" y1="9" x2="15.5" y2="15.5" stroke="#d97757" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24.5" y1="24.5" x2="31" y2="31" stroke="#d97757" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="31" y1="9" x2="24.5" y2="15.5" stroke="#d97757" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15.5" y1="24.5" x2="9" y2="31" stroke="#d97757" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Option 4: Geometric "E" with dot (clean, Anthropic-minimal)
export function LogoE({ size = 40, color = "#141413" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M10 8H28V12H14V18H26V22H14V28H28V32H10V8Z"
        fill={color}
      />
      <circle cx="32" cy="8" r="4" fill="#d97757" />
    </svg>
  );
}

// Option 5: Abstract converging lines (expo = the pass, where everything comes together)
export function LogoExpo({ size = 40, color = "#141413" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M6 8L20 20L6 32" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8L30 20L16 32" stroke="#d97757" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="33" cy="20" r="3.5" fill="#d97757" />
    </svg>
  );
}

// Preview page component showing all options
export default function LogoPreview() {
  return (
    <div className="min-h-screen bg-[#e8e6dc] flex items-center justify-center">
      <div className="space-y-12 p-12">
        {[
          { name: "Signal (Abstract E)", Component: LogoSignal },
          { name: "Brain (Chat + AI)", Component: LogoBrain },
          { name: "Node (Starburst)", Component: LogoNode },
          { name: "Geometric E", Component: LogoE },
          { name: "Expo (Converging)", Component: LogoExpo },
        ].map(({ name, Component }) => (
          <div key={name} className="space-y-4">
            <p className="text-sm font-medium text-[#87867f]">{name}</p>
            <div className="flex items-center gap-8">
              {/* On light */}
              <div className="bg-[#e8e6dc] p-4 rounded-lg border border-[#d4d2c9] flex items-center gap-3">
                <Component size={40} />
                <span className="text-xl font-bold tracking-tight text-[#141413]">EXPO</span>
              </div>
              {/* On dark */}
              <div className="bg-[#141413] p-4 rounded-lg flex items-center gap-3">
                <Component size={40} color="#ffffff" />
                <span className="text-xl font-bold tracking-tight text-white">EXPO</span>
              </div>
              {/* Large */}
              <div className="bg-white p-6 rounded-lg border border-[#d4d2c9]">
                <Component size={80} />
              </div>
              {/* Tiny (favicon) */}
              <div className="bg-white p-2 rounded border border-[#d4d2c9]">
                <Component size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
