import HeadingNoAction from '@/components/HeadingNoAction';
import CSProjectConfigForm from '@/components/forms/CSProjectConfigForm';
import LayoutConfigForm from '@/components/forms/LayoutConfigForm';
import { api } from '@/trpc/server';

const CSProjectPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const locale = (searchParams.locale as string) || 'en';
  const message = await api.keyword.getByGroupAndLocale.query({
    locale,
    group: 'CSProject',
  });

  return (
    <>
      <HeadingNoAction text="Case Study Project Config" />

      <CSProjectConfigForm message={message} locale={locale} />
    </>
  );
};

export default CSProjectPage;
