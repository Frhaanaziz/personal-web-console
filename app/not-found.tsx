'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main>
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-primary">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            Sorry, the page you are looking for doesn&apos;t exist.Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              variant={'outline'}
              size={'lg'}
              className="gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </Button>

            <Link href={'/'} className={buttonVariants({ size: 'lg' })}>
              Take me home
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <Image
            className="w-full max-w-lg lg:mx-auto"
            src="/icons/404.svg"
            alt="404"
            width={512}
            height={165}
          />
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
