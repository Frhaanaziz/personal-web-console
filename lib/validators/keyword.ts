import { z } from 'zod';

export const newKeywordSchema = z.object({
  keyword: z.string().min(1),
  group: z.string().min(1),
  content: z.string().min(1),
});
