import SignInForm from '@/components/forms/SignInForm';

const SignInPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const callbackUrl = searchParams.callbackUrl;
  const error = searchParams.error;

  return (
    <main className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight ">
        Sign in to your account
      </h2>

      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="border bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12 mx-6">
          <SignInForm callbackUrl={callbackUrl} error={error} />
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
