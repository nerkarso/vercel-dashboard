import { PROJECTS_LIMIT } from '@/config/constants';
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const searchParamsParsers = {
  search: parseAsString.withDefault(''),
  limit: parseAsInteger.withDefault(PROJECTS_LIMIT),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
