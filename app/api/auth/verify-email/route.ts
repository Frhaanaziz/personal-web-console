import { getErrorMessage } from '@/lib/utils';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getBackendApi } from '@/lib/axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') as string;
  const userId = searchParams.get('id') as string;
  if (!token) NextResponse.json({ error: 'Token not found' }, { status: 500 });
  if (!userId) NextResponse.json({ error: 'ID not found' }, { status: 500 });

  try {
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
