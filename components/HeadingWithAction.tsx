import Link from 'next/link';
import { buttonVariants } from './ui/button';
import BreadCrumbs from './BreadCrumbs';

const HeadingWithAction = ({
  heading,
  href,
  label,
}: {
  heading: string;
  href: string;
  label: string;
}) => {
  return (
    <>
      <BreadCrumbs />
      <header className="pb-5 sm:flex sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-semibold leading-6 ">{heading}</h1>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Link href={href} className={buttonVariants()}>
            {label}
          </Link>
        </div>
      </header>
    </>
  );
};

export default HeadingWithAction;
