'use server';
import {
  emailSchema,
  resetPasswordSchema,
  signUpSchema,
} from '@/lib/validators/auth';
import { getNestErrorMessage, getZodErrorMessage } from '@/lib/utils';
import { z } from 'zod';
import { api } from '@/trpc/server';
import { getBackendApi } from '@/lib/axios';

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
    };
  const { data } = zodResult;

  try {
    await getBackendApi().post('/users/validate-email', data);

    return { error: null };
  } catch (error) {
    return { error: getNestErrorMessage(error) };
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
    await getBackendApi().post(`/users/${userId}/reset-password`, {
      newPassword,
    });

    return { error: null };
  } catch (error) {
    return { error: getNestErrorMessage(error) };
  }
}

export async function googleLoginAction(input: any) {
  try {
    const result = await getBackendApi().post('/auth/login-google', input);

    return { data: result.data, error: null };
  } catch (error) {
    return { error: getNestErrorMessage(error), data: null };
  }
}
