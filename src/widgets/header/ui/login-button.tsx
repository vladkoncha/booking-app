'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const LoginButton = () => {
  const pathname = usePathname();

  const loginButtonProps =
    pathname === '/login'
      ? ({
          type: 'dashed',
          disabled: true,
        } as const)
      : {};

  return (
    <Link href="/login">
      <Button {...loginButtonProps} aria-hidden tabIndex={-1}>
        Войти
      </Button>
    </Link>
  );
};
