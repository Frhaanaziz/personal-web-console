import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import { getBackendApi } from '@/lib/axios';
import { checkEmailToken, getNestErrorMessage } from '@/lib/utils';

const ResetPasswordPage = async ({
  params: { token },
}: {
  params: { token: string };
}) => {
  let decoded;
  try {
    const result = await getBackendApi().post('/auth/verify-email-token', {
      token,
    });
    decoded = result.data;
  } catch (error) {
    throw new Error(getNestErrorMessage(error));
  }

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="sm:mx-auto sm:w-full sm:max-w-[480px] border bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12 mx-6">
        <ResetPasswordForm userId={decoded.user.id} />
      </section>
    </main>
  );
};

export default ResetPasswordPage;
