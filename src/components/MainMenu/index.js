import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { Menu, Icon } from 'antd';

const MainMenu = () => (
  <Menu className={styles.menu}>
    <Menu.Item key="1" className={styles.menuItem}>
      <Link to="/invoices">
        <Icon type="file-text" /> Invoices
      </Link>
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
    color: #fff;
    &:hover {
      background: #69c0ff;
      color: #fff;
    }
    a, a:hover {
      color: currentColor;
    }
  `,
};

export default MainMenu;
