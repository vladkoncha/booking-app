'use client';

import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ReactNode } from 'react';

const px2rem = px2remTransformer({
  rootValue: 16,
});

export const PxToRemProvider = ({ children }: { children: ReactNode }) => {
  return <StyleProvider transformers={[px2rem]}>{children}</StyleProvider>;
};
