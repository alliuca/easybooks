import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Input as AntdInput } from 'antd';

export const Cell = styled('td')``;

export const Input = styled(AntdInput)<{ align: 'left' | 'center' | 'right' }>(
  ({ align }) => css`
    position: relative;
    z-index: 1;
    background: transparent;
    text-align: ${align};
  `
);
