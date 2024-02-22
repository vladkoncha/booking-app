import { Form, Input } from 'antd';

export const PhoneInput = ({ name = 'phone', label = 'Номер телефона' }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите ваш номер телефона',
        },
        {
          validator: (_, value: string) =>
            !value || value.length === 10
              ? Promise.resolve()
              : Promise.reject(
                  new Error('Некорректная длина, проверьте номер телефона')
                ),
        },
        {
          validator: (_, value: string) =>
            !value || value.match(/^[0-9]*$/)
              ? Promise.resolve()
              : Promise.reject(
                  new Error('Номер телефона должен содержать только цифры')
                ),
        },
      ]}
    >
      <Input addonBefore="+7" style={{ width: '100%' }} maxLength={10} />
    </Form.Item>
  );
};
