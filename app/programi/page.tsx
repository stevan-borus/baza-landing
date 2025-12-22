import { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getProgrammes } from '@/domain/programmes/programmes';
import { cn } from '@/lib/utils';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Programi',
  description:
    'Istražite naše raznovrsne pilates programe prilagođene različitim nivoima i potrebama.',
};

export default async function Programmes() {
  const programmes = await getProgrammes();

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Programi</h1>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {programmes.map(programme => (
              <Link
                key={programme.id}
                href={`/programi/${programme.id}`}
                className='group custom-card relative h-45 overflow-hidden sm:h-100'
              >
                <ViewTransition name={`programme-image-${programme.id}`}>
                  <Image
                    src={programme.image}
                    alt={programme.title}
                    fill
                    className={cn('object-cover', programme.imagePosition)}
                  />
                </ViewTransition>
                <div className='absolute right-0 bottom-0 left-0 flex items-center justify-between rounded-br-[50px] bg-white px-5 py-1 pr-8 sm:py-3 sm:pr-5'>
                  <ViewTransition>
                    <h2 className='group-hover:text-brand-light transition-colors'>
                      {programme.title}
                    </h2>
                  </ViewTransition>
                  <ArrowRight
                    strokeWidth={3}
                    className='text-foreground h-5 w-5'
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
