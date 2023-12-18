import 'next-auth';

declare module 'next-auth' {
  interface UserData {
    id: string;
    email: string | null;
    emailVerified?: Date | null;
    hashedPassword: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      accessToken: string;
    } & DefaultSession['user'];
  }
  interface User {
    // id: string;
    // email: string | null;
    // emailVerified?: Date | null;
    // hashedPassword: string;
    role?: string;
    // createdAt: Date;
    // updatedAt: Date;
    accessToken?: string;
  }
}
