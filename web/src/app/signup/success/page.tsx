export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="text-5xl">✓</div>
        <h1 className="text-3xl font-bold">You&apos;re All Set</h1>
        <p className="text-zinc-400 leading-relaxed">
          Expo is connected to your Square account and pulling in your data
          right now. You&apos;ll get your first morning recap tomorrow at 7am.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
          <p className="text-zinc-400 text-sm">Text Expo anytime at</p>
          <a
            href="sms:+13134749394"
            className="text-2xl font-bold text-white block"
          >
            (313) 474-9394
          </a>
          <p className="text-zinc-500 text-sm">
            Save this number in your contacts as &quot;Expo&quot;
          </p>
        </div>

        <div className="space-y-3 text-left">
          <p className="text-zinc-400 text-sm font-semibold">Try texting:</p>
          <div className="space-y-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-300">
              &quot;How did we do today?&quot;
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-300">
              &quot;What&apos;s my labor this week?&quot;
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-300">
              &quot;What&apos;s my best selling item?&quot;
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 space-y-3">
          <p className="text-zinc-500 text-sm">
            You can also text photos of supplier invoices to track food costs,
            and connect your bank account for full financial insights.
          </p>
        </div>
      </div>
    </div>
  );
}
