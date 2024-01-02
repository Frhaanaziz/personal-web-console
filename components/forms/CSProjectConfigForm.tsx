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
import { CSProjectConfigSchema } from '@/lib/validators/config';
import AsideConfig from '../AsideConfig';
import ConfigFormShell from '../shell/ConfigFormShell';
import FormShell from '../shell/FormShell';
import {
  array6,
  generateConfigDefaultValues,
  getErrorMessage,
} from '@/lib/utils';
import { useMemo } from 'react';
import { api } from '@/trpc/react';
import SubmitButton from '../SubmitButton';
import { useFormInitialization } from '@/hooks/useFormInitialization';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { projects } from '@/lib/constant';
import RichTextEditor from '../RichTextEditor';
import FormFieldShell from '../shell/FormFieldShell';
import { Textarea } from '../ui/textarea';

const CSProjectConfigForm = ({
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

  const form = useFormInitialization(CSProjectConfigSchema, defaultValues);
  const { handleSubmit, control, formState } = form;

  const { mutate, isLoading } = api.content.updateManyConfig.useMutation({
    onSuccess: () => {
      toast.success('Updated!');
      utils.keyword.getByGroupAndLocale.invalidate({
        group: 'CSProject',
        locale,
      });
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
              <p className="text-xl font-semibold text-primary">Main Section</p>
              <FormField
                control={control}
                name={`mainDescription`}
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormFieldShell>
                <FormField
                  control={control}
                  name={`overviewHeading`}
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Overview heading</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`toolsHeading`}
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Tools heading</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormFieldShell>

              <FormFieldShell>
                <FormField
                  control={control}
                  name={`sourceCodeHeading`}
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Source code heading</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`liveHeading`}
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Live heading</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormFieldShell>

              <FormField
                control={control}
                name={`projectLinkLabel`}
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Project link label</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {projects.map((project) => (
              <div key={project} className="space-y-7">
                <p className="text-xl font-semibold text-primary">
                  Thriftshop Section
                </p>

                <FormFieldShell>
                  <FormField
                    control={control}
                    name={`${project}Link`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>{project} link</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`${project}GithubLink`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>{project} github link</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormFieldShell>

                <FormField
                  control={control}
                  name={`${project}OverviewDescription`}
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>{project} overview description</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          isLoading={isLoading}
                          formState={formState}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`${project}ToolsCount`}
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>{project} tools count</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormFieldShell>
                  {array6.map((i) => (
                    <FormField
                      key={i}
                      control={control}
                      name={`${project}Tools${i}`}
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormLabel>{project} tools1</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </FormFieldShell>
              </div>
            ))}

            <SubmitButton isLoading={isLoading} />
          </form>
        </Form>
      </FormShell>

      <AsideConfig />
    </ConfigFormShell>
  );
};

export default CSProjectConfigForm;
