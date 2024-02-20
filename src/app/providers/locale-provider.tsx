'use client';

import 'dayjs/locale/ru';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { ReactNode } from 'react';

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider locale={ruRU}>{children}</ConfigProvider>;
};
