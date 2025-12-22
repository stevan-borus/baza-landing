import { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getNewsArticles } from '@/domain/news/news';

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
                <Link
                  key={article.id}
                  href={`/novosti/${article.id}`}
                  className='group custom-card flex overflow-hidden'
                >
                  <ViewTransition name={`news-image-${article.id}`}>
                    <div className='relative h-22 w-30 shrink-0 md:h-42 md:w-69'>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </ViewTransition>
                  <div className='flex flex-1 flex-col justify-between gap-2 bg-white px-4 py-3 md:px-8 md:py-4'>
                    <h3 className='group-hover:text-brand-light text-left text-base transition-colors md:text-3xl'>
                      {article.title}
                    </h3>
                    <span className='text-foreground group-hover:text-brand-light text-sm font-light transition-colors md:text-xl'>
                      {article.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          }
        </section>
      </main>
    </ViewTransition>
  );
}
