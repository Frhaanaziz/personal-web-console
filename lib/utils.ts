import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { auth } from '@/server/auth';
import { notFound } from 'next/navigation';
import { Session } from 'next-auth';
import { PER_PAGE } from './constant';
import { db } from '@/server/db';

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

export function formatDateWithTime(date: Date | string | number | null) {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(date));
}

export function checkAccessToken(token: string) {
  // const session = await auth();
  // if (!session) return false;

  // const token = session.accessToken as string;
  try {
    const jwtPayload = jwt.verify(token, process.env.NEXTAUTH_SECRET!);

    // return jwtPayload;
    return true;
  } catch (error) {
    return false;
  }
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

export function checkEmailToken(token: string) {
  try {
    return jwt.verify(token, process.env.EMAIL_SECRET!);
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function checkSession() {
  const session = await auth();

  if (!session) notFound();

  return session as Session;
}

export function getInitials(name?: string) {
  if (!name || name.length === 0) return 'CN';

  const splitName = name.split(' ');

  if (splitName.length === 1) {
    return splitName[0].slice(0, 2).toUpperCase();
  } else {
    return (splitName[0][0] + splitName[1][0]).toUpperCase();
  }
}

export const getPaginatedResult = async (page: number, table: string) => {
  // @ts-ignore
  const totalRow = await db[table].count();

  const savePage = page < 1 ? 1 : page;
  const rowsPerPage = PER_PAGE;
  const totalPages = Math.ceil(totalRow / rowsPerPage);

  // @ts-ignore
  const rows = await db[table].findMany({
    skip: (savePage - 1) * rowsPerPage,
    take: rowsPerPage,
  });

  console.log(savePage, page);

  return {
    currentPage: page,
    totalRow,
    rowsPerPage,
    totalPages,
    content: rows,
  };
};
