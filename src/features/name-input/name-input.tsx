import { Form, Input } from 'antd';

export const NameInput = ({ name = 'name', label = 'Имя', maxLength = 60 }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите ваше имя',
          whitespace: true,
        },
        {
          validator: (_, value: string) =>
            !value || value.length <= maxLength
              ? Promise.resolve()
              : Promise.reject(new Error('Слишком длинное имя')),
        },
      ]}
    >
      <Input maxLength={maxLength} />
    </Form.Item>
  );
};
