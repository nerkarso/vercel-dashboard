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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
