import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { getTeamMemberById, getTeamMemberIds } from '@/domain/team/team';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    return {
      title: 'Član tima',
    };
  }

  // Change last letter of first name to 'u' and include last name
  // Handle titles like "Dr" - if first part is a title, second part is first name
  const nameParts = member.name.split(' ');
  let title = '';
  let firstName = '';
  let lastName = '';

  // Check if first part is a title (like "Dr")
  if (nameParts[0] === 'Dr' || nameParts[0] === 'Dr.') {
    title = nameParts[0];
    firstName = nameParts[1];
    lastName = nameParts[2];
  } else {
    firstName = nameParts[0];
    lastName = nameParts[1];
  }

  const firstNameWithU = firstName.slice(0, -1) + 'u';
  const fullNameWithU = [title, firstNameWithU, lastName].join(' ');

  return {
    title: member.name,
    description:
      member.excerpt ||
      `Upoznajte ${fullNameWithU}, ${member.role} u BAZA pilates studiju.`,
  };
}

export async function generateStaticParams() {
  const ids = await getTeamMemberIds();
  return ids.map(id => ({ id }));
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    redirect('/nas-tim');
  }

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col items-start justify-center gap-8 px-4 py-8 lg:gap-20 lg:py-12 xl:flex-row'>
        <section className='relative h-120 min-w-full sm:h-110 sm:min-w-110 md:h-147 md:min-w-130'>
          <Link
            href='/nas-tim'
            className='absolute top-3 left-3 z-10 transition-transform hover:scale-110'
            aria-label='Nazad na naš tim'
          >
            <ChevronLeft className='text-foreground size-8 md:size-10' />
          </Link>

          <ViewTransition name={`team-image-${member.id}`}>
            <Image
              src={member.image}
              alt={member.name}
              fill
              className='object-cover'
            />
          </ViewTransition>
        </section>

        <section className='flex w-full flex-col gap-8 lg:gap-12'>
          <ViewTransition>
            <h1>{member.name}</h1>
          </ViewTransition>
          <ViewTransition>
            <p className='text-foreground flex flex-col gap-8 text-center text-xl lg:gap-12'>
              {member.description}
            </p>
          </ViewTransition>
        </section>
      </main>
    </ViewTransition>
  );
}
