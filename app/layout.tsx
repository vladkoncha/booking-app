import '@/src/app/styles/globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { AppProvider } from '@/src/app/providers/app-provider';
import { LocaleProvider } from '@/src/app/providers/locale-provider';
import { PxToRemProvider } from '@/src/app/providers/px-to-rem-provider';
import { HotelsProvider } from '@/src/app/store/hotels/hotels-provider';
import { ReservationsProvider } from '@/src/app/store/reservations/reservations-provider';
import { UsersProvider } from '@/src/app/store/users/users-provider';
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
        <LocaleProvider>
          <PxToRemProvider>
            <AntdRegistry>
              <AppProvider>
                <UsersProvider>
                  <HotelsProvider>
                    <ReservationsProvider>
                      <Header />
                      {children}
                    </ReservationsProvider>
                  </HotelsProvider>
                </UsersProvider>
              </AppProvider>
            </AntdRegistry>
          </PxToRemProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
