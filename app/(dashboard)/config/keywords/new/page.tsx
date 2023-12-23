import NewKeywordForm from '@/components/forms/NewKeywordForm';
import FormShell from '@/components/shell/FormShell';
import HeadingWithAction from '@/components/HeadingWithAction';

const NewKeywordPage = () => {
  return (
    <>
      <HeadingWithAction
        heading="Create keyword"
        label="Keywords"
        href="/config/keywords"
      />

      <FormShell>
        <NewKeywordForm />
      </FormShell>
    </>
  );
};

export default NewKeywordPage;
