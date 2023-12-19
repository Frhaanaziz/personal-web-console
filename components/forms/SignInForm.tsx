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
import { Checkbox } from '../ui/checkbox';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { signInSchema } from '@/lib/validators/auth';
import { getErrorMessage } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  callbackUrl: string | string[] | undefined;
}

const SignInForm = ({ callbackUrl }: Props) => {
  const router = useRouter();

  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState, reset } = form;
  const { isSubmitting } = formState;

  async function onSubmit({ email, password }: z.infer<typeof signInSchema>) {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl:
          typeof callbackUrl === 'string'
            ? callbackUrl
            : process.env.NEXT_PUBLIC_BASE_URL!,
      });
      if (!result) throw new Error('Something went wrong, please try again.');
      if (result.error) throw new Error(result.error);

      reset(defaultValues);
      toast.success('Signed in successfully!');
      router.push(result.url ?? process.env.NEXT_PUBLIC_BASE_URL!);
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error('SignInForm', error);
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" disabled={isSubmitting} />
              <label
                htmlFor="remember-me"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm leading-6">
              <Link
                href="/auth/reset-password"
                className="font-semibold text-primary hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              )}
              Sign in
            </Button>
          </div>
        </form>
      </Form>

      <Link
        href="/auth/signup"
        className="inline-block mt-4 underline text-sm text-muted-foreground"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </>
  );
};

export default SignInForm;
