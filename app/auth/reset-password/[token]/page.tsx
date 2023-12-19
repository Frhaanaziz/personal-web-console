import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import { checkEmailToken } from '@/lib/utils';

const ResetPasswordPage = ({
  params: { token },
}: {
  params: { token: string };
}) => {
  const decoded = checkEmailToken(token);
  if (typeof decoded === 'string')
    throw new Error('Invalid token, please request a new one.');

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="sm:mx-auto sm:w-full sm:max-w-[480px] border bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12 mx-6">
        <ResetPasswordForm userId={decoded.user.id} />
      </section>
    </main>
  );
};

export default ResetPasswordPage;
