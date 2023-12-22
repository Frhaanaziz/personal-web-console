import { router } from '@/server/api/trpc';
import { auth } from '@/server/api/routers/auth';
import { keyword } from './routers/keyword';

export const appRouter = router({
  auth,
  keyword,
});

export type AppRouter = typeof appRouter;
