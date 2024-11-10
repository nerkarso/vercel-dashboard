'use client';

import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { PROJECTS_LIMIT } from '@/config/constants';
import { searchParamsParsers } from '@/lib/search-params';
import { useQueryStates } from 'nuqs';

export default function ProjectsToolbar() {
  const [searchParams, setQueryStates] = useQueryStates(searchParamsParsers);
  const { search, limit } = searchParams;

  return (
    <div className="flex justify-between gap-2 flex-wrap">
      <form className="w-full max-w-sm">
        <Input
          className="bg-background"
          name="search"
          placeholder="Search projects and press enter..."
          type="search"
          value={search ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setQueryStates({ search: value });
            if (value === '') setTimeout(() => window.location.reload(), 500);
          }}
        />
      </form>
      <div className="space-x-2">
        <Toggle
          aria-label="Toggle all"
          className="bg-background px-4"
          pressed={limit === 999}
          variant="outline"
          onPressedChange={(pressed) => {
            setQueryStates({ limit: pressed ? 999 : PROJECTS_LIMIT });
            setTimeout(() => window.location.reload(), 500);
          }}
        >
          Show All
        </Toggle>
      </div>
    </div>
  );
}
