import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/db';
import jwt from 'jsonwebtoken';
import { comparePasswordAction } from './app/_actions';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) throw new Error('No credentials provided');

        if (!credentials.email || !credentials.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword)
          throw new Error('Incorrect email or password');

        if (!user.emailVerified)
          throw new Error('Please confirm your email to login');

        const passwordMatch = await comparePasswordAction({
          password: credentials.password,
          hashedPassword: user.hashedPassword,
        });

        if (!passwordMatch) {
          throw new Error('Incorrect email or password');
        }

        const accessToken = jwt.sign(
          { id: user.id },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: '1h' }
        );

        return { ...user, accessToken };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, account }) {
      // if (trigger === 'update' && session?.name) {
      //   token.name = session.name;
      // }

      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          // accessToken: token.accessToken,
        },
      };
    },
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
