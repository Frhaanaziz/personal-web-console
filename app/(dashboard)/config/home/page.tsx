import HeadingNoAction from '@/components/HeadingNoAction';
import HomeConfigForm from '@/components/forms/HomeConfigForm';
import { api } from '@/trpc/server';
import { z } from 'zod';

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
  console.log(message);

  return (
    <>
      <HeadingNoAction text="Home Config" />

      <HomeConfigForm message={message} locale={locale} />
    </>
  );
};

export default HomeConfigPage;
