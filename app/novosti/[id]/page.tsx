import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { getNewsArticleById, getNewsArticleIds } from '@/domain/news/news';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsArticleById(id);

  if (!article) {
    return {
      title: 'Novost',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  const ids = await getNewsArticleIds();
  return ids.map(id => ({ id }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getNewsArticleById(id);

  if (!article) {
    redirect('/novosti');
  }

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col items-start justify-center gap-8 px-4 py-8 lg:gap-20 lg:py-12 xl:flex-row'>
        <section className='relative h-120 min-w-full sm:h-110 sm:min-w-110 md:h-147 md:min-w-130'>
          <Link
            href='/novosti'
            className='absolute top-3 left-3 z-10 transition-transform hover:scale-110'
            aria-label='Nazad na novosti'
          >
            <ChevronLeft className='text-foreground size-8 md:size-10' />
          </Link>

          <ViewTransition name={`news-image-${article.id}`}>
            <Image
              src={article.image}
              alt={article.title}
              fill
              className='object-cover'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 440px, 520px'
              priority
            />
          </ViewTransition>
        </section>

        <section className='flex w-full flex-col gap-8 lg:gap-12'>
          <div className='flex flex-col gap-4'>
            <ViewTransition>
              <h1>{article.title}</h1>
            </ViewTransition>
            <ViewTransition>
              <p className='text-foreground text-center text-xl'>
                {article.date}
              </p>
            </ViewTransition>
          </div>
          <ViewTransition>
            <p className='text-foreground flex flex-col gap-8 text-center text-xl lg:gap-12'>
              {article.content}
            </p>
          </ViewTransition>
        </section>
      </main>
    </ViewTransition>
  );
}
