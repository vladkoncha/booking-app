'use client';

import { App } from 'antd';
import { ReactNode } from 'react';

export const AntdAppProvider = ({ children }: { children: ReactNode }) => {
  return <App>{children}</App>;
};
