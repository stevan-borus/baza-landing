import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image';
import { ChevronLeft } from 'lucide-react';
import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import {
  getProgrammeById,
  getProgrammeIds,
} from '@/domain/programmes/programmes';
import { redirect } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/button';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const programme = await getProgrammeById(id);

  if (!programme) {
    return {
      title: 'Program',
    };
  }

  return {
    title: programme.title,
    description:
      programme.excerpt ||
      `Saznajte više o ${programme.title} programu u BAZA pilates studiju.`,
  };
}

export async function generateStaticParams() {
  const ids = await getProgrammeIds();
  return ids.map(id => ({ id }));
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const programme = await getProgrammeById(id);

  if (!programme) {
    redirect('/programi');
  }

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='relative h-120 w-full 2xl:h-150'>
          <Link
            href='/programi'
            className='absolute top-3 left-3 z-10 transition-transform hover:scale-110'
            aria-label='Nazad na programe'
          >
            <ChevronLeft className='text-foreground size-8 md:size-10' />
          </Link>

          <div className='lg:hidden'>
            <ViewTransition>
              <OptimizedImage
                src={programme.mobileImage}
                alt={programme.title}
                fill
                className={cn(
                  'object-cover lg:hidden',
                  programme.imagePosition,
                )}
                sizes='100vw'
                loading='eager'
              />
            </ViewTransition>
          </div>

          <div className='hidden lg:block'>
            <ViewTransition name={`programme-image-${programme.id}`}>
              <OptimizedImage
                src={programme.image}
                alt={programme.title}
                fill
                className={cn(
                  'hidden object-cover lg:block',
                  programme.imagePosition,
                )}
                sizes='100vw'
                loading='eager'
              />
            </ViewTransition>
          </div>
        </section>

        <section className='flex flex-col gap-8 px-4 lg:gap-12 lg:px-20'>
          <ViewTransition>
            <h1>{programme.title}</h1>
          </ViewTransition>
          <ViewTransition>
            <p className='text-foreground flex flex-col gap-8 text-center text-xl lg:gap-12'>
              {programme.description}
            </p>
          </ViewTransition>
        </section>

        <section className='flex flex-col gap-8 px-4 lg:gap-12 lg:px-20'>
          <h2>Termini i cenovnik</h2>

          <div className='flex flex-col gap-8'>
            {programme.schedule.map((scheduleItem, index) => {
              // Find the maximum number of time slots across all days
              const maxTimeSlots = Math.max(
                ...scheduleItem.days.map(day => day.timeSlots.length),
              );

              return (
                <div
                  key={index}
                  className='flex flex-col gap-6 overflow-hidden'
                >
                  {/* Frequency Label */}
                  <div className='bg-background text-center'>
                    <h3 className='text-brand text-xl font-bold lg:text-3xl'>
                      {scheduleItem.frequency}
                    </h3>
                  </div>

                  {/* Table */}
                  <div className='flex justify-center overflow-x-auto'>
                    <table>
                      {/* Header */}
                      <thead>
                        <tr>
                          {scheduleItem.days.map((day, dayIndex) => (
                            <th
                              key={dayIndex}
                              className={cn(
                                'bg-table-header text-brand-foreground px-4 py-2 text-center text-xl font-bold lg:px-25 lg:text-2xl',
                                dayIndex === 0 && 'rounded-tl-[50px]',
                              )}
                            >
                              {day.day}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      {/* Body */}
                      <tbody>
                        {Array.from({ length: maxTimeSlots }).map(
                          (_, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className={
                                rowIndex % 2 === 0 ?
                                  'bg-card'
                                : 'bg-muted rounded-br-[50px]'
                              }
                            >
                              {scheduleItem.days.map((day, dayIndex) => (
                                <td
                                  key={dayIndex}
                                  className='border-border text-foreground border p-2 text-center text-xl lg:text-2xl'
                                >
                                  {day.timeSlots[rowIndex] || ''}
                                </td>
                              ))}
                            </tr>
                          ),
                        )}
                      </tbody>

                      {/* Footer */}
                      <tfoot>
                        <tr>
                          <td
                            colSpan={scheduleItem.days.length}
                            className='bg-brand-light text-brand-foreground rounded-br-[50px] px-4 py-2 text-center text-xl font-bold lg:text-2xl'
                          >
                            {scheduleItem.terms} termina: {scheduleItem.price}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className='flex flex-col items-center justify-center gap-8 px-4 lg:gap-12 lg:px-18'>
          {programme.additionalInfo && (
            <div className='flex flex-col items-center justify-center gap-6'>
              <p className='text-foreground text-center text-lg'>
                {programme.additionalInfo}
              </p>
            </div>
          )}

          <div className='flex justify-center'>
            <Button href='/kontakt' className='text-lg lg:text-xl'>
              Zakaži svoj BESPLATAN probni trening
            </Button>
          </div>
          {programme.id !== 'moms-minis' && (
            <div className='bg-card flex max-w-275 flex-col items-center justify-center gap-6 rounded-lg p-3 lg:flex-row lg:gap-8 lg:px-20 lg:py-12'>
              {/* Mobile Layout: Text -> Pricing -> Button */}
              <div className='flex flex-col gap-6 lg:hidden'>
                <p className='text-foreground text-center text-lg'>
                  Za personalne i duo programe, slobodno nas kontaktirajte kako
                  bismo zajedno pronašli idealan termin.
                </p>

                <div className='flex gap-4'>
                  <div className='flex flex-1 flex-col items-center gap-2'>
                    <h3 className='text-brand text-lg font-bold'>DUO</h3>
                    <p className='text-foreground text-3xl font-bold'>12</p>
                    <p className='text-foreground text-base font-bold'>
                      TERMINA
                    </p>
                    <p className='text-foreground text-base'>23.000 RSD</p>
                  </div>

                  <div className='my-3 h-auto w-px bg-black' />

                  <div className='flex flex-1 flex-col items-center gap-2'>
                    <h3 className='text-brand text-lg font-bold'>PERSONALNI</h3>
                    <p className='text-foreground text-3xl font-bold'>12</p>
                    <p className='text-foreground text-base font-bold'>
                      TERMINA
                    </p>
                    <p className='text-foreground text-base'>30.000 RSD</p>
                  </div>
                </div>

                <div className='flex justify-center'>
                  <Button href='/kontakt' className='w-full sm:w-75'>
                    Kontaktiraj nas
                  </Button>
                </div>
              </div>

              {/* Desktop Layout: Pricing left, Contact right */}
              <div className='hidden flex-1 flex-col items-center justify-center gap-6 lg:flex lg:flex-row'>
                <div className='flex flex-1 flex-col gap-6 lg:flex-row'>
                  <div className='flex flex-1 flex-col items-center gap-3 lg:gap-6'>
                    <h3 className='text-brand text-xl font-bold lg:text-3xl'>
                      DUO
                    </h3>
                    <p className='text-foreground text-4xl font-bold lg:text-6xl'>
                      12
                    </p>
                    <p className='text-foreground text-xl lg:text-2xl'>
                      TERMINA
                    </p>
                    <p className='text-foreground text-xl lg:text-2xl'>
                      23.000 RSD
                    </p>
                  </div>

                  <div className='my-3 hidden h-auto w-px bg-black lg:block' />

                  <div className='flex flex-1 flex-col items-center gap-3 lg:gap-6'>
                    <h3 className='text-brand text-xl font-bold lg:text-2xl'>
                      PERSONALNI
                    </h3>
                    <p className='text-foreground text-4xl font-bold lg:text-6xl'>
                      12
                    </p>
                    <p className='text-foreground text-xl lg:text-2xl'>
                      TERMINA
                    </p>
                    <p className='text-foreground text-xl lg:text-2xl'>
                      30.000 RSD
                    </p>
                  </div>
                </div>

                <div className='flex flex-1 flex-col items-center justify-center gap-6 lg:gap-12'>
                  <p className='text-foreground text-center text-xl lg:text-3xl'>
                    Za personalne i duo programe, slobodno nas kontaktirajte
                    kako bismo zajedno pronašli idealan termin.
                  </p>
                  <Button href='/kontakt'>Kontaktiraj nas</Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </ViewTransition>
  );
}
