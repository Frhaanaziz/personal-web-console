import { z } from 'zod';

export const newKeywordSchema = z.object({
  keyword: z
    .string()
    .min(1, { message: 'Keyword must be at least 1 character long.' }),
  group: z
    .string()
    .min(1, { message: 'Group must be at least 1 character long.' }),
  content: z
    .string()
    .min(1, { message: 'Content must be at least 1 character long.' }),
});

export const updateKeywordSchema = z.object({
  id: z.string().cuid({ message: 'Invalid keyword id.' }),
  keyword: z
    .string()
    .min(1, { message: 'Keyword must be at least 1 character long.' }),
  group: z
    .string()
    .min(1, { message: 'Group must be at least 1 character long.' }),
});
