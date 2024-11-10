'use client';

import { Alert } from '@/components/ui/alert';

export default function Error({ error }: { error: Error }) {
  return <Alert variant="destructive">{error.message}</Alert>;
}
