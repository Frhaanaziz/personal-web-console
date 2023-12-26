import { router } from '@/server/api/trpc';
import { keyword } from './routers/keyword';
import { content } from './routers/content';

export const appRouter = router({
  keyword,
  content,
});

export type AppRouter = typeof appRouter;
