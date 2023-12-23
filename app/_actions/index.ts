'use server';
import { getPaginatedResult } from '@/lib/utils';
import bcrypt from 'bcrypt';

export async function comparePasswordAction({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
