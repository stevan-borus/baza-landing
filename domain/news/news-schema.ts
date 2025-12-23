import { z } from 'zod';

export const newsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  image: z.string(),
});

export interface NewsArticle extends z.infer<typeof newsArticleSchema> {
  content: React.ReactNode;
}
