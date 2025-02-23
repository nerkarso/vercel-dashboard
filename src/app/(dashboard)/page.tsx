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

  // TODO: add fallback when no account is selected

  return (
    <div className="max-w-screen-2xl mx-auto space-y-6">
      <ProjectsToolbar />
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        }
      >
        <ProjectsGrid />
      </Suspense>
    </div>
  );
}
