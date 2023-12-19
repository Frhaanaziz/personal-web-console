import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be less than 100 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const resetPasswordSchema = z
  .object({
    userId: z.string().cuid(),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be less than 100 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });
