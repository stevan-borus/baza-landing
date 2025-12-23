import { z } from 'zod';
import { ReactNode } from 'react';

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  author: z.string(),
  date: z.string(),
  image: z.string(),
  excerpt: z.string(),
});

export interface BlogPost extends z.infer<typeof blogPostSchema> {
  content: ReactNode;
}
