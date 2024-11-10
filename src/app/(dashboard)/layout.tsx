import AvatarPopover from '@/components/global/AvatarPopover';
import TeamSwitcher from '@/components/global/TeamSwitcher';
import ThemeSwitcher from '@/components/global/ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { LayoutDashboard } from 'lucide-react';
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
      <header className="border-b sticky top-0 bg-background">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 2L2 19.7778H22L12 2Z" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>
          <TeamSwitcher />
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Button variant="ghost" className="text-sm font-medium" asChild>
              <Link href="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            {/* <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
              <GitBranch className="mr-2 h-4 w-4" />
              Deployments
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
              <Globe className="mr-2 h-4 w-4" />
              Domains
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button> */}
          </nav>
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
