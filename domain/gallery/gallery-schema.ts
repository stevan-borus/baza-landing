import { z } from 'zod';

export const galleryImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;
