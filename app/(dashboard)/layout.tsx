import Sidebar from '@/components/Sidebar';
import { checkSession } from '@/lib/utils';
import { User } from 'next-auth';
import { ReactNode } from 'react';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await checkSession();

  return <Sidebar session={session}>{children}</Sidebar>;
};

export default DashboardLayout;
