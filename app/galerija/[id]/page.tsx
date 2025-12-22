import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewTransition } from 'react';
import { getGalleryImageIds, getGalleryImages } from '@/domain/gallery/gallery';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const ids = await getGalleryImageIds();
  return ids.map(id => ({ id }));
}

export default async function GalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allImages = await getGalleryImages();
  const currentImage = allImages.find(img => img.id === id);

  if (!currentImage) {
    redirect('/galerija');
  }

  const currentIndex = allImages.findIndex(img => img.id === id);
  const previousImage = currentIndex > 0 ? allImages[currentIndex - 1] : null;
  const nextImage =
    currentIndex < allImages.length - 1 ? allImages[currentIndex + 1] : null;

  return (
    <ViewTransition>
      <main className='relative flex min-h-svh flex-col'>
        {/* Gallery container - fits within 100vh */}
        <div className='relative flex h-svh flex-col'>
          {/* Back button */}
          <Link
            href='/galerija'
            className='absolute top-3 left-3 z-20 transition-transform hover:scale-110'
            aria-label='Nazad na galeriju'
          >
            <ChevronLeft className='text-foreground size-8 md:size-10' />
          </Link>

          {/* Main image */}
          <div className='relative flex h-[calc(100svh-240px)] overflow-hidden'>
            <ViewTransition name={`gallery-image-${currentImage.id}`}>
              <div className='relative h-full w-full'>
                <Image
                  src={currentImage.src || '/placeholder.svg'}
                  alt={currentImage.alt}
                  fill
                  className='object-cover'
                  sizes='100vw'
                  priority
                />
              </div>
            </ViewTransition>
          </div>

          {/* Thumbnails */}
          <div className='relative flex w-full shrink-0 items-center justify-center gap-2 px-4 pt-8 md:px-20 md:pt-12'>
            {/* Previous button */}
            {previousImage && (
              <Link
                href={`/galerija/${previousImage.id}`}
                className='bg-brand/80 text-brand-foreground hover:bg-brand z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors md:h-12 md:w-12'
                aria-label='Prethodna slika'
              >
                <ChevronLeft className='size-6 md:size-8' />
              </Link>
            )}

            <div className='flex w-full items-center justify-center gap-2 overflow-x-auto'>
              {allImages.map(image => {
                const isCurrentImage = image.id === currentImage.id;
                return (
                  <Link
                    key={image.id}
                    href={`/galerija/${image.id}`}
                    className={`relative aspect-square shrink-0 overflow-hidden rounded-lg transition-all ${
                      isCurrentImage ? 'h-28' : (
                        'h-24 opacity-60 hover:opacity-100'
                      )
                    }`}
                  >
                    {isCurrentImage ?
                      <Image
                        src={image.src || '/placeholder.svg'}
                        alt={image.alt}
                        fill
                        className='object-cover'
                        sizes='112px'
                      />
                    : <ViewTransition name={`gallery-image-${image.id}`}>
                        <Image
                          src={image.src || '/placeholder.svg'}
                          alt={image.alt}
                          fill
                          className='object-cover'
                          sizes='96px'
                        />
                      </ViewTransition>
                    }
                  </Link>
                );
              })}
            </div>

            <Link
              href={`/galerija/${nextImage?.id}`}
              className='bg-brand/80 text-brand-foreground hover:bg-brand z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors md:h-12 md:w-12'
              aria-label='Sledeća slika'
              aria-disabled={!nextImage}
            >
              <ChevronRight className='size-6 md:size-8' />
            </Link>
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}
