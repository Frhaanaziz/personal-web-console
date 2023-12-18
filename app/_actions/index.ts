'use server';
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
