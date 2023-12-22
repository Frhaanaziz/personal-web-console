import { auth } from '@/server/auth';
import { TRPCError, initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { Session } from 'next-auth';
import { checkAccessToken, checkSession } from '@/lib/utils';
import { db } from '../db';
import { useSession } from 'next-auth/react';
import superjson from 'superjson';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (
    !ctx.session ||
    !ctx.session.user ||
    !ctx.session.data ||
    !ctx.session.accessToken
  )
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authorized' });

  const isAunthenticated = checkAccessToken(ctx.session.accessToken as string);
  if (!isAunthenticated)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid access token',
    });

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {
        ...ctx.session,
        user: ctx.session.user,
        data: ctx.session.data,
        accessToken: ctx.session.accessToken,
      },
    },
  });
});

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  const session = (await auth()) as Session | null;

  if (session?.data?.role !== 'admin') {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authorized' });
  }

  return next();
});

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(enforceUserIsAuthed);
export const adminProcedure = t.procedure
  .use(enforceUserIsAuthed)
  .use(enforceUserIsAdmin);

export const router = t.router;
export const middleware = t.middleware;
