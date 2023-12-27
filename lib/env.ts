import { cleanEnv, str, url } from 'envalid';

export const env = cleanEnv(process.env, {
  //   NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),

  NEXT_PUBLIC_BASE_URL: url(),
  BACKEND_URL: url(),

  NEXTAUTH_URL: url(),
  NEXTAUTH_SECRET: str(),

  JWT_EXPIRES_IN: str(),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
});
