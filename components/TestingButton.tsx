'use client';
import { signOut } from 'next-auth/react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const TestingButton = () => {
  return (
    <>
      <Button onClick={() => signOut()}>Sign out</Button>
      <Link className={buttonVariants()} href={'/auth/signin'}>
        Sign In
      </Link>
    </>
  );
};

export default TestingButton;
