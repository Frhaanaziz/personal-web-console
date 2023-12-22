import { appRouter } from '@/server/api/root';
import { httpBatchLink } from '@trpc/client';
import { headers } from 'next/headers';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`,
    }),
  ],
});
// export const serverClient = async () =>
//   appRouter.createCaller(await createTRPCContext());
