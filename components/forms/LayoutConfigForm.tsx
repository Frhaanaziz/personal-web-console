'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { layoutConfigSchema } from '@/lib/validators/config';
import AsideConfig from '../AsideConfig';
import ConfigFormShell from '../shell/ConfigFormShell';
import FormShell from '../shell/FormShell';
import FormFieldShell from '../shell/FormFieldShell';
import {
  array4,
  generateConfigDefaultValues,
  getErrorMessage,
} from '@/lib/utils';
import { useMemo } from 'react';
import { api } from '@/trpc/react';
import SubmitButton from '../SubmitButton';
import { useFormInitialization } from '@/hooks/useFormInitialization';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LayoutConfigForm = ({
  message,
  locale,
}: {
  message: Record<string, { id: string; content: string }>;
  locale: string;
}) => {
  const utils = api.useUtils();
  const router = useRouter();

  const defaultValues = useMemo(
    () => generateConfigDefaultValues(message),
    [message]
  );

  const form = useFormInitialization(layoutConfigSchema, defaultValues);
  const { handleSubmit, control, formState } = form;

  const { mutate, isLoading } = api.content.updateManyConfig.useMutation({
    onSuccess: () => {
      toast.success('Updated!');
      utils.keyword.getByGroupAndLocale.invalidate({ group: 'layout', locale });
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <ConfigFormShell>
      <FormShell className="col-span-3">
        <Form {...form}>
          <form
            onSubmit={handleSubmit((formValues) =>
              mutate({ formValues, locale, defaultValues, message })
            )}
            className="space-y-10"
          >
            <div className="space-y-7">
              <p className="text-xl font-semibold text-primary">
                Heading Section
              </p>
              {array4.map((i) => (
                <FormFieldShell key={i}>
                  <FormField
                    control={control}
                    name={`headingNav${i}Label`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>Nav{i} label</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`headingNav${i}Href`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>Nav{i} label</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormFieldShell>
              ))}
            </div>

            <div className="space-y-7">
              <p className="text-xl font-semibold text-primary">
                Footer Section
              </p>
              <FormField
                control={control}
                name={`footerText`}
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </FormShell>

      <AsideConfig />
    </ConfigFormShell>
  );
};

export default LayoutConfigForm;
