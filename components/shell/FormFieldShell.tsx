import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const FormFieldShell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex gap-5  flex-wrap', className)}>{children}</div>
  );
};

export default FormFieldShell;
