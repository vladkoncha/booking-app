import '@/src/app/styles/globals.css';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { AppProvider } from '@/src/app/app-provider';
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
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
