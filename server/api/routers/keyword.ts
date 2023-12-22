import { z } from 'zod';
import { router, privateProcedure, adminProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { getErrorMessage, getPaginatedResult } from '@/lib/utils';
import { TRPCError } from '@trpc/server';
import { newKeywordSchema } from '@/lib/validators/keyword';

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
          message: getErrorMessage(error),
        });
      }
    }),

  // add: adminProcedure.input(newKeywordSchema).mutation(async ({ input }) => {
  add: privateProcedure.input(newKeywordSchema).mutation(async ({ input }) => {
    try {
      const keyword = await db.keyword.create({
        data: {
          keyword: input.keyword,
          group: input.group,
        },
      });
      return keyword;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage(error),
      });
    }
  }),
});
