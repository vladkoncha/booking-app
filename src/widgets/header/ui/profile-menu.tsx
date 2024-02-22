import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, MenuProps, Space } from 'antd';
import Link from 'next/link';

export const ProfileMenu = ({ onLogout }: { onLogout: () => void }) => {
  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: <Link href="/profile">Настройки</Link>,
    },
    {
      key: 'history',
      label: <Link href="/history">История бронирования</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'login',
      label: (
        <Link href="/login" onClick={onLogout}>
          Выйти
        </Link>
      ),
    },
  ];

  return (
    <Flex align="center" justify="center">
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button>
          <Space>
            Профиль
            <UserOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Flex>
  );
};
