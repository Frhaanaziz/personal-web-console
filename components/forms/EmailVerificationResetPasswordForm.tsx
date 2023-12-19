'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { getErrorMessage } from '@/lib/utils';
import { toast } from 'sonner';
import { emailSchema } from '@/lib/validators/auth';
import { validateEmailOnResetPasswordAction } from '@/app/_actions/auth';
import { useRouter } from 'next/navigation';

const EmailVerificationResetPasswordForm = () => {
  const router = useRouter();

  const defaultValues = {
    email: '',
  };

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit(formValues: z.infer<typeof emailSchema>) {
    try {
      const result = await validateEmailOnResetPasswordAction(formValues);
      if (result.error) throw new Error(result.error);

      reset(defaultValues);
      toast.success('Email sent!');
      router.push('/auth/signin');
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error('EmailVerificationResetPasswordForm', error);
    }
  }

  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-2">
        Reset your password
      </h1>
      <p className="text-muted-foreground mb-8">
        We will send you an email to reset your password
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Email me
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmailVerificationResetPasswordForm;
