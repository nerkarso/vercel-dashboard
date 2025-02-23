import { ThemeProvider } from '@/components/global/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { APP_DESCRIPTION, APP_TITLE, IMAGE_PLACEHOLDER } from '@/config/constants';
import { TRPCReactProvider } from '@/trpc/client';
import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link href={IMAGE_PLACEHOLDER} rel="icon" />
      </head>
      <body>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          <NuqsAdapter>
            <ClerkProvider>
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </ClerkProvider>
          </NuqsAdapter>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
