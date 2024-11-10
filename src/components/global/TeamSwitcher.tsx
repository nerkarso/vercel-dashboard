'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IMAGE_PLACEHOLDER } from '@/config/constants';
import { ChevronDown } from 'lucide-react';
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
        <Button variant="ghost" className="flex items-center gap-2 mr-4">
          <Image
            src={teams.find((team) => team.name === currentTeam)?.image || ''}
            alt="Team"
            className="rounded-full"
            width={24}
            height={24}
          />
          {currentTeam}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {teams.map((team) => (
          <DropdownMenuItem key={team.name} onClick={() => setCurrentTeam(team.name)}>
            <Image
              src={team.image}
              alt={team.name}
              className="mr-2 rounded-full"
              width={24}
              height={24}
            />
            {team.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
