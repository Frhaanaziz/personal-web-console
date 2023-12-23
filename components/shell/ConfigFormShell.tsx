import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const ConfigFormShell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        'lg:grid grid-cols-4 gap-8 flex flex-col-reverse',
        className
      )}
    >
      {children}
    </section>
  );
};

export default ConfigFormShell;
