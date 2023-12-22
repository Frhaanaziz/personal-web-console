import { z } from 'zod';
import { router, privateProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { getErrorMessage, getPaginatedResult } from '@/lib/utils';
import { TRPCError } from '@trpc/server';

export const keyword = router({
  getAll: privateProcedure
    .input(z.object({ page: z.coerce.number().min(1) }))
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
});
