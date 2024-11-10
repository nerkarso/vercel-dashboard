import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vercel Dashboard',
  description: 'Custom Vercel dashboard with better accessibility and UX',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
