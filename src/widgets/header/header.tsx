'use client';

import { Flex, Layout, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { CSSProperties, useContext } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';

import { LoginButton } from './ui/login-button';
import { ProfileMenu } from './ui/profile-menu';

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

export const Header = observer(() => {
  const usersStore = useContext(UsersContext);
  const user = usersStore?.getCurrentUser();

  return (
    <AntHeader style={headerStyle}>
      <nav>
        <Flex justify="space-between" gap="large">
          <Link href="/">
            <Typography.Text strong underline style={{ fontSize: '1.25rem' }}>
              ТревелБук
            </Typography.Text>
          </Link>

          {user ? (
            <ProfileMenu
              onLogout={() => usersStore?.setCurrentUserEmail(null)}
            />
          ) : (
            <LoginButton />
          )}
        </Flex>
      </nav>
    </AntHeader>
  );
});
