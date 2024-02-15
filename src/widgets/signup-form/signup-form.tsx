'use client';

import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import Link from 'next/link';

import { FormModel } from './types';

const { Title } = Typography;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Input disabled style={{ width: '2.5rem' }} value="+7" />
  </Form.Item>
);

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

export const SignupForm = () => {
  const handleSubmit = (values: FormModel) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Flex vertical gap="middle" align="center">
      <Flex vertical style={{ marginBlockStart: '3rem', padding: '2rem' }}>
        <Title>Добро пожаловать на ТревелБук!</Title>
        <Form
          {...formItemLayout}
          name="signup"
          onFinish={handleSubmit}
          initialValues={{
            prefix: '+7',
          }}
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

          <Form.Item
            hasFeedback
            name="confirm"
            label="Подтвердите пароль"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите ваш пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Введенные пароли не совпадают!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваше имя',
                whitespace: true,
              },
              {
                validator: (_, value: string) =>
                  value.length <= 60
                    ? Promise.resolve()
                    : Promise.reject(new Error('Слишком длинное имя')),
              },
            ]}
          >
            <Input maxLength={60} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш номер телефона',
              },
              {
                validator: (_, value: string) =>
                  value.length === 10
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          'Некорректная длина, проверьте номер телефона'
                        )
                      ),
              },
              {
                validator: (_, value: string) =>
                  value.match(/^[0-9]*$/)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          'Номер телефона должен содержать только цифры'
                        )
                      ),
              },
            ]}
          >
            <Input
              prefix={prefixSelector}
              style={{ width: '100%' }}
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('Пожалуйста, прочитайте и примите условия')
                      ),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              Я прочитал(а) <Link href="">условия</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              style={{ width: '100%' }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Создать аккаунт
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text strong style={{ alignSelf: 'flex-end' }}>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </Typography.Text>
      </Flex>
    </Flex>
  );
};
