import TeamSwitcherClient from '@/components/global/TeamSwitcher.client';
import { currentUser } from '@clerk/nextjs/server';

export default async function TeamSwitcher() {
  const user = await currentUser();
  const accounts = user?.privateMetadata?.accounts ?? [];
  const accountActive = user?.privateMetadata?.accountActive ?? null;

  return <TeamSwitcherClient current={accountActive as any} teams={accounts as any} />;
}
