'use client';

import { Button } from '@/components/button';

export function BookTrialButton({
  programmeId,
  programmeTitle,
}: {
  programmeId: string;
  programmeTitle: string;
}) {
  return (
    <Button
      href='/kontakt'
      className='text-lg lg:text-xl'
      trackEvent={{
        event: 'book_trial_clicked',
        properties: {
          programme_id: programmeId,
          programme_title: programmeTitle,
        },
      }}
    >
      Zakaži svoj BESPLATAN probni trening
    </Button>
  );
}

export function ContactUsButton({
  programmeId,
  programmeTitle,
  className,
}: {
  programmeId: string;
  programmeTitle: string;
  className?: string;
}) {
  return (
    <Button
      href='/kontakt'
      className={className}
      trackEvent={{
        event: 'contact_us_clicked',
        properties: {
          programme_id: programmeId,
          programme_title: programmeTitle,
          inquiry_type: 'duo_personal',
        },
      }}
    >
      Kontaktiraj nas
    </Button>
  );
}
