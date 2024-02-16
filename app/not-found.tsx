'use client';

import { Flex, Typography } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Flex
        align="center"
        justify="center"
        style={{ marginBlockStart: '3rem', padding: '0.75rem' }}
      >
        <Typography.Title>
          Упс, такой страницы не существует.
          <br />
          Вернуться на <Link href="/"> главную</Link>.
        </Typography.Title>
      </Flex>
    </main>
  );
}
