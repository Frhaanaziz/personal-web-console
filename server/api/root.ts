import { router } from '@/server/api/trpc';
import { auth } from '@/server/api/routers/auth';
import { keyword } from './routers/keyword';
import { content } from './routers/content';

export const appRouter = router({
  auth,
  keyword,
  content,
});

export type AppRouter = typeof appRouter;
