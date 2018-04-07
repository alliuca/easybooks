import React from 'react';
import { css } from 'emotion';
import { Layout } from 'antd';
const { Content } = Layout;

const Invoice = ({ match }) => (
  <Layout>
    <Content className={styles.content}>
      <h1>Invoice #{ match.params.number }</h1>
      ...content
    </Content>
  </Layout>
);

const styles = {
  content: css`
    background-color: #fafafa;
    padding: 50px;
  `,
};

export default Invoice;
