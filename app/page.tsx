import { auth } from '@/auth';

import TestingButton from '@/components/TestingButton';

export default async function Home() {
  const session = await auth();
  // console.log(session);
  return (
    <main>
      <TestingButton />
    </main>
  );
}
