import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { getProgrammes } from '@/domain/programmes/programmes';
import { ProgrammeCard } from '@/components/programme-card';

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
              <ProgrammeCard
                key={programme.id}
                id={programme.id}
                title={programme.title}
                image={programme.image}
                imagePosition={programme.imagePosition}
              />
            ))}
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
