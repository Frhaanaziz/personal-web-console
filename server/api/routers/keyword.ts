import { z } from 'zod';
import { router, privateProcedure, adminProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import {
  newKeywordSchema,
  updateKeywordSchema,
} from '@/lib/validators/keyword';
import { languageOptions } from '@/lib/constant';
import { getBackendApi } from '@/lib/axios';

export const keyword = router({
  getAll: privateProcedure
    .input(z.object({ page: z.coerce.number() }))
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken as string;

      try {
        const result = await getBackendApi(accessToken, {
          page: input.page,
        }).get('/keywords');

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get keywords',
        });
      }
    }),

  getById: privateProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const accessToken = ctx.session.accessToken as string;

    try {
      const result = await getBackendApi(accessToken).get(`/keywords/${input}`);

      return result.data;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Keyword not found',
      });
    }
  }),

  getByGroupAndLocale: privateProcedure
    .input(z.object({ group: z.string(), locale: z.string() }))
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken as string;

      try {
        const { data: keywords } = await getBackendApi(accessToken, {
          group: input.group,
          locale: input.locale,
        }).get('/keywords');

        const message = keywords.reduce((acc: any, item: any) => {
          const { keyword, Content, id } = item;
          if (Content[0]) {
            acc[keyword] = { id: Content[0].id, content: Content[0].content };
          }
          return acc;
        }, {} as Record<string, { id: string; content: string }>);

        return message;
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
      const accessToken = ctx.session.accessToken as string;

      try {
        // Create keyword
        const { data: keyword } = await getBackendApi(accessToken).post(
          '/keywords',
          {
            keyword: input.keyword,
            group: input.group,
          }
        );

        // Create content for each language
        await Promise.all(
          languageOptions.map((option) =>
            getBackendApi(accessToken).post('/contents', {
              locale: option.value,
              content: input.content,
              keywordId: keyword.id,
            })
          )
        );

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
      const accessToken = ctx.session.accessToken as string;

      try {
        // Update keyword
        const { data: keyword } = await getBackendApi(accessToken).patch(
          `/keywords/${input.id}`,
          {
            keyword: input.keyword,
            group: input.group,
          }
        );

        return keyword;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update keyword',
        });
      }
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const accessToken = ctx.session.accessToken as string;

    try {
      await getBackendApi(accessToken).delete(`/keywords/${input}`);

      return true;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete keyword',
      });
    }
  }),
});
