import { serverClient } from '@/app/_trpc/serverClient';
import HeadingWithAction from '@/components/HeadingWithAction';
// import ConfigKeywordsTableSection from '@/components/section/ConfigKeywordsTableSection';
// import { getAxios } from '@/lib/axios_config';
// import { checkSession } from '@/lib/utils';
// import { KeywordsData } from '@/types';

const ConfigKeywordsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams.page || 1;
  const keywords = await serverClient.keyword.getAll({ page: Number(page) });
  console.log(keywords);
  return (
    <>
      <HeadingWithAction
        heading="Keywords"
        label="Create keyword"
        href="/config/keywords/new"
      />

      {/* <ConfigKeywordsTableSection data={data} /> */}
    </>
  );
};

export default ConfigKeywordsPage;
