import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Icon, Input as AntdInput, InputNumber as AntdInputNumber } from 'antd';

export const Container = styled('div')`
  position: relative;
  display: inline-block;
  padding-right: 24px;

  &:hover .anticon-edit {
    display: inline-block;
  }
`;

export const CellIcon = styled(Icon)`
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
  line-height: ${props => (props.type === 'check' ? '28px' : '18px')};
  display: ${props => (props.type === 'check' ? 'inline-block' : 'none')};

  &:hover {
    color: #108ee9;
  }
`;

export const Cell = styled('td')`
  position: relative;
  /* .ant-input-prefix {
    left: auto;
    right: 0;

    & > span {
      position: relative;
      right: attr(width);
      margin-right: 6px;
    }
  } */
`;

export const Input = styled(AntdInput)<{ align: 'left' | 'center' | 'right' }>(
  ({ align }) => css`
    position: relative;
    z-index: 1;
    background: transparent;
    text-align: ${align};
  `
);

export const InputNumber = styled(AntdInputNumber)<{ align: 'left' | 'center' | 'right' }>(
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

export const Prefix = styled('div')`
  position: absolute;
  padding-right: 12px;
  margin-right: 16px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  line-height: 1;
  white-space: nowrap;

  & > span {
    visibility: hidden;
  }
`;
