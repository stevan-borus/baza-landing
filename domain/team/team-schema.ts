import { JSX } from 'react';
import { z } from 'zod';

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string(),
  imagePosition: z.string().optional(),
  excerpt: z.string(),
});

export interface TeamMember extends z.infer<typeof teamMemberSchema> {
  description: JSX.Element;
}
