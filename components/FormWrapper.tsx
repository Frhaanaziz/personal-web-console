import { PropsWithChildren } from 'react';

const FormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <section className="border rounded-xl p-6 max-w-fit shadow bg-card">
      {children}
    </section>
  );
};

export default FormWrapper;
