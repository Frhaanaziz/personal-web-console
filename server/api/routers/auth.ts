import { z } from 'zod';
import { router, publicProcedure } from '@/server/api/trpc';
import { createAccessToken, getErrorMessage } from '@/lib/utils';
import { TRPCError } from '@trpc/server';

export const auth = router({
  googleLogin: publicProcedure
    .input(z.any())
    .mutation(async ({ input, ctx }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: {
            email: input.data.email,
          },
        });

        let accessToken;

        if (!user) {
          const user = await ctx.db.user.create(input);
          accessToken = createAccessToken({ userId: user.id, role: user.role });

          return { accessToken, user };
        } else {
          accessToken = createAccessToken({ userId: user.id, role: user.role });
          return { accessToken, user };
        }
      } catch (error) {
        // throw error;
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to login',
        });
      }
    }),
});
