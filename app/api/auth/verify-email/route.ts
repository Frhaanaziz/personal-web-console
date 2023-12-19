import { getErrorMessage } from '@/lib/utils';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/prisma/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') as string;
  if (!token) NextResponse.json({ error: 'Token not found' }, { status: 500 });

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET!);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token, please request a new one.');
    }

    await prisma.user.update({
      where: {
        id: decoded.user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
