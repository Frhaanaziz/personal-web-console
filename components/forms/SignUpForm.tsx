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
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { signUpSchema } from '@/lib/validators/auth';
import { getErrorMessage } from '@/lib/utils';
import { toast } from 'sonner';
import { signUpAction } from '@/app/_actions/auth';

const SignUpForm = () => {
  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit(formValues: z.infer<typeof signUpSchema>) {
    try {
      const { error } = await signUpAction(formValues);
      if (error) throw new Error(error);

      reset(defaultValues);
      toast.success('Please check your email to verify your account');
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error('SignUpForm', error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isSubmitting} />
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
                  <Input type="password" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Sign Up
          </Button>
        </form>
      </Form>

      <Link
        href="/auth/signin"
        className="inline-block mt-4 underline text-sm text-muted-foreground"
      >
        Have an account? Sign in
      </Link>
    </>
  );
};

export default SignUpForm;
