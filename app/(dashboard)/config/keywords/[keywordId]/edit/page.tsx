// import UpdateKeywordForm from '@/components/forms/UpdateKeywordForm';
import HeadingWithAction from '@/components/HeadingWithAction';
import EditKeywordForm from '@/components/forms/EditKeywordForm';
import { checkSession } from '@/lib/utils';
import { api } from '@/trpc/server';
import { Keyword } from '@prisma/client';
import { notFound } from 'next/navigation';

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

      <section className="border rounded-xl p-6 w-fit">
        <EditKeywordForm keyword={keyword} />
      </section>
    </>
  );
};

export default EditKeywordPage;
