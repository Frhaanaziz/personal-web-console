import { z } from 'zod';
import { publicProcedure, router } from '@/server/trpc';

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
  hello: publicProcedure.query(({ input }) => {
    return 'Hello';
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
