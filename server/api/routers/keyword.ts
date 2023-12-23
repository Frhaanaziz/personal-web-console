import { z } from 'zod';
import { router, privateProcedure, adminProcedure } from '@/server/api/trpc';
import { getPaginatedResult } from '@/lib/utils';
import { TRPCError } from '@trpc/server';
import {
  newKeywordSchema,
  updateKeywordSchema,
} from '@/lib/validators/keyword';
import { languageOptions } from '@/lib/constant';

export const keyword = router({
  getAll: privateProcedure
    .input(z.object({ page: z.coerce.number() }))
    .query(async ({ input }) => {
      try {
        return await getPaginatedResult(input.page, 'keyword');
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get keywords',
        });
      }
    }),

  getById: privateProcedure.input(z.string()).query(async ({ input, ctx }) => {
    try {
      const keyword = await ctx.db.keyword.findUnique({
        where: {
          id: input,
        },
      });
      if (!keyword)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Keyword not found',
        });

      return keyword;
    } catch (error) {
      throw error;
    }
  }),

  getByGroup: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.db.keyword.findMany({
          where: {
            group: input,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to get keywords by group ${input}`,
        });
      }
    }),

  add: adminProcedure
    .input(newKeywordSchema)
    .mutation(async ({ input, ctx }) => {
      //   for (const [key, value] of Object.entries(inputObj)) {
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

  update: adminProcedure
    .input(updateKeywordSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Update keyword
        const keyword = await ctx.db.keyword.update({
          where: {
            id: input.id,
          },
          data: {
            keyword: input.keyword,
            group: input.group,
          },
        });

        return keyword;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update keyword',
        });
      }
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    try {
      await ctx.db.keyword.delete({
        where: {
          id: input,
        },
      });

      return true;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete keyword',
      });
    }
  }),
});
