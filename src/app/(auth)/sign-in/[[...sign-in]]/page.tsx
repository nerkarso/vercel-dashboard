import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Page() {
  return (
    <div className="grid place-items-center h-full overflow-auto absolute inset-0 px-4 py-8">
      <SignIn appearance={{ baseTheme: dark }} />
    </div>
  );
}
