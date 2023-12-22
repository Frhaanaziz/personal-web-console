import { api } from '@/trpc/server';
import HeadingWithAction from '@/components/HeadingWithAction';
import { ControlledDataTable } from '@/components/data-table/ControlledDataTable';
import { keywordColumns } from '@/components/data-table/columns/keywordColumn';
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
  const keywords = await api.keyword.getAll.query({ page: Number(page) });
  const { content, ...utils } = keywords;

  return (
    <>
      <HeadingWithAction
        heading="Keywords"
        label="Create keyword"
        href="/config/keywords/new"
      />

      <ControlledDataTable
        data={content}
        utils={utils}
        columns={keywordColumns}
      />
    </>
  );
};

export default ConfigKeywordsPage;
