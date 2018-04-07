import React from 'react';
import { css } from 'emotion';
import { Layout } from 'antd';
const { Content } = Layout;

const Home = () => (
  <Layout>
    <Content className={styles.content}>Content</Content>
  </Layout>
);

const styles = {
  content: css`
    background-color: #fafafa;
    padding: 50px;
  `,
};

export default Home;
