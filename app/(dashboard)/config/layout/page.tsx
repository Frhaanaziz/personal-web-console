import HeadingNoAction from '@/components/HeadingNoAction';
import HomeConfigForm from '@/components/forms/HomeConfigForm';
import LayoutConfigForm from '@/components/forms/LayoutConfigForm';
import { api } from '@/trpc/server';

const LayoutConfigPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const locale = (searchParams.locale as string) || 'en';
  const message = await api.keyword.getByGroupAndLocale.query({
    locale,
    group: 'Layout',
  });

  return (
    <>
      <HeadingNoAction text="Layout Config" />

      <LayoutConfigForm message={message} locale={locale} />
    </>
  );
};

export default LayoutConfigPage;
