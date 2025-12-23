import { ViewTransition } from 'react';
import { OptimizedImage } from '@/components/optimized-image';
import type { Metadata } from 'next';
import { getBlogPosts } from '@/domain/blog/blog';
import { BlogPostCard } from '@/components/blog-post-card';

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
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                subtitle={post.subtitle}
                author={post.author}
                date={post.date}
                image={post.image}
              />
            ))}
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
