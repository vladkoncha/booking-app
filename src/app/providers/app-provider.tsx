'use client';

import { App } from 'antd';
import { ReactNode } from 'react';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <App>{children}</App>;
};
