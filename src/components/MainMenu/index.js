import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'emotion';
import { Menu, Icon } from 'antd';

const MainMenu = () => (
  <Menu className={styles.menu}>
    <Menu.Item key="1" className={styles.menuItem}>
      <NavLink to="/invoices" className={styles.menuItemLink}>
        <Icon type="file-text" /> Invoices
      </NavLink>
    </Menu.Item>
  </Menu>
);

const styles = {
  menu: css`
    border-color: #40a9ff;
    background: #40a9ff;
    color: #fff;
  `,
  menuItem: css`
    &.ant-menu-item {
      padding: 0;

      & > a {
        color: #fff;
      }
    }
    &.ant-menu-item-selected {
      background: #69c0ff !important;
      color: #fff;
    }
  `,
  menuItemLink: css`
    padding: 0 20px;
    transition: inherit;
    color: #fff;

    &:hover, &.active {
      background: #69c0ff;
    }
  `,
};

export default MainMenu;
