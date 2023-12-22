import NewKeywordForm from '@/components/forms/NewKeywordForm';
import HeadingWithAction from '@/components/HeadingWithAction';

const NewKeywordPage = () => {
  return (
    <>
      <HeadingWithAction
        heading="Create keyword"
        label="Keywords"
        href="/config/keywords"
      />

      <section className="border rounded-xl p-6 max-w-fit">
        <NewKeywordForm />
      </section>
    </>
  );
};

export default NewKeywordPage;
