import React from 'react';
import { css } from 'emotion';
import { Menu, Icon } from 'antd';

const MainMenu = () => (
  <Menu className={styles.menu}>
    <Menu.Item key="1" className={styles.menuItem}>
      <Icon type="file-text" /> Invoices
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
    &:hover {
      background: #69c0ff;
      color: #fff;
    }
  `,
};

export default MainMenu;
