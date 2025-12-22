import { ViewTransition } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/domain/blog/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dobrodošli na mesto gde briga o zdravlju postaje inspiracija.',
};

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  if (blogPosts.length === 0) {
    return (
      <ViewTransition>
        <main className='flex flex-1 flex-col justify-center gap-8 xl:gap-12'>
          <section className='relative h-120 w-full 2xl:h-150'>
            <OptimizedImage
              src='/blog-banner.webp'
              alt='Blog'
              fill
              className='object-cover'
              sizes='100vw'
              loading='eager'
            />
          </section>
          <section className='flex flex-col gap-8 px-4 py-8 xl:gap-12 xl:px-20 xl:py-12'>
            <div className='relative flex items-center justify-center'>
              <h1 className='whitespace-nowrap'>Blog</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-4 py-12'>
              <p className='text-foreground text-center text-xl md:text-2xl'>
                Trenutno nema novih članaka.
              </p>
              <p className='text-foreground text-center text-base md:text-lg'>
                Proverite kasnije za najnovije članke.
              </p>
            </div>
          </section>
        </main>
      </ViewTransition>
    );
  }

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 xl:gap-12'>
        <section className='relative h-120 w-full 2xl:h-150'>
          <OptimizedImage
            src='/blog-banner.webp'
            alt='Blog'
            fill
            className='object-cover'
            sizes='100vw'
            loading='eager'
          />
        </section>

        <section className='flex flex-col gap-8 px-4 py-8 xl:gap-12 xl:px-20 xl:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Blog</h1>
          </div>

          <div className='flex flex-col gap-8 text-center text-xl lg:gap-12'>
            <p>Dobrodošli na mesto gde briga o zdravlju postaje inspiracija.</p>
            <p>
              Ovde ćete pronaći stručne, ali tople i razumljive savete o razvoju
              dece, ishrani, pokretu, oporavku i aktivnom životu.
            </p>
            <p>
              Pisano iz srca, podržano strukom, namenjeno svakome ko želi da
              živi bolje.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:mx-auto xl:grid-cols-2 xl:gap-6'>
            {blogPosts.map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className='group custom-card flex h-45 overflow-hidden sm:h-40 md:h-50'
              >
                <ViewTransition name={`blog-image-${post.id}`}>
                  <div className='relative h-full w-40 shrink-0 md:w-50'>
                    <OptimizedImage
                      src={post.image}
                      alt={post.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 160px, 200px'
                    />
                  </div>
                </ViewTransition>
                <div className='flex flex-1 flex-col justify-between gap-2 bg-white px-4 py-3 md:px-8 md:py-4'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-foreground group-hover:text-brand text-left text-xs transition-colors md:text-lg'>
                        {post.author}
                      </p>
                      <p className='text-foreground group-hover:text-brand text-left text-sm transition-colors md:text-base'>
                        {post.subtitle}
                      </p>
                    </div>
                    <h3 className='group-hover:text-brand-light text-left text-base transition-colors md:text-2xl'>
                      {post.title}
                    </h3>
                  </div>
                  <span className='text-foreground group-hover:text-brand-light text-sm font-light transition-colors md:text-base'>
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
