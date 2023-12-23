import HeadingNoAction from '@/components/HeadingNoAction';
import HomeConfigForm from '@/components/forms/HomeConfigForm';
import { api } from '@/trpc/server';

const HomeConfigPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const locale = (searchParams.locale as string) || 'en';
  const message = await api.keyword.getByGroupAndLocale.query({
    locale,
    group: 'home',
  });

  return (
    <>
      <HeadingNoAction text="Home Config" />

      <HomeConfigForm message={message} locale={locale} />
    </>
  );
};

export default HomeConfigPage;
