'use client';

import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Page() {
  return <UserProfile path="/user-profile" routing="path" appearance={{ baseTheme: dark }} />;
}
