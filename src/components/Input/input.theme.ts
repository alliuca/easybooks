import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Input as AntdInput } from 'antd';
import { Props } from './index';
const AntdInputGroup = AntdInput.Group;

export const Input = styled(AntdInput)<{ align: Props['align'] }>(
  ({ align }) => css`
    text-align: ${align};
  `
);

export const Group = styled(AntdInputGroup)`
  display: flex !important;

  > input,
  > div {
    flex: 1 1 0 !important;
    margin: 0;
  }
`;

export default Input;
