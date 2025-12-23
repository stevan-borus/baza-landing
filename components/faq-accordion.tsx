'use client';

import { Accordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import posthog from 'posthog-js';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const handleAccordionChange = (openItems: string[]) => {
    // Track when items are expanded (not collapsed)
    openItems.forEach(item => {
      const index = parseInt(item.replace('item-', ''), 10);
      const faq = faqs[index];
      if (faq) {
        posthog.capture('faq_expanded', {
          question: faq.question,
          question_index: index,
        });
      }
    });
  };

  return (
    <Accordion.Root className='space-y-4' onValueChange={handleAccordionChange}>
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
  );
}
