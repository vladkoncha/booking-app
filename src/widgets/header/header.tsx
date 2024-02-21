'use client';

import { UserOutlined } from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Space,
  Typography,
} from 'antd';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CSSProperties, useContext } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';

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
  const pathname = usePathname();
  const usersStore = useContext(UsersContext);
  const user = usersStore?.getCurrentUser();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href="/profile">Настройки</Link>,
    },
    {
      key: '2',
      label: <Link href="/">История бронирования</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: (
        <Link
          href="/login"
          onClick={() => usersStore?.setCurrentUserEmail(null)}
        >
          Выйти
        </Link>
      ),
    },
  ];

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

          {user ? (
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button>
                <Space>
                  Профиль
                  <UserOutlined />
                </Space>
              </Button>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button
                {...loginButtonProps}
                aria-hidden
                tabIndex={-1}
                disabled={!!user}
              >
                Войти
              </Button>
            </Link>
          )}
        </Flex>
      </nav>
    </AntHeader>
  );
});
