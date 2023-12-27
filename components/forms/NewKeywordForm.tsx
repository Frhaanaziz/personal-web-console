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
import { api } from '@/trpc/react';
import { useSession } from 'next-auth/react';
import SubmitButton from '../SubmitButton';
import { getErrorMessage } from '@/lib/utils';
import FormFieldShell from '../shell/FormFieldShell';
import { useRouter } from 'next/navigation';

const NewKeywordForm = () => {
  const defaultValues = {
    keyword: '',
    group: 'home',
    content: '',
  };

  const form = useForm<z.infer<typeof newKeywordSchema>>({
    resolver: zodResolver(newKeywordSchema),
    defaultValues,
  });
  const { handleSubmit, control, reset } = form;

  const utils = api.useUtils();
  const router = useRouter();
  const { mutate, isLoading } = api.keyword.add.useMutation({
    onSuccess: () => {
      reset(defaultValues);
      toast.success('Keyword added');
      utils.keyword.getAll.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((formValues) => mutate(formValues))}
        className="space-y-8"
      >
        <FormFieldShell>
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
        </FormFieldShell>

        <SubmitButton isLoading={isLoading} />
      </form>

      {/* <Button className="mt-5" onClick={handleDeleteBatch}>Delete Batch</Button> */}
    </Form>
  );
};

export default NewKeywordForm;
