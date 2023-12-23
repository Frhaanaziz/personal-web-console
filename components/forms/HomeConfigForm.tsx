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
import { homeConfigSchema } from '@/lib/validators/config';
import { Textarea } from '../ui/textarea';
import AsideConfig from '../AsideConfig';
import ConfigFormShell from '../shell/ConfigFormShell';
import FormShell from '../shell/FormShell';
import FormFieldShell from '../shell/FormFieldShell';
import {
  array1,
  array3,
  generateConfigDefaultValues,
  getErrorMessage,
} from '@/lib/utils';
import RichTextEditor from '../RichTextEditor';
import { Fragment, useMemo } from 'react';
import { api } from '@/trpc/react';
import SubmitButton from '../SubmitButton';
import { useFormInitialization } from '@/hooks/useFormInitialization';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const HomeConfigForm = ({
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

  const form = useFormInitialization(homeConfigSchema, defaultValues);
  const { handleSubmit, control, formState } = form;

  const { mutate, isLoading } = api.content.updateManyConfig.useMutation({
    onSuccess: () => {
      toast.success('Updated!');
      utils.keyword.getByGroupAndLocale.invalidate({ group: 'home', locale });
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
              <p className="text-xl font-semibold text-primary">Hero Section</p>
              <FormField
                control={control}
                name="heroHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="heroDescription"
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
                  name="heroLinkLabel"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Link label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="heroLinkHref"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Link href</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormFieldShell>
            </div>

            <div className="space-y-7">
              <p className="text-xl font-semibold text-primary">
                About Section
              </p>
              <FormField
                control={control}
                name="aboutHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="aboutSubHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Sub heading</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="aboutDescriptionHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Description heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`aboutDescription`}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>About description</FormLabel>
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

              <FormFieldShell>
                <FormField
                  control={control}
                  name="aboutLinkLabel"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Link label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="aboutLinkHref"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Link href</FormLabel>
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
                name="aboutSkillsHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Skills heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-7">
              <p className="text-xl font-semibold text-primary">
                Projects Section
              </p>

              <FormField
                control={control}
                name="projectsHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="projectsSubHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Sub heading</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {array1.map((i) => (
                <Fragment key={i}>
                  <FormFieldShell>
                    <FormField
                      control={control}
                      // @ts-ignore
                      name={`projects${i}Heading`}
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormLabel>Project{i} heading</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      // @ts-ignore
                      name={`projects${i}ImageSource`}
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormLabel>Project{i} image source</FormLabel>
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
                    // @ts-ignore
                    name={`projects${i}Description`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>Project{i} description</FormLabel>
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
                      // @ts-ignore
                      name={`projects${i}CSLink`}
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormLabel>Project{i} case study link</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      // @ts-ignore
                      name={`projects${i}CSLabel`}
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormLabel>Project{i} case study label</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormFieldShell>
                </Fragment>
              ))}
            </div>

            <div className="space-y-7">
              <p className="text-xl font-semibold text-primary">
                Contact Section
              </p>

              <FormField
                control={control}
                name="contactHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="contactSubHeading"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Sub heading</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {array3.map((i) => (
                <FormFieldShell key={i}>
                  <FormField
                    control={control}
                    // @ts-ignore
                    name={`contactFormField${i}Label`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>Form field{i} label</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    // @ts-ignore
                    name={`contactFormField${i}Placeholder`}
                    disabled={isLoading}
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel>Form field{i} placeholder</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormFieldShell>
              ))}

              <FormField
                control={control}
                name="contactFormSubmitButtonLabel"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Submit button label</FormLabel>
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

export default HomeConfigForm;
