import { z } from 'zod';
import { router, publicProcedure, adminProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';

export const content = router({
  updateManyConfig: adminProcedure
    .input(
      z.object({
        formValues: z.any(),
        defaultValues: z.any(),
        locale: z.string().min(2).max(2),
        message: z.any(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { formValues, defaultValues, locale, message } = input;

      const updates = Object.keys(formValues)
        .filter(
          (key) =>
            JSON.stringify(formValues[key]) !==
            JSON.stringify(defaultValues[key])
        )
        .map((key) => ({
          id: message[key].id,
          content: formValues[key],
        }));

      if (updates.length === 0)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No changes detected',
        });

      const contentUpdates = updates.map(({ id, content }) =>
        ctx.db.content.update({
          where: {
            id,
          },
          data: {
            content,
          },
        })
      );

      try {
        await Promise.all(contentUpdates);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update content',
        });
      }
    }),
});
