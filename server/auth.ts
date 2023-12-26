import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/server/db';
import { comparePasswordAction } from '../app/_actions';
import { createAccessToken, getErrorMessage } from '../lib/utils';
import Google from 'next-auth/providers/google';
import { googleLoginAction } from '../app/_actions/auth';

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
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

        const user = await db.user.findUnique({
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

        const accessToken = createAccessToken({
          userId: user.id,
          role: user.role,
        });

        // return { ...user, accessToken };
        return { id: user.id, data: user, accessToken };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile && account && account.provider === 'google') {
        const input = {
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          accounts: {
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
        };

        try {
          const { error, data } = await googleLoginAction(input);
          if (error) throw new Error(error);
          if (!data) throw new Error('No data returned');

          user.id = data.user.id;
          user.accessToken = data.accessToken;
          user.data = data.user;
        } catch (error) {
          console.error('Error signing in with Google', getErrorMessage(error));
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, account, profile }) {
      if (user) {
        return {
          ...token,
          data: user.data,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        data: token.data,
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
    maxAge: Number(process.env.JWT_EXPIRES_IN!), // 1 day
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
