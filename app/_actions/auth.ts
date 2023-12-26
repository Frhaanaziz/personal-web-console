'use server';
import { db } from '@/server/db';
import {
  emailSchema,
  resetPasswordSchema,
  signUpSchema,
} from '@/lib/validators/auth';
import {
  checkSession,
  createEmailToken,
  getErrorMessage,
  getNestErrorMessage,
  getZodErrorMessage,
} from '@/lib/utils';
import { z } from 'zod';
import { Resend } from 'resend';
import { hashPassword } from '.';
import EmailVerificationResetPassword from '@/email/EmailVerificationResetPassword';
import { api } from '@/trpc/server';
import { getBackendApi } from '@/lib/axios';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function signUpAction(rawData: z.infer<typeof signUpSchema>) {
  const zodResult = signUpSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { data } = zodResult;

  try {
    await getBackendApi().post('/auth/signup', data);

    return { error: null };
  } catch (error) {
    return { error: getNestErrorMessage(error) };
  }
}

export async function validateEmailOnResetPasswordAction(
  rawData: z.infer<typeof emailSchema>
) {
  const zodResult = emailSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { email } = zodResult.data;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error('Account not found');

    const emailToken = createEmailToken(user.id);

    resend.emails.send({
      from: 'Portfolio <portfolio-console@aththariq.com>',
      to: [email],
      subject: 'Email Verification',
      react: EmailVerificationResetPassword({
        url: `${process.env
          .NEXT_PUBLIC_BASE_URL!}/auth/reset-password/${emailToken}`,
      }) as React.ReactElement,
    });

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function resetPasswordAction(
  rawData: z.infer<typeof resetPasswordSchema>
) {
  const zodResult = resetPasswordSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { newPassword, userId } = zodResult.data;

  try {
    const hashedPassword = await hashPassword(newPassword);
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword,
        emailVerified: true,
      },
    });

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function googleLoginAction(input: any) {
  try {
    const data = await api.auth.googleLogin.mutate(input);

    return { data, error: null };
  } catch (error) {
    return { error: getErrorMessage(error), data: null };
  }
}
