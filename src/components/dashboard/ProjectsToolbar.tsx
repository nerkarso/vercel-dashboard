'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { searchParamsParsers } from '@/lib/search-params';
import { Search } from 'lucide-react';
import { useQueryStates } from 'nuqs';

export default function ProjectsToolbar() {
  const [searchParams, setQueryStates] = useQueryStates(searchParamsParsers);
  const { search, limit } = searchParams;

  return (
    <div className="flex justify-between gap-3 flex-wrap">
      <form className="w-full max-w-sm flex items-center relative">
        <Search className="w-5 h-5 text-muted-foreground absolute left-3 pointer-events-none" />
        <Input
          className="bg-muted/10 pl-10 h-10"
          name="search"
          placeholder="Search projects..."
          type="search"
          value={search ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setQueryStates({ search: value });
            if (value === '') setTimeout(() => window.location.reload(), 500);
          }}
        />
      </form>
      <div className="gap-x-3 gap-y-2 flex items-center flex-col basis-full sm:basis-auto sm:flex-row">
        <Select onValueChange={(value) => {}}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select density" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="comfortable">Comfortable</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            setQueryStates({ limit: value === 'all' ? 999 : Number(value) });
            setTimeout(() => window.location.reload(), 500);
          }}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="all">Show All</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
