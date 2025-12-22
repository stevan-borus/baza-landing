import { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getTeamMembers } from '@/domain/team/team';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Naš tim',
  description:
    'Upoznajte naš tim iskusnih instruktora i saradnika u BAZA pilates studiju.',
};

export default async function Team() {
  const team = await getTeamMembers();

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Naš tim</h1>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {team.map(member => (
              <Link
                key={member.id}
                href={`/nas-tim/${member.id}`}
                className='group custom-card relative h-93 overflow-hidden sm:h-116'
              >
                <ViewTransition name={`team-image-${member.id}`}>
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </ViewTransition>
                <div className='absolute right-0 bottom-0 left-0 flex items-center justify-between rounded-br-[50px] bg-white px-5 py-1 pr-8 sm:py-3 sm:pr-5'>
                  <div className='flex flex-col'>
                    <h2 className='group-hover:text-brand-light transition-colors'>
                      {member.name}
                    </h2>
                    <p className='text-foreground group-hover:text-brand text-lg transition-colors'>
                      {member.role}
                    </p>
                  </div>
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
