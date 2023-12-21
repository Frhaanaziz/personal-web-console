import HeadingNoAction from '@/components/HeadingNoAction';

const HomeConfigPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  //   let message: HomeConfigData | null = null;
  //   const locale = (searchParams.locale as string) || 'en';

  //   try {
  //     const { data, error } = await getSectionDataAction({
  //       locale,
  //       identifier: 'home',
  //     });
  //     if (error) throw new Error(error);

  //     message = convertToLocaleMessage(data);
  //   } catch (error) {
  //     console.error('HomeConfigPage', error);
  //   }
  //   if (!message) throw new Error('Home config data not found');

  return (
    <>
      <HeadingNoAction text="Home Config" />

      {/* <HomeConfigForm message={message} /> */}
    </>
  );
};

export default HomeConfigPage;
