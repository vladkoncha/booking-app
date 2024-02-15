import '@/src/app/styles/globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { PxToRemProvider } from '@/src/app/px-to-rem-provider';

const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | ТревелБук',
    default: 'ТревелБук',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <PxToRemProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </PxToRemProvider>
      </body>
    </html>
  );
}
