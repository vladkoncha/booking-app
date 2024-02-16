'use client';

import { Button, Flex, Layout, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSSProperties } from 'react';

const { Header: AntHeader } = Layout;

const headerStyle: CSSProperties = {
  textAlign: 'center',
  height: '4rem',
  paddingInline: '1.75rem',
  margin: '0.5rem',
  borderRadius: '1.75rem',
  backgroundColor: '#fff',
  background:
    'linear-gradient(166deg, rgba(92,206,255,0.22034751400560226) 35%, rgba(249,174,123,0.2623643207282913) 59%)',
};

export const Header = () => {
  const pathname = usePathname();

  const loginButtonProps =
    pathname === '/login'
      ? ({
          type: 'dashed',
          disabled: true,
        } as const)
      : {};

  return (
    <AntHeader style={headerStyle}>
      <nav>
        <Flex justify="space-between" gap="large">
          <Link href="/">
            <Typography.Text strong underline style={{ fontSize: 18 }}>
              ТревелБук
            </Typography.Text>
          </Link>
          <Link href="/login">
            <Button {...loginButtonProps}>Войти</Button>
          </Link>
        </Flex>
      </nav>
    </AntHeader>
  );
};
