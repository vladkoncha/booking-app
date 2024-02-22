import { Metadata } from 'next';

import { HistoryPage } from '@/src/_pages/history';

export const metadata: Metadata = {
  title: 'История',
};

export default function Page() {
  return (
    <main>
      <HistoryPage />
    </main>
  );
}
