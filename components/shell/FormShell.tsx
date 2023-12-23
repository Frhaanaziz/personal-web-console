import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const FormShell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn('border rounded-xl p-6 shadow bg-card', className)}>
      {children}
    </section>
  );
};

export default FormShell;
