import ProjectsGrid from '@/components/dashboard/ProjectsGrid';
import ProjectsToolbar from '@/components/dashboard/ProjectsToolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { searchParamsCache } from '@/lib/search-params';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  searchParamsCache.parse(await searchParams);

  return (
    <div className="max-w-screen-2xl mx-auto space-y-6">
      <ProjectsToolbar />
      <Suspense fallback={<Skeleton className="h-40 max-w-sm" />}>
        <ProjectsGrid />
      </Suspense>
    </div>
  );
}
