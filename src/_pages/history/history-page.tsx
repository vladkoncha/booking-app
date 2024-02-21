'use client';

import withAuth from '@/src/shared/hocs/withAuth';
import { HistoryList } from '@/src/widgets/history-list';

export const HistoryPage = withAuth(() => {
  return <HistoryList />;
});
