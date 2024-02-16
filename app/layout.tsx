import '@/src/app/styles/globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { AppProvider } from '@/src/app/providers/app-provider';
import { PxToRemProvider } from '@/src/app/providers/px-to-rem-provider';
import { UsersProvider } from '@/src/app/store/users-provider';
import { Header } from '@/src/widgets/header';

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
          <AntdRegistry>
            <AppProvider>
              <UsersProvider>
                <Header />
                {children}
              </UsersProvider>
            </AppProvider>
          </AntdRegistry>
        </PxToRemProvider>
      </body>
    </html>
  );
}
