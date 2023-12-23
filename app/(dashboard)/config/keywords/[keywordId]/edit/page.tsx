import FormShell from '@/components/shell/FormShell';
import HeadingWithAction from '@/components/HeadingWithAction';
import EditKeywordForm from '@/components/forms/EditKeywordForm';
import { api } from '@/trpc/server';

const EditKeywordPage = async ({
  params: { keywordId },
}: {
  params: { keywordId: string };
}) => {
  const keyword = await api.keyword.getById.query(keywordId);

  return (
    <>
      <HeadingWithAction
        heading="Edit keyword"
        label="Keywords"
        href="/config/keywords"
      />

      <FormShell>
        <EditKeywordForm keyword={keyword} />
      </FormShell>
    </>
  );
};

export default EditKeywordPage;
