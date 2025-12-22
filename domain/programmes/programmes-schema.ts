import { z } from 'zod';
import { ReactNode } from 'react';

export const programmeScheduleDaySchema = z.object({
  day: z.string(),
  timeSlots: z.array(z.string()),
});

export const programmeScheduleItemSchema = z.object({
  frequency: z.string(),
  days: z.array(programmeScheduleDaySchema),
  terms: z.number(),
  price: z.string(),
});

export const programmeSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  mobileImage: z.string(),
  imagePosition: z.string(),
  schedule: z.array(programmeScheduleItemSchema),
  excerpt: z.string(),
});

export type ProgrammeScheduleDay = z.infer<typeof programmeScheduleDaySchema>;
export type ProgrammeScheduleItem = z.infer<typeof programmeScheduleItemSchema>;
export interface Programme extends z.infer<typeof programmeSchema> {
  description: ReactNode;
  additionalInfo?: ReactNode;
}
