import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tryCatch<V>(promise: Promise<V>) {
  return Promise.allSettled([promise]).then(function ([{ value, reason }]: any) {
    return [value as V, reason as Error];
  });
}
