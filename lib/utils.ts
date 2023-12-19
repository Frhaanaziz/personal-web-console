import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { auth } from '@/auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong, please try again later.';
  }

  return message;
}

export function getZodErrorMessage(result: z.SafeParseError<any>) {
  let errorMessage = '';

  result.error.issues.forEach((issue) => {
    errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
  });

  return errorMessage;
}

export async function checkToken() {
  const session = await auth();
  if (!session) return false;

  const token = session.accessToken as string;

  return jwt.verify(token, process.env.NEXTAUTH_SECRET!, (err, decoded) => {
    if (err) return false;
    // return decoded;
    return true;
  });
}

export async function checkSession() {
  const session = await auth();
  if (!session) throw new Error('No session found');
  if (session.user.role === 'user') throw new Error('Unauthorized');

  return session;
}

export function createAccessToken(userId: string) {
  return jwt.sign({ user: { id: userId } }, process.env.NEXTAUTH_SECRET!, {
    expiresIn: '1h',
  });
}

export function createEmailToken(userId: string) {
  return jwt.sign({ user: { id: userId } }, process.env.EMAIL_SECRET!, {
    expiresIn: '1d',
  });
}
