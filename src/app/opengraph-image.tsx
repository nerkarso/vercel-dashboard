import { APP_DESCRIPTION, APP_TITLE } from '@/config/constants';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = APP_DESCRIPTION;
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col items-center justify-center bg-white relative">
        {/* Background Grid Pattern */}
        <div
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E7EB 1px, transparent 1px),
              linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          tw="absolute inset-0 opacity-30"
        />
        <div tw="flex flex-col items-center bg-white rounded-3xl shadow-xl p-16 relative">
          <h1 tw="text-6xl text-black">{APP_TITLE}</h1>
          <p tw="text-2xl">{APP_DESCRIPTION}</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
