import { auth } from '@/server/auth';
import { TRPCError, initTRPC } from '@trpc/server';
import { db } from '../db';
import { ZodError } from 'zod';
import { Session } from 'next-auth';

const t = initTRPC.context().create({
  // transformer: superjson,
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

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await auth();

  if (!session || !session.user || !session.data || !session.accessToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {
        ...session,
        user: session.user,
        data: session.data,
        accessToken: session.accessToken,
      },
    },
  });
});

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  const session = (await auth()) as Session | null;

  if (session?.data?.role !== 'admin') {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Admins only' });
  }

  return next();
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const adminProcedure = t.procedure
  .use(enforceUserIsAuthed)
  .use(enforceUserIsAdmin);

export const router = t.router;
export const middleware = t.middleware;