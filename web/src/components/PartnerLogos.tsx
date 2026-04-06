// Square logo
export function SquareLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M10.7 0C4.8 0 0 4.8 0 10.7v42.6C0 59.2 4.8 64 10.7 64h42.6C59.2 64 64 59.2 64 53.3V10.7C64 4.8 59.2 0 53.3 0H10.7zm5.4 16.1h31.8c1.5 0 2.7 1.2 2.7 2.7v26.4c0 1.5-1.2 2.7-2.7 2.7H16.1c-1.5 0-2.7-1.2-2.7-2.7V18.8c0-1.5 1.2-2.7 2.7-2.7z" />
    </svg>
  );
}

// Plaid logo
export function PlaidLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <rect x="2" y="2" width="16" height="16" rx="2" />
      <rect x="24" y="2" width="16" height="16" rx="2" />
      <rect x="46" y="2" width="16" height="16" rx="2" />
      <rect x="2" y="24" width="16" height="16" rx="2" />
      <rect x="24" y="24" width="16" height="16" rx="2" />
      <rect x="46" y="24" width="16" height="16" rx="2" />
      <rect x="2" y="46" width="16" height="16" rx="2" />
      <rect x="24" y="46" width="16" height="16" rx="2" />
      <rect x="46" y="46" width="16" height="16" rx="2" />
    </svg>
  );
}

// Twilio logo
export function TwilioLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 0C14.3 0 0 14.3 0 32s14.3 32 32 32 32-14.3 32-32S49.7 0 32 0zm0 54.4c-12.4 0-22.4-10-22.4-22.4S19.6 9.6 32 9.6 54.4 19.6 54.4 32 44.4 54.4 32 54.4zm9.6-30.4c0 2.6-2.2 4.8-4.8 4.8s-4.8-2.2-4.8-4.8 2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8zm0 16c0 2.6-2.2 4.8-4.8 4.8s-4.8-2.2-4.8-4.8 2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8zm-16-16c0 2.6-2.2 4.8-4.8 4.8S16 26.6 16 24s2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8zm0 16c0 2.6-2.2 4.8-4.8 4.8S16 42.6 16 40s2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8z" />
    </svg>
  );
}

// Anthropic / Claude logo (simplified starburst)
export function ClaudeLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M35.2 8L40.8 24.8 56 20 44.8 32 56 44 40.8 39.2 35.2 56 32 40 28.8 56 23.2 39.2 8 44 19.2 32 8 20 23.2 24.8 28.8 8 32 24z" />
    </svg>
  );
}
