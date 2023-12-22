import { router } from '@/server/api/trpc';
import { auth } from '@/server/api/routers/auth';

export const appRouter = router({
  auth,
});

export type AppRouter = typeof appRouter;
