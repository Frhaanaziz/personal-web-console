import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';
import prisma from '@/prisma/db';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '@/lib/utils';

export const appRouter = router({
  //   hello: publicProcedure
  //     .input(
  //       z.object({
  //         text: z.string(),
  //       })
  //     )
  //     .query(({ input }) => {
  //       return {
  //         greeting: `hello ${input.text}`,
  //       };
  //     }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
