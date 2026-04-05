export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="text-5xl">✓</div>
        <h1 className="text-3xl font-bold">You&apos;re All Set</h1>
        <p className="text-zinc-400 leading-relaxed">
          Expo is connected to your Square account and pulling in your data
          right now. You&apos;ll get your first morning recap tomorrow at 7am.
        </p>
        <p className="text-zinc-500 text-sm">
          In the meantime, you can text Expo anytime — try asking &quot;how did
          we do today&quot; or &quot;what&apos;s my busiest day.&quot;
        </p>
      </div>
    </div>
  );
}
