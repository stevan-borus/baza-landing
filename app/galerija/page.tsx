import { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getGalleryImages } from '@/domain/gallery/gallery';

export const dynamic = 'force-static';

export default async function Gallery() {
  const images = await getGalleryImages();

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 pt-8 lg:gap-12 lg:pt-12'>
          <h1>Galerija</h1>
        </section>

        <section className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
          <div className='grid grid-cols-3 lg:grid-cols-4'>
            {images.map(image => (
              <Link
                key={image.id}
                href={`/galerija/${image.id}`}
                className='group relative aspect-square cursor-pointer overflow-hidden'
              >
                <ViewTransition name={`gallery-image-${image.id}`}>
                  <Image
                    src={image.src || '/placeholder.svg'}
                    alt={image.alt}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-110'
                    sizes='(max-width: 1024px) 33vw, 25vw'
                  />
                </ViewTransition>
                <div className='bg-brand/0 group-hover:bg-brand/20 absolute inset-0 transition-colors duration-300' />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
