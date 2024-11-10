import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-semibold text-center">Unauthorized</CardTitle>
          <CardDescription className="text-center">
            You are not allowed to see what's behind this page
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
