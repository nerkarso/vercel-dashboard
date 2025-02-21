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
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { useQueryStates } from 'nuqs';
import { useState } from 'react';

export default function ProjectsToolbar() {
  const [searchParams, setQueryStates] = useQueryStates(searchParamsParsers);
  const { search, density, limit } = searchParams;
  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = debounce((value, setQueryStates) => {
    setQueryStates({ search: value });
  }, 500);

  return (
    <div className="flex justify-between gap-3 flex-wrap">
      <div className="w-full max-w-sm flex items-center relative">
        <Search className="w-5 h-5 text-muted-foreground absolute left-3 pointer-events-none" />
        <Input
          className="bg-muted/10 pl-10 h-10"
          name="search"
          placeholder="Search projects..."
          type="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            debouncedSearch(e.target.value, setQueryStates);
          }}
        />
      </div>
      <div className="gap-x-3 gap-y-2 flex items-center flex-col basis-full sm:basis-auto sm:flex-row">
        <Select
          value={density}
          onValueChange={(value) => {
            setQueryStates({ density: value });
          }}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select density" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default density</SelectItem>
            <SelectItem value="compact">Compact density</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={limit ? String(limit) : '9'}
          onValueChange={(value) => {
            setQueryStates({ limit: Number(value) });
          }}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">Show 9 items</SelectItem>
            <SelectItem value="18">Show 18 items</SelectItem>
            <SelectItem value="36">Show 36 items</SelectItem>
            <SelectItem value="999">Show all items</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
