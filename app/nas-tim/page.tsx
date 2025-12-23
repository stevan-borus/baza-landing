import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { getTeamMembers } from '@/domain/team/team';
import { TeamMemberCard } from '@/components/team-member-card';

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
              <TeamMemberCard
                key={member.id}
                id={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
                imagePosition={member.imagePosition}
              />
            ))}
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
