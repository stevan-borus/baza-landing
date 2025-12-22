import { ViewTransition } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image';
import type { Metadata } from 'next';
import { getNewsArticles } from '@/domain/news/news';

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
            <Link
              href={`/novosti/${featured.id}`}
              className='group custom-card relative h-fit overflow-hidden'
            >
              <ViewTransition name={`news-image-${featured.id}`}>
                <div className='relative h-46 w-full md:h-83'>
                  <OptimizedImage
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className='rounded-br-[50.5px] object-cover'
                    sizes='(max-width: 1280px) 100vw, 50vw'
                  />
                </div>
              </ViewTransition>
              <div className='flex flex-col gap-4 bg-white/90 p-6 group-hover:bg-white'>
                <h1 className='group-hover:text-brand-light text-left transition-colors'>
                  {featured.title}
                </h1>
                <p className='text-foreground group-hover:text-brand text-left text-base transition-colors md:text-2xl'>
                  {featured.excerpt}
                </p>
                <span className='text-foreground group-hover:text-brand-light text-sm font-light transition-colors md:text-xl'>
                  {featured.date}
                </span>
              </div>
            </Link>

            <div className='flex flex-col gap-3 md:gap-6'>
              {otherNews.map(article => (
                <Link
                  key={article.id}
                  href={`/novosti/${article.id}`}
                  className='group custom-card flex overflow-hidden'
                >
                  <ViewTransition name={`news-image-${article.id}`}>
                    <div className='relative h-22 w-30 shrink-0 md:h-42 md:w-69'>
                      <OptimizedImage
                        src={article.image}
                        alt={article.title}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 120px, 276px'
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
