import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { InputNumber as AntdInputNumber } from 'antd';
import { Props } from './index';

export const InputNumber = styled(AntdInputNumber)<Props>(
  ({ align }) => css`
    width: 100%;

    .ant-input-number-handler-wrap {
      display: none;
    }

    input {
      text-align: ${align};
    }
  `
);

export default InputNumber;
