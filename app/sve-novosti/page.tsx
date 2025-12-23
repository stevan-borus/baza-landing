import { ViewTransition } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getNewsArticles } from '@/domain/news/news';
import { NewsArticleCard } from '@/components/news-article-card';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Sve Novosti',
  description: 'Pregled svih vesti i događaja u BAZA pilates studiju.',
};

export default async function AllNews() {
  const news = await getNewsArticles();
  // Reverse to show newest first
  const allNews = [...news].reverse();

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center'>
            <Link
              href='/novosti'
              className='transition-transform hover:scale-110'
              aria-label='Nazad na novosti'
            >
              <ChevronLeft className='text-foreground size-8 md:size-10' />
            </Link>
            <h1 className='absolute left-1/2 -translate-x-1/2 whitespace-nowrap'>
              Sve novosti
            </h1>
          </div>

          {allNews.length === 0 ?
            <div className='flex flex-col items-center justify-center gap-4 py-12'>
              <p className='text-foreground text-center text-xl md:text-2xl'>
                Trenutno nema novih članaka.
              </p>
              <p className='text-foreground text-center text-base md:text-lg'>
                Proverite kasnije za najnovije vesti.
              </p>
            </div>
          : <div className='flex flex-col gap-3 md:gap-6'>
              {allNews.map(article => (
                <NewsArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  date={article.date}
                  image={article.image}
                />
              ))}
            </div>
          }
        </section>
      </main>
    </ViewTransition>
  );
}
