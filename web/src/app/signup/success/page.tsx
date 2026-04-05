export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="text-5xl">✓</div>
        <h1 className="text-3xl font-bold">One Last Step</h1>
        <p className="text-zinc-400 leading-relaxed">
          Expo is connected and pulling in your data. To finish setup, send your
          first text to Expo right now.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <p className="text-white font-semibold">Text this number now:</p>
          <a
            href="sms:+13134749394"
            className="text-3xl font-bold text-white block"
          >
            (313) 474-9394
          </a>
          <a
            href="sms:+13134749394&body=Hey"
            className="inline-block bg-white text-zinc-950 font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            Open Text Message
          </a>
          <p className="text-zinc-500 text-xs">
            Save this number as &quot;Expo&quot; in your contacts
          </p>
        </div>

        <div className="space-y-3 text-left">
          <p className="text-zinc-400 text-sm font-semibold">
            Send any of these to get started:
          </p>
          <div className="space-y-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-300">
              &quot;Hey&quot;
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-300">
              &quot;How did we do today?&quot;
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-300">
              &quot;What&apos;s my best selling item?&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
