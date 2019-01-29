import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

export const Container = styled(Menu)`
  &.ant-menu {
    border-color: #40a9ff;
    background: #40a9ff;
    color: #fff;
  }
`;

export const Item = styled(Menu.Item)`
  .ant-menu-vertical > &.ant-menu-item,
  .ant-menu-vertical > &.ant-menu-item:not(:last-child) {
    padding: 0;

    & > a {
      color: #fff;
    }
  }

  &.ant-menu-item-selected {
    background: #69c0ff !important;
    color: #fff;
  }
`;

export const ItemLink = styled(NavLink)`
  padding: 0 20px;
  transition: inherit;
  color: #fff;

  &:hover,
  &.active {
    background: #69c0ff;
  }
`;
