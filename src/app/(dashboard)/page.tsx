import ActiveProjectsStats from '@/components/dashboard/ActiveProjectsStats';
import ProjectsGrid from '@/components/dashboard/ProjectsGrid';
import ProjectsToolbar from '@/components/dashboard/ProjectsToolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { searchParamsCache } from '@/lib/search-params';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  searchParamsCache.parse(await searchParams);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-28 max-w-sm" />}>
          <ActiveProjectsStats />
        </Suspense>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
        </TabsList> */}
        <TabsContent value="all" className="space-y-4">
          <ProjectsToolbar />
          <Suspense fallback={<Skeleton className="h-40 max-w-sm" />}>
            <ProjectsGrid />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
