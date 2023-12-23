import NewKeywordForm from '@/components/forms/NewKeywordForm';
import FormWrapper from '@/components/FormWrapper';
import HeadingWithAction from '@/components/HeadingWithAction';

const NewKeywordPage = () => {
  return (
    <>
      <HeadingWithAction
        heading="Create keyword"
        label="Keywords"
        href="/config/keywords"
      />

      <FormWrapper>
        <NewKeywordForm />
      </FormWrapper>
    </>
  );
};

export default NewKeywordPage;
