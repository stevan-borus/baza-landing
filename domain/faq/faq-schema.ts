import { z } from 'zod';

export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export type FAQItem = z.infer<typeof faqItemSchema>;

