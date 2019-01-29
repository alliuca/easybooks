import styled from '@emotion/styled';
import { Icon } from 'antd';

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
