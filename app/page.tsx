import { auth } from '@/auth';
import { signUpAction } from './_actions/auth';
import { getSession, useSession } from 'next-auth/react';

export default async function Home() {
  return (
    <main className="">
      {/* <button
        onClick={async () => {
          try {
            await signUpAction({
              email: 'jokowi@gmail.com',
              password: 'admin123',
            });
            console.log('success');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Register Jokowi
      </button> */}
    </main>
  );
}
