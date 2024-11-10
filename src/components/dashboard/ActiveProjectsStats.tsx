import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjectsCount } from '@/lib/vercel/api';
import { Globe } from 'lucide-react';

export default async function ActiveProjectsStats() {
  const count = await getProjectsCount();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        {/* <p className="text-xs text-muted-foreground mt-1">+2 new projects this week</p> */}
      </CardContent>
    </Card>
  );
}
