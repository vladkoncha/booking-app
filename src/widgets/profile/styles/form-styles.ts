import { GlobalToken } from 'antd';

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const tailFormItemLayout = {
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

export const getformStyle = (token: GlobalToken) => ({
  width: '100%',
  maxWidth: '45rem',
  margin: '0 auto',
  padding: '1.5rem',
  background: token.colorFillAlter,
  borderRadius: token.borderRadiusLG,
});
