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
import {
  BookTrialButton,
  ContactUsButton,
} from '@/components/programme-cta-buttons';

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

  // The qualifier is split out for typesetting, but search results still want
  // the full name.
  const fullTitle =
    programme.subtitle ?
      `${programme.title} ${programme.subtitle}`
    : programme.title;

  return {
    title: fullTitle,
    description:
      programme.excerpt ||
      `Saznajte više o ${fullTitle} programu u BAZA pilates studiju.`,
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
            <h1>
              {programme.title}
              {programme.subtitle && (
                <span className='block text-xl font-normal lg:text-3xl'>
                  {programme.subtitle}
                </span>
              )}
            </h1>
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
              // Rows are keyed by start time rather than by position, so a day
              // missing a slot leaves a gap in place instead of shifting every
              // later slot up a row and misaligning the column.
              const rowTimeSlots = [
                ...new Set(scheduleItem.days.flatMap(day => day.timeSlots)),
              ].sort();

              // Aligning by time only earns its keep once some day runs more
              // than one slot, since that is the only way a column can shift
              // out of step. When every day holds a single slot, keying by
              // time would instead scatter them down a mostly empty diagonal,
              // so pack them into one row.
              const maxSlotsPerDay = Math.max(
                ...scheduleItem.days.map(day => day.timeSlots.length),
              );
              const alignByTimeSlot = maxSlotsPerDay > 1;
              const rowCount =
                alignByTimeSlot ? rowTimeSlots.length : maxSlotsPerDay;

              return (
                <div
                  key={index}
                  className='flex flex-col gap-6 overflow-hidden'
                >
                  <div className='bg-background text-center'>
                    <h3 className='text-brand text-xl font-bold lg:text-3xl'>
                      {scheduleItem.frequency}
                    </h3>
                  </div>

                  {/* Below lg the grid runs out of room — four Serbian day
                      names cannot fit a phone without clipping — so the same
                      schedule reads as a list of sessions instead, one line
                      per day. */}
                  <div className='flex flex-col overflow-hidden rounded-tl-[50px] rounded-br-[50px] lg:hidden'>
                    {scheduleItem.days.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={dayIndex % 2 === 0 ? 'bg-card' : 'bg-muted'}
                      >
                        <div
                          className={cn(
                            'border-border mx-4 flex items-baseline justify-between gap-4 py-3',
                            dayIndex < scheduleItem.days.length - 1 &&
                              'border-b',
                          )}
                        >
                          <span className='text-brand shrink-0 text-base font-bold'>
                            {day.day}
                          </span>
                          {/* Each slot is its own cell so a time never breaks
                              across two lines the way a comma-joined string
                              does once a day runs eight of them. */}
                          <span className='flex flex-wrap justify-end gap-x-3 gap-y-1'>
                            {day.timeSlots.map(timeSlot => (
                              <span
                                key={timeSlot}
                                className='text-foreground text-base whitespace-nowrap tabular-nums'
                              >
                                {timeSlot}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className='bg-brand-light text-brand-foreground px-4 py-3 text-center text-lg font-bold'>
                      {scheduleItem.terms} termina: {scheduleItem.price}
                    </div>
                  </div>

                  <div className='hidden justify-center overflow-x-auto lg:flex'>
                    <table>
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

                      <tbody>
                        {Array.from({ length: rowCount }, (_, rowIndex) => (
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
                                className='border-border text-foreground border p-2 text-center text-sm lg:text-2xl'
                              >
                                {alignByTimeSlot ?
                                  (
                                    day.timeSlots.includes(
                                      rowTimeSlots[rowIndex],
                                    )
                                  ) ?
                                    rowTimeSlots[rowIndex]
                                  : ''
                                : (day.timeSlots[rowIndex] ?? '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>

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
            <BookTrialButton
              programmeId={programme.id}
              programmeTitle={programme.title}
            />
          </div>
          {programme.id !== 'moms-minis' && (
            <div className='bg-card flex max-w-275 flex-col items-center justify-center gap-6 rounded-lg p-3 lg:flex-row lg:gap-8 lg:px-20 lg:py-12'>
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
                  <ContactUsButton
                    programmeId={programme.id}
                    programmeTitle={programme.title}
                    className='w-full sm:w-75'
                  />
                </div>
              </div>

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
                  <ContactUsButton
                    programmeId={programme.id}
                    programmeTitle={programme.title}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </ViewTransition>
  );
}
