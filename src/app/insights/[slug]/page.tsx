import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import Link from 'next/link';

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#f7f8fa] min-h-screen pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-bold text-copter-blue hover:text-copter-red transition-colors mb-12 uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Insights
        </Link>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 text-xs font-bold text-copter-grey mb-6 uppercase tracking-wider">
            <span className="text-copter-red">{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-copter-blue mb-8 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0a1e35] flex items-center justify-center text-white font-bold text-xs">
              {article.author.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-copter-blue">{article.author}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-copter-grey leading-relaxed space-y-8">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-lg md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share & Tags Section (Optional styling) */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
           <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <span className="text-sm font-bold text-copter-blue tracking-widest uppercase">
                Share this article
              </span>
              <div className="flex gap-4">
                {/* Mock social icons */}
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-copter-grey hover:bg-copter-blue hover:text-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-copter-grey hover:bg-[#0077b5] hover:text-white transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                </div>
              </div>
           </div>
        </footer>
      </article>
    </div>
  );
}
