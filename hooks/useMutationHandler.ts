import { getErrorMessage } from '@/lib/utils';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useMutationHandler = (
  mutationApi: any,
  group: string,
  locale: string
) => {
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate, isLoading } = mutationApi.useMutation({
    onSuccess: () => {
      toast.success('Updated!');
      utils.keyword.getByGroupAndLocale.invalidate({ group, locale });
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });

  return { mutate, isLoading };
};
