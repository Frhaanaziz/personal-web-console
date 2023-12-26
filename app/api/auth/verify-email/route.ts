import { getErrorMessage } from '@/lib/utils';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getBackendApi } from '@/lib/axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') as string;
  if (!token) NextResponse.json({ error: 'Token not found' }, { status: 500 });

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET!);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token, please request a new one.');
    }
    const userId = decoded.user.id;

    const data = { emailVerified: true };
    await getBackendApi(token).patch(`/users/${userId}/emailVerified`, data);

    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
