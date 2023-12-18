'use server';
import bcrypt from 'bcrypt';
import prisma from '@/prisma/db';
import { signUpSchema } from '@/lib/validators/auth';
import { checkSession, checkToken, getZodErrorMessage } from '@/lib/utils';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { auth } from '@/auth';

export async function signUpAction(rawData: z.infer<typeof signUpSchema>) {
  const zodResult = signUpSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: `signUpAction ${getZodErrorMessage(zodResult)}`,
      data: null,
    };
  const { email, password, role } = zodResult.data;

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exist) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      role,
    },
  });

  return { data: user, error: null };
}

export async function deleteAllUsersAction() {
  const users = await prisma.user.deleteMany();
  return { data: users, error: null };
}
