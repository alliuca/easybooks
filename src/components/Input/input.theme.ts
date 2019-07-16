import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Input as AntdInput } from 'antd';
import { Props } from './index';

export const Input = styled(AntdInput)<{ align: Props['align'] }>(
  ({ align }) => css`
    text-align: ${align};
  `
);

export default Input;
