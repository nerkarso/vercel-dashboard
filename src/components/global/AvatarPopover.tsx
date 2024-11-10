'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IMAGE_PLACEHOLDER } from '@/config/constants';
import { logout } from '@/lib/auth';
import Image from 'next/image';

export default function AvatarPopover() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Image
            alt="Avatar"
            className="rounded-full"
            height={32}
            src={IMAGE_PLACEHOLDER}
            width={32}
          />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={async () => {
            await logout();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
