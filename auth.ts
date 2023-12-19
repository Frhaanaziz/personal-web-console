import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/db';
import { comparePasswordAction } from './app/_actions';
import { createAccessToken } from './lib/utils';
import Google from 'next-auth/providers/google';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) throw new Error('No credentials provided');

        if (!credentials.email || !credentials.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (user && !user.hashedPassword)
          throw new Error('Please create a password from forgot password');

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

        // const accessToken = createAccessToken(user.id);

        // return { ...user, accessToken };
        return user;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   console.log('signIn callback', { user, account });

    //   if (account && account.provider === 'google') {
    //     const accessToken = createAccessToken(user.id);
    //     user.accessToken = accessToken;
    //   }
    //   return true;
    // },

    async jwt({ token, user, trigger, account, profile }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          // accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        // accessToken: token.accessToken,
        user: {
          id: token.id,
          ...session.user,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin', // on signout redirects users to a custom login page.
    newUser: '/', // New users will be directed here on first sign in (leave the property out if not of interest)
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
