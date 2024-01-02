import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/context/ThemeProvider';
import NextTopLoader from 'nextjs-toploader';
import ToastProvider from '@/context/ToastProvider';
import { webPrimaryColor } from '@/lib/constant';
import { cookies } from 'next/headers';
import { TRPCReactProvider } from '@/trpc/react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'CMS for aththariq.com',
  description: 'CMS for aththariq.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <ToastProvider>
              <NextTopLoader color={webPrimaryColor} />
              {children}
            </ToastProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
