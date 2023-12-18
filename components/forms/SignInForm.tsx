'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { useEffect, useId } from 'react';
// import toast from 'react-hot-toast';
// import { catchError } from "@/lib/utils"
import { signInSchema } from '@/lib/validators/auth';

interface Props {
  callbackUrl: string | string[] | undefined;
  error: string | string[] | undefined;
}

const SignInForm = ({ callbackUrl, error }: Props) => {
  const id = useId();

  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  //   useEffect(() => {
  //     if (error && typeof error === 'string') toast.error(error, { id });
  //   }, [error, id]);

  async function onSubmit({ email, password }: z.infer<typeof signInSchema>) {
    try {
      await signIn('credentials', {
        email,
        password,
        // redirect: true,
        callbackUrl:
          typeof callbackUrl === 'string'
            ? callbackUrl
            : process.env.NEXT_PUBLIC_BASE_URL!,
      });
    } catch (error) {
      console.error('SignInForm', error);
    }
  }

  return (
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
              href="#"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
