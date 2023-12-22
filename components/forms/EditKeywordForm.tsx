'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Keyword } from '@prisma/client';
import SubmitButton from '../SubmitButton';
import { updateKeywordSchema } from '@/lib/validators/keyword';
import { api } from '@/trpc/react';
import { getErrorMessage } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const EditKeywordForm = ({ keyword: data }: { keyword: Keyword }) => {
  const { keyword, group, id } = data;

  const defaultValues = {
    id,
    keyword,
    group,
  };

  const form = useForm<z.infer<typeof updateKeywordSchema>>({
    resolver: zodResolver(updateKeywordSchema),
    defaultValues,
  });
  const { handleSubmit, control } = form;

  const router = useRouter();
  const utils = api.useUtils();
  const { mutate, isLoading } = api.keyword.update.useMutation({
    onSuccess: () => {
      toast.success('Keyword updated!');
      utils.keyword.getById.invalidate(id);
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
        </div>

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default EditKeywordForm;
