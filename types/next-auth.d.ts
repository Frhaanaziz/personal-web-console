import 'next-auth';
import { type User as UserData } from '@prisma/client';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    data: UserData;
    // user: {
    //   id: string;
    //   role: string;
    // } & DefaultSession['user'];
  }

  interface User {
    data: UserData;
    accessToken?: string;
  }

  interface Profile {
    email_verified?: string;
    picture?: string;
  }
}
