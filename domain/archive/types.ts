import { z } from 'zod';

export const ArchiveItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  type: z.string(),
});

export const ArchiveYearGroupSchema = z.object({
  year: z.string(),
  items: z.array(ArchiveItemSchema),
});

export type ArchiveItem = z.infer<typeof ArchiveItemSchema>;
export type ArchiveYearGroup = z.infer<typeof ArchiveYearGroupSchema>;
