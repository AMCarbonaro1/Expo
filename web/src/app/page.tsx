import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6">
      <main className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">EXPO</h1>
        <p className="text-xl text-zinc-400">
          Your restaurant&apos;s second set of eyes.
        </p>
        <p className="text-zinc-500 leading-relaxed">
          An SMS-based AI business partner that connects to your POS, bank
          account, and supplier invoices — then texts you what matters, every
          day, in plain English.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/signup"
            className="bg-white text-zinc-950 font-semibold px-8 py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            Get Started
          </Link>
        </div>
        <div className="flex gap-6 text-sm text-zinc-600 justify-center">
          <span>SMS-Based</span>
          <span>·</span>
          <span>No App Download</span>
          <span>·</span>
          <span>Works With Your Existing POS</span>
        </div>
      </main>
    </div>
  );
}
