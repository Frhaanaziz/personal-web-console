const HeadingNoAction = ({ text }: { text: string }) => {
  return (
    <div className="pb-5 sm:flex sm:items-center sm:justify-between mb-4">
      <h1 className="text-2xl font-semibold leading-6 ">{text}</h1>
    </div>
  );
};

export default HeadingNoAction;
