import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/search-params';
import { getProjects } from '@/lib/vercel/api';
import { ReadyState } from '@/lib/vercel/types';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';
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
          <Card key={i} className="flex flex-col bg-muted/10">
            <CardHeader className="flex sm:flex-row justify-between items-start p-5 gap-1 flex-col">
              <div>
                <CardTitle className="text-base font-medium">
                  <span>{project?.name}</span>
                </CardTitle>
                {alias && (
                  <Link
                    className="text-sm text-muted-foreground hover:underline"
                    href={`https://${alias}`}
                    target="_blank"
                  >
                    {alias}
                  </Link>
                )}
              </div>
              <ProjectReadyState state={latestDeployment?.readyState} />
            </CardHeader>
            <CardContent className="mt-auto p-5 pt-0">
              <div className="text-xs text-muted-foreground">
                Last deployed {latestDeploymentDate}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ProjectReadyState({ state }: { state: ReadyState }) {
  const stateConfig = {
    BUILDING: {
      icon: <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />,
      text: 'Deploying',
    },
    READY: {
      icon: <div className="h-2 w-2 rounded-full bg-green-500" />,
      text: 'Production',
    },
    UNKNOWN: {
      icon: <div className="h-2 w-2 rounded-full bg-gray-500" />,
      text: 'Unknown',
    },
  };

  const { icon, text } = stateConfig[state] || stateConfig.UNKNOWN;

  return (
    <div className="flex items-center gap-2 bg-muted px-2.5 py-1 rounded-full">
      {icon}
      <span className="text-xs font-medium">{text}</span>
    </div>
  );
}
