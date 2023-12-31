'use client';
import React, { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { HomeIcon, XIcon, ChevronRightIcon, Settings2Icon } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ScrollArea } from './ui/scroll-area';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggler';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from 'next-auth';
import Image from 'next/image';

const navigation = [
  {
    name: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    name: 'Web Config',
    icon: Settings2Icon,
    children: [
      { name: 'Home', href: '/config/home' },
      { name: 'Case Study Project', href: '/config/cs-project' },
      { name: 'Layout', href: '/config/layout' },
      { name: 'Keywords', href: '/config/keywords' },
    ],
  },
];

const NavList = ({ pathName }: { pathName: string }) => {
  return (
    <>
      {navigation.map((item) => (
        <li key={item.name}>
          {!item.children ? (
            <Link
              href={item.href}
              className={cn(
                item.href === pathName
                  ? 'bg-muted text-muted-foreground'
                  : 'hover:text-muted-foreground hover:bg-muted',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
              )}
            >
              <item.icon
                className="h-6 w-6 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ) : (
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={
                      'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold hover:text-muted-foreground hover:bg-muted'
                    }
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {item.name}
                    <ChevronRightIcon
                      className={cn(
                        open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                        'ml-auto h-5 w-5 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel as="ul" className="mt-1 px-2 space-y-1">
                    {item.children.map((subItem) => (
                      <li key={subItem.name}>
                        <Disclosure.Button
                          as="a"
                          href={subItem.href}
                          className={cn(
                            subItem.href === pathName
                              ? 'bg-muted text-muted-foreground'
                              : 'hover:text-muted-foreground hover:bg-muted',
                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6'
                          )}
                        >
                          {subItem.name}
                        </Disclosure.Button>
                      </li>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          )}
        </li>
      ))}
    </>
  );
};

export default function Sidebar({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();

  const user = session.data;
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                {/* Sidebar component */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex justify-between h-16 shrink-0 items-center">
                    {/* <Link href={'/'}>
                      <Logo />
                    </Link> */}
                    <ModeToggle />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 space-y-2">
                      <NavList pathName={pathName} />
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col lg:w-72 border-r">
        <ScrollArea>
          {/* <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 h-screen"> */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6">
            <div className="flex justify-between h-16 shrink-0 items-center">
              {/* <Link href={'/'}>
                <Logo />
              </Link> */}
              <ModeToggle />
            </div>
            <ul role="list" className="-mx-2 space-y-2">
              <NavList pathName={pathName} />
            </ul>
          </div>
        </ScrollArea>

        <div className="flex items-center gap-x-4 px-4 py-4 text-sm font-semibold leading-6 mt-auto">
          <Avatar>
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name}
              width={40}
              height={40}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">{user.name}</span>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <HamburgerMenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6">Dashboard</div>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
