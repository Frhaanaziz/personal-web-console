'use server';
import prisma from '@/prisma/db';
import { signUpSchema } from '@/lib/validators/auth';
import {
  createEmailToken,
  getErrorMessage,
  getZodErrorMessage,
} from '@/lib/utils';
import { z } from 'zod';
import { Resend } from 'resend';
import EmailVerification from '@/email/EmailVerification';
import { comparePasswordAction, hashPassword } from '.';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function signUpAction(rawData: z.infer<typeof signUpSchema>) {
  const zodResult = signUpSchema.safeParse(rawData);
  if (!zodResult.success)
    return {
      error: getZodErrorMessage(zodResult),
      data: null,
    };
  const { email, password, role } = zodResult.data;

  try {
    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exist) {
      const passwordMatch = await comparePasswordAction({
        password: password,
        hashedPassword: exist.hashedPassword,
      });
      if (!passwordMatch) throw new Error('Incorrect email or password');

      if (exist.emailVerified)
        throw new Error('Email already verified, please login');
    }

    if (!exist) {
      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          hashedPassword,
          role,
        },
      });

      const emailToken = createEmailToken(user.id);

      // const result = await resend.emails.send({
      resend.emails.send({
        from: 'Portfolio <portfolio-console@aththariq.com>',
        to: [email],
        subject: 'Email Verification',
        react: EmailVerification({
          url: `${process.env
            .NEXT_PUBLIC_BASE_URL!}/api/auth/verify-email?token=${emailToken}`,
        }) as React.ReactElement,
      });
    } else if (!exist.emailVerified) {
      const emailToken = createEmailToken(exist.id);

      // const result = await resend.emails.send({
      resend.emails.send({
        from: 'Portfolio <portfolio-console@aththariq.com>',
        to: [email],
        subject: 'Email Verification',
        react: EmailVerification({
          url: `${process.env
            .NEXT_PUBLIC_BASE_URL!}/api/auth/verify-email?token=${emailToken}`,
        }) as React.ReactElement,
      });
    }

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function deleteAllUsersAction() {
  const users = await prisma.user.deleteMany();
  return { data: users, error: null };
}
