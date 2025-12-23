import { ViewTransition } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getNewsArticles } from '@/domain/news/news';
import { NewsArticleCard } from '@/components/news-article-card';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Novosti',
  description: 'Pratite najnovije vesti i događaje u BAZA pilates studiju.',
};

export default async function News() {
  const news = await getNewsArticles();

  if (news.length === 0) {
    return (
      <ViewTransition>
        <main className='flex flex-1 flex-col justify-center gap-8 xl:gap-12'>
          <section className='flex flex-col gap-8 px-4 py-8 xl:gap-12 xl:px-20 xl:py-12'>
            <div className='relative flex items-center justify-center'>
              <h1 className='whitespace-nowrap'>Novosti</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-4 py-12'>
              <p className='text-foreground text-center text-xl md:text-2xl'>
                Trenutno nema novih članaka.
              </p>
              <p className='text-foreground text-center text-base md:text-lg'>
                Proverite kasnije za najnovije vesti.
              </p>
            </div>
          </section>
        </main>
      </ViewTransition>
    );
  }

  const featured = news[news.length - 1];
  const otherNews = news.slice(-4, -1).reverse();

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 xl:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 xl:gap-12 xl:px-20 xl:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Novosti</h1>
          </div>

          <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 xl:mx-0 xl:max-w-full xl:grid-cols-2 xl:gap-12'>
            <NewsArticleCard
              id={featured.id}
              title={featured.title}
              excerpt={featured.excerpt}
              date={featured.date}
              image={featured.image}
              featured
            />

            <div className='flex flex-col gap-3 md:gap-6'>
              {otherNews.map(article => (
                <NewsArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  date={article.date}
                  image={article.image}
                />
              ))}

              <div className='flex justify-center'>
                <Link
                  className='text-accent hover:text-accent/80 inline-flex items-center text-xl font-bold transition-colors'
                  href='/sve-novosti'
                >
                  Pogledaj sve
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
