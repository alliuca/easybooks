import React from 'react';
import { css } from 'emotion';
import { Layout, Divider } from 'antd';
import User from './../User';
import MainMenu from './../MainMenu';
const { Sider } = Layout;

const MainSider = () => (
  <Sider width={200} className={styles.sider}>
    <div className={styles.top}>
      <User withShortInfo />
      <Divider />
    </div>
    <MainMenu />
  </Sider>
);

const styles = {
  sider: css`
    background: #40a9ff;
    color: #fff;
  `,
  top: css`
    padding: 20px 20px 0;
  `,
};

export default MainSider;
