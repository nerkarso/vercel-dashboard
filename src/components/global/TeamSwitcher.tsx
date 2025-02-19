'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IMAGE_PLACEHOLDER } from '@/config/constants';
import { ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function TeamSwitcher() {
  const [currentTeam, setCurrentTeam] = useState('My Team');

  const teams = [
    {
      name: 'My Team',
      image: IMAGE_PLACEHOLDER,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 mr-4 px-2" variant="ghost">
          <Image
            alt="Team"
            className="rounded-full"
            height={24}
            src={teams.find((team) => team.name === currentTeam)?.image || ''}
            width={24}
          />
          {currentTeam}
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {teams.map((team) => (
          <DropdownMenuItem key={team.name} onClick={() => setCurrentTeam(team.name)}>
            <Image
              alt={team.name}
              className="mr-2 rounded-full"
              height={24}
              src={team.image}
              width={24}
            />
            {team.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
