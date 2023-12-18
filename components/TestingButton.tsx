'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { deleteAllUsersAction, signUpAction } from '@/app/_actions/auth';

const TestingButton = () => {
  return (
    <>
      <Button onClick={() => signOut()}>Sign out</Button>

      <Button
        onClick={async () => {
          try {
            await signUpAction({
              email: 'jokowi@gmail.com',
              password: 'admin123',
              role: 'admin',
            });
            console.log('success');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Register Jokowi
      </Button>

      <Button
        onClick={async () => {
          try {
            await signUpAction({
              email: 'user@gmail.com',
              password: 'user123',
            });
            console.log('success');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Register user
      </Button>

      <Button
        onClick={async () => {
          try {
            await deleteAllUsersAction();
            console.log('success');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Delete all user
      </Button>
    </>
  );
};

export default TestingButton;
