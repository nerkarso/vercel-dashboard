import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetProjectsProjects, GetProjectsReadyState } from '@vercel/sdk/models/getprojectsop.js';
import { cx } from 'class-variance-authority';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  project: GetProjectsProjects;
  density?: string;
}

export default function ProjectCard({ project, density }: Props) {
  const isCompact = density === 'compact';
  const alias = project?.targets?.production?.alias?.[0];
  const latestDeployment = project?.latestDeployments?.[0];
  const latestDeploymentDate = latestDeployment?.readyAt
    ? formatDistanceToNow(new Date(latestDeployment.readyAt), { addSuffix: true })
    : 'never';

  return (
    <Card className="flex flex-col bg-muted/10 shadow-none">
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
        <ProjectReadyState state={latestDeployment?.readyState} hideText={isCompact} />
      </CardHeader>
      {!isCompact && (
        <CardContent className="mt-auto p-5 pt-0">
          <div className="text-xs text-muted-foreground">Last deployed {latestDeploymentDate}</div>
        </CardContent>
      )}
    </Card>
  );
}

function ProjectReadyState({
  state,
  hideText,
}: {
  state: GetProjectsReadyState | undefined;
  hideText?: boolean;
}) {
  if (!state) return null;

  const stateConfig: any = {
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
    <div
      className={cx('flex items-center gap-2 bg-muted py-1 rounded-full', {
        'px-2.5': !hideText,
        'px-1': hideText,
      })}
      title={text}
    >
      {icon}
      {!hideText && <span className="text-xs font-medium">{text}</span>}
    </div>
  );
}
