import { z } from 'zod';
import { router, privateProcedure, publicProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';
import { createAccessToken, getErrorMessage } from '@/lib/utils';
import { TRPCError } from '@trpc/server';

export const auth = router({
  googleLogin: publicProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const user = await db.user.findUnique({
        where: {
          email: input.data.email,
        },
      });

      let accessToken;

      if (!user) {
        const user = await db.user.create(input);
        accessToken = createAccessToken(user.id);

        return { accessToken, user };
      } else {
        accessToken = createAccessToken(user.id);
        return { accessToken, user };
      }
    } catch (error) {
      // throw error;
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: getErrorMessage(error),
      });
    }
  }),
});
