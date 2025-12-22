import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { getBlogPostById, getBlogPostIds } from '@/domain/blog/blog';
import { redirect } from 'next/navigation';
import { BLUR_DATA_URL } from '@/lib/image-utils';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    return {
      title: 'Blog',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const ids = await getBlogPostIds();
  return ids.map(id => ({ id }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    redirect('/blog');
  }

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8 lg:gap-20 lg:py-12 xl:flex-row xl:items-start'>
        <section className='relative h-120 min-w-full sm:h-110 sm:min-w-110 md:h-147 md:min-w-130'>
          <Link
            href='/blog'
            className='absolute top-3 left-3 z-10 transition-transform hover:scale-110'
            aria-label='Nazad na blog'
          >
            <ChevronLeft className='text-foreground size-8 md:size-10' />
          </Link>

          <ViewTransition name={`blog-image-${post.id}`}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='object-cover'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 440px, 520px'
              priority
              placeholder='blur'
              blurDataURL={BLUR_DATA_URL}
            />
          </ViewTransition>
        </section>

        <section className='flex w-full flex-col gap-8 lg:gap-12'>
          <div className='flex flex-col gap-4'>
            <ViewTransition>
              <h1>{post.title}</h1>
            </ViewTransition>
            <ViewTransition>
              <p className='text-foreground text-center text-xl'>
                {post.subtitle}
              </p>
            </ViewTransition>
            <ViewTransition>
              <p className='text-foreground text-center text-xl'>
                {post.author}
              </p>
            </ViewTransition>
            <ViewTransition>
              <p className='text-foreground text-center text-xl'>{post.date}</p>
            </ViewTransition>
          </div>
          <ViewTransition>
            <p className='text-foreground flex flex-col gap-8 text-center text-xl lg:gap-12'>
              {post.content}
            </p>
          </ViewTransition>
        </section>
      </main>
    </ViewTransition>
  );
}
