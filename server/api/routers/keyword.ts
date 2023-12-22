import { z } from 'zod';
import { router, privateProcedure, adminProcedure } from '@/server/api/trpc';
import { getPaginatedResult } from '@/lib/utils';
import { TRPCError } from '@trpc/server';
import { newKeywordSchema } from '@/lib/validators/keyword';
import { languageOptions } from '@/lib/constant';

export const keyword = router({
  getAll: privateProcedure
    .input(z.object({ page: z.coerce.number() }))
    .query(async ({ input }) => {
      try {
        return await getPaginatedResult(input.page, 'keyword');
      } catch (error) {
        // throw error;
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get keywords',
        });
      }
    }),

  add: adminProcedure
    .input(newKeywordSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Create keyword
        const keyword = await ctx.db.keyword.create({
          data: {
            keyword: input.keyword,
            group: input.group,
          },
        });

        // Create content for each language
        await ctx.db.content.createMany({
          data: languageOptions.map((option) => ({
            locale: option.value,
            content: input.content,
            keywordId: keyword.id,
          })),
        });

        return keyword;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create keyword',
        });
      }
    }),
});
