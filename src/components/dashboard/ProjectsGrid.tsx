import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/search-params';
import { getProjects } from '@/lib/vercel/api';
import { ReadyState } from '@/lib/vercel/types';
import { formatDistanceToNow } from 'date-fns';
import { GitBranch, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectsGrid() {
  const { projects } = await getProjects(searchParamsCache.all());

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project, i) => {
        const alias = project?.targets?.production?.alias?.[0];
        const latestDeployment = project?.latestDeployments?.[0];
        const latestDeploymentDate = latestDeployment?.readyAt
          ? formatDistanceToNow(new Date(latestDeployment.readyAt), { addSuffix: true })
          : 'never';

        return (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base font-medium">
                  <span>{project?.name}</span>
                </CardTitle>
                {alias && (
                  <Link
                    href={`https://${alias}`}
                    className="text-sm text-muted-foreground hover:underline"
                    target="_blank"
                  >
                    {alias}
                  </Link>
                )}
              </div>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Last deployed {latestDeploymentDate}
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <ProjectReadyState state={latestDeployment?.readyState} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ProjectReadyState({ state }: { state: ReadyState }) {
  switch (state) {
    case 'BUILDING':
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
          <span className="text-xs font-medium text-yellow-500">Deploying</span>
        </>
      );
    case 'READY':
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium">Production</span>
        </>
      );
    default:
      return (
        <>
          <div className="h-2 w-2 rounded-full bg-gray-500" />
          <span className="text-xs font-medium">Unknown</span>
        </>
      );
  }
}
