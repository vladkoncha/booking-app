import { Metadata } from 'next';

import { LoginPage } from '@/src/_pages/login';

export const metadata: Metadata = {
  title: 'Вход',
};

export default function Page() {
  return (
    <main>
      <LoginPage />
    </main>
  );
}
