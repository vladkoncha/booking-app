import { Metadata } from 'next';

import { ProfilePage } from '@/src/_pages/profile';

export const metadata: Metadata = {
  title: 'Профиль',
};

export default function Page() {
  return (
    <main>
      <ProfilePage />
    </main>
  );
}
