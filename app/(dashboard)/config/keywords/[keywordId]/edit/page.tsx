// import UpdateKeywordForm from '@/components/forms/UpdateKeywordForm';
import FormWrapper from '@/components/FormWrapper';
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

      <FormWrapper>
        <EditKeywordForm keyword={keyword} />
      </FormWrapper>
    </>
  );
};

export default EditKeywordPage;
