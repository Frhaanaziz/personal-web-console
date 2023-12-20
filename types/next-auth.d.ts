import 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      // accessToken: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
    // accessToken?: string;
  }
}
