'use client';

import ProjectCard from '@/components/dashboard/ProjectCard';
import { searchParamsParsers } from '@/lib/search-params';
import { api } from '@/trpc/client';
import { useQueryStates } from 'nuqs';

export default function ProjectsGrid() {
  const [searchParams] = useQueryStates(searchParamsParsers);
  const { search, density, limit } = searchParams;
  const [data] = api.project.getAll.useSuspenseQuery({ search, limit });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.projects?.map((project, i) => (
        <ProjectCard key={i} density={density} project={project} />
      ))}
    </div>
  );
}
