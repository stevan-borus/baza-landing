'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ViewTransition } from 'react';
import { useState } from 'react';
import { NewsThumbnails } from '@/components/news-thumbnails';
import { NewsImageDialog } from '@/components/news-image-dialog';
import { NewsArticle } from '@/domain/news/news-schema';

interface NewsArticlePageClientProps {
  article: NewsArticle;
}

export function NewsArticlePageClient({ article }: NewsArticlePageClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [article.image, ...article.gallery];

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setDialogOpen(true);
  };

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center'>
            <Link
              href='/novosti'
              className='size-8 transition-transform hover:scale-110 md:size-10'
              aria-label='Nazad na novosti'
            >
              <ChevronLeft className='text-foreground size-8 md:size-10' />
            </Link>
            <h1 className='flex-1'>{article.title}</h1>
            <div className='size-8 md:size-10' />
          </div>

          <ViewTransition>
            <p className='text-foreground text-center text-xl'>
              {article.date}
            </p>
          </ViewTransition>

          <ViewTransition>
            <p className='text-foreground flex flex-col gap-8 text-center text-xl lg:gap-12'>
              {article.content}
            </p>
          </ViewTransition>

          <div className='flex flex-col gap-4'>
            <div className='relative z-10 flex w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto scroll-smooth px-2'>
              {allImages.map((image, index) => {
                return (
                  <NewsThumbnails
                    key={index}
                    articleId={article.id}
                    index={index}
                    image={image}
                    onImageClick={handleThumbnailClick}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <NewsImageDialog
        images={allImages}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </ViewTransition>
  );
}
