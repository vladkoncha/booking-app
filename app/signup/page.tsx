import { Metadata } from 'next';

import { SignupPage } from '@/src/_pages/signup';

export const metadata: Metadata = {
  title: 'Регистрация',
};

export default function Page() {
  return (
    <main>
      <SignupPage />
    </main>
  );
}
