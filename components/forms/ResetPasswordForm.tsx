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
import { resetPasswordSchema } from '@/lib/validators/auth';
import { resetPasswordAction } from '@/app/_actions/auth';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const defaultValues = {
    userId,
    newPassword: '',
    confirmPassword: '',
  };

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit(formValues: z.infer<typeof resetPasswordSchema>) {
    try {
      const result = await resetPasswordAction(formValues);
      if (result.error) throw new Error(result.error);

      reset(defaultValues);
      toast.success('Password changed successfully');
      router.push('/auth/signin');
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error('ResetPasswordForm', error);
    }
  }

  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-2">
        Change your password
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-[300px] mx-auto">
        Enter a new password below to change your password
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <FormField
              control={control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Change password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
