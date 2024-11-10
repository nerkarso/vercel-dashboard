import { createSerializer } from 'nuqs/server';
import { searchParamsParsers } from '../search-params';
import { Pagination, Project } from './types';

async function vercelApi(endpoint: string, options?: RequestInit) {
  const res = await fetch(`https://api.vercel.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
    },
    ...(options || {}),
  });
  return res.json();
}

export async function getProjects(searchParams: any) {
  const serialize = createSerializer(searchParamsParsers, { clearOnDefault: false });
  const serialized = serialize(searchParams);

  const res = await vercelApi(`/v9/projects${serialized}`, {
    next: {
      revalidate: 5,
      tags: ['projects', serialized],
    },
  });

  return {
    projects: (res?.projects as Project[]) ?? [],
    pagination: res?.pagination as Pagination,
  };
}

export async function getProjectsCount() {
  const res = await vercelApi('/v9/projects?limit=999', {
    next: {
      revalidate: 60,
      tags: ['projectsCount'],
    },
  });

  return (res?.pagination as Pagination)?.count ?? 0;
}
