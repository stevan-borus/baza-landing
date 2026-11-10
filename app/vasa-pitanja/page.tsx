import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import { getFAQs } from '@/domain/faq/faq';
import { FAQAccordion } from '@/components/faq-accordion';
import { JsonLd } from '@/components/json-ld';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Vaša pitanja',
  description: 'Najčešća pitanja o reformer pilatesu i našim programima.',
  alternates: {
    canonical: '/vasa-pitanja',
  },
};

export default async function FAQ() {
  const faqs = await getFAQs();
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Vaša pitanja</h1>
          </div>

          <FAQAccordion faqs={faqs} />
          <JsonLd data={faqJsonLd} />
        </section>
      </main>
    </ViewTransition>
  );
}
