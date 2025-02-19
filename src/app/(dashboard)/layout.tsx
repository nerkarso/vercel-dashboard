import AvatarPopover from '@/components/global/AvatarPopover';
import TeamSwitcher from '@/components/global/TeamSwitcher';
import ThemeSwitcher from '@/components/global/ThemeSwitcher';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const isAuth = await auth();

  if (!isAuth) redirect('/unauthorized');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-20">
        <div className="flex h-16 items-center px-6">
          <Link className="flex items-center gap-2 font-semibold mr-6" href="/">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 19.7778H22L12 2Z" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>
          <TeamSwitcher />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitcher />
            <AvatarPopover />
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
