import EmailVerificationResetPasswordForm from '@/components/forms/EmailVerificationResetPasswordForm';

const EmailVerificationResetPasswordPage = () => {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="sm:mx-auto sm:w-full sm:max-w-[480px] border bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12 mx-6">
        <EmailVerificationResetPasswordForm />
      </section>
    </main>
  );
};

export default EmailVerificationResetPasswordPage;
