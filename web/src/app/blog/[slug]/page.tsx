import Link from "next/link";
import { notFound } from "next/navigation";
import StickyNav from "@/components/StickyNav";
import Footer from "@/components/Footer";
import { articles } from "../articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      {/* Article header */}
      <article className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-[#d97757] hover:underline">&larr; Back to Blog</Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-[#d97757] uppercase tracking-wider bg-[#d97757]/10 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-[#87867f]">{article.readTime} read</span>
            <span className="text-xs text-[#87867f]">
              {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Article body */}
        <div className="prose-expo space-y-4 text-[#30302e] leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:font-serif [&_h2]:text-[#141413] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-sm [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-sm [&_li]:text-[#30302e] [&_strong]:text-[#141413]">
          {article.content()}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#d97757]/5 border border-[#d97757]/20 rounded-xl p-6 sm:p-8 text-center space-y-4">
          <p className="text-lg font-serif text-[#30302e]">
            Want these insights delivered to your phone automatically?
          </p>
          <p className="text-[#87867f] text-sm">
            Expo connects to your Square POS and bank, then texts you everything you need to know.
            Morning recaps, smart alerts, and answers to any question — $49/month.
          </p>
          <Link href="/signup" className="inline-block bg-[#d97757] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#c4654a] transition">
            Try Expo
          </Link>
        </div>
      </article>

      {/* More articles */}
      {otherArticles.length > 0 && (
        <section className="bg-white border-t border-[#d4d2c9]">
          <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
            <h2 className="text-2xl font-bold font-serif text-center mb-10">More from the blog</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="border border-[#d4d2c9] rounded-lg p-5 hover:border-[#d97757]/40 hover:shadow-md transition-all duration-200 space-y-2"
                >
                  <span className="text-[10px] font-bold text-[#d97757] uppercase tracking-wider">{a.category}</span>
                  <h3 className="font-bold text-sm">{a.title}</h3>
                  <p className="text-[#87867f] text-xs">{a.readTime} read</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
