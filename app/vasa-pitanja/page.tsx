import { ViewTransition } from 'react';
import { Accordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';
import { getFAQs } from '@/domain/faq/faq';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Vaša pitanja',
  description: 'Najčešća pitanja o reformer pilatesu i našim programima.',
};

export default async function FAQ() {
  const faqs = await getFAQs();

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Vaša pitanja</h1>
          </div>

          <Accordion.Root className='space-y-4'>
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} value={`item-${index}`}>
                <Accordion.Header>
                  <Accordion.Trigger className='group flex w-full items-center justify-between text-left transition-colors'>
                    <span className='text-foreground text-xl font-semibold'>
                      {faq.question}
                    </span>
                    <ChevronDown className='text-foreground h-5 w-5 transition-transform duration-200 group-data-panel-open:rotate-180' />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className='pt-2'>
                  <p className='text-foreground'>{faq.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </section>
      </main>
    </ViewTransition>
  );
}
