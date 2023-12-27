'use server';
import {
  emailSchema,
  googleLoginSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from '@/lib/validators/auth';
import { getNestErrorMessage, getZodErrorMessage } from '@/lib/utils';
import { z } from 'zod';
import { getBackendApi } from '@/lib/axios';

export async function signInAction(rawData: z.infer<typeof signInSchema>) {
  const zodResult = signInSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { data } = zodResult;

  try {
    const result = await getBackendApi().post('/auth/signin', data);

    return { data: result.data, error: null };
  } catch (error) {
    return { error: getNestErrorMessage(error), data: null };
  }
}

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

export async function googleLoginAction(rawData: unknown) {
  const zodResult = googleLoginSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { data } = zodResult;

  try {
    const result = await getBackendApi().post('/auth/login-google', data);

    return { data: result.data, error: null };
  } catch (error) {
    return { error: getNestErrorMessage(error), data: null };
  }
}
