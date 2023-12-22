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
// import { addKeywordAction, fillContentEachLocale } from '@/app/_actions/config';
import { toast } from 'sonner';
import { useId } from 'react';
import { Loader2 } from 'lucide-react';
import { newKeywordSchema } from '@/lib/validators/keyword';
import { trpc } from '@/app/_trpc/client';
import { useSession } from 'next-auth/react';

const NewKeywordForm = () => {
  const defaultValues = {
    keyword: '',
    group: '',
    initialContent: 'initial',
  };

  const form = useForm<z.infer<typeof newKeywordSchema>>({
    resolver: zodResolver(newKeywordSchema),
    defaultValues,
  });
  const { handleSubmit, control, reset } = form;

  const { mutate, isLoading } = trpc.keyword.add.useMutation({
    onSuccess: () => {
      reset(defaultValues);
      toast.success('Keyword added');
    },
    onError: (error) => {
      console.error('NewKeywordForm', error);
      toast.error('Failed to add keyword');
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((formValues) => mutate(formValues))}
        className="space-y-8"
      >
        <div className="flex gap-5">
          <FormField
            control={control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keyword</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
          Submit
        </Button>
      </form>

      {/* <Button className="mt-5" onClick={handleDeleteBatch}>Delete Batch</Button> */}
    </Form>
  );
};

export default NewKeywordForm;
