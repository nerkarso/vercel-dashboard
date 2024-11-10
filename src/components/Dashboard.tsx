'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { IMAGE_PLACEHOLDER } from '@/config/constants';
import { ChevronDown, GitBranch, Globe, LayoutDashboard, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// HACK we need to use dynamic to prevent hydration errors because the icon SVG is lazy loaded
const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false });

export function Dashboard() {
  const [currentTeam, setCurrentTeam] = useState('My Team');

  const projects = [{ name: 'Project 1', status: 'deployed', lastDeployed: '2h ago' }];

  const teams = [
    {
      name: 'My Team',
      image: IMAGE_PLACEHOLDER,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
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

          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Button variant="ghost" className="text-sm font-medium">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
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
            <Button variant="ghost" size="icon">
              <Image
                src={IMAGE_PLACEHOLDER}
                alt="Avatar"
                className="rounded-full"
                width={32}
                height={32}
              />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 bg-muted/50">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Projects</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div> */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                {/* <p className="text-xs text-muted-foreground mt-1">+2 new projects this week</p> */}
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="all" className="space-y-4">
            {/* <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
            </TabsList> */}
            <TabsContent value="all" className="space-y-4">
              {/* <div className="flex justify-between">
                <Input className="max-w-sm" placeholder="Search projects..." />
                <Button variant="outline">
                  Sort
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </div> */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-base font-medium">{project.name}</CardTitle>
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Last deployed {project.lastDeployed}
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        {project.status === 'deploying' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            <span className="text-xs font-medium text-blue-500">Deploying</span>
                          </>
                        ) : (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-xs font-medium">Production</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
