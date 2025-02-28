'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/trpc/client';
import { ChevronsUpDown, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  current: string | null;
  teams: { id: string; name: string; token: string }[];
}

export default function TeamSwitcher({ current, teams }: Props) {
  const router = useRouter();
  const existingTeam = teams?.find((team) => team?.id === current);
  const [currentTeam, setCurrentTeam] = useState<{
    id: string;
    name: string;
    token: string;
  } | null>(existingTeam ?? null);

  const switchTeamMutation = api.user.vercelAccount.switch.useMutation();

  const utils = api.useUtils();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 mr-4 px-2" variant="ghost">
          <Avatar className="h-6 w-6 text-sm">
            <AvatarFallback className="bg-blue-600 uppercase">
              {currentTeam?.name?.[0] ?? 'A'}
            </AvatarFallback>
          </Avatar>
          {currentTeam?.name ?? 'Select account'}
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {teams?.map((team) => (
          <DropdownMenuItem
            key={team.id}
            onClick={() => {
              setCurrentTeam(team);
              switchTeamMutation.mutate(team.id, {
                onSuccess: () => {
                  utils.project.getAll.invalidate();
                },
              });
            }}
          >
            <Avatar className="h-6 w-6 text-sm mr-1">
              <AvatarFallback className="bg-blue-600 uppercase">
                {team.name?.[0] ?? 'A'}
              </AvatarFallback>
            </Avatar>
            {team.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/user-profile/vercel-accounts')}>
          <div className="grid place-items-center mr-1 w-6 h-6">
            <Wrench width={18} />
          </div>
          <span>Manage accounts</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
