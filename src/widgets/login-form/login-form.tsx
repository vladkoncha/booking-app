'use client';

import { App, Button, Flex, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { UsersContext } from '@/src/app/store/users-provider';

import { FormModel } from './types';

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const LoginForm = () => {
  const usersStore = useContext(UsersContext);
  const { notification } = App.useApp();
  const router = useRouter();

  const handleSubmit = (values: FormModel) => {
    if (
      !usersStore?.getUser(values.email) ||
      usersStore?.getUser(values.email)?.password !== values.password
    ) {
      notification?.error({
        message: 'Ошибка входа',
        description: 'Неверный email или пароль',
      });
      return;
    }

    usersStore?.setCurrentUserEmail(values.email);
    notification?.success({
      message: 'Вы успешно авторизовались!',
      description: 'Переходим на главную страницу',
    });
    router.push('/');
  };

  return (
    <Flex vertical gap="middle" align="center">
      <Flex vertical style={{ marginBlockStart: '3rem', padding: '2rem' }}>
        <Title>Добро пожаловать на ТревелБук!</Title>
        <Form
          {...formItemLayout}
          name="login"
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Некорректный email адрес',
              },
              {
                required: true,
                message: 'Пожалуйста, введите ваш email адрес',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              style={{ width: '100%' }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text strong style={{ alignSelf: 'flex-end' }}>
          Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link>
        </Typography.Text>
      </Flex>
    </Flex>
  );
};
