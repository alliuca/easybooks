import React from 'react';
import { css } from 'emotion';
import { Layout, Divider } from 'antd';
import InvoiceForm from './../../components/InvoiceForm';
const { Content } = Layout;

const NewInvoice = () => (
  <Layout>
    <Content className={styles.content}>
      <h1>New Invoice</h1>
      <Divider />
      <InvoiceForm />
    </Content>
  </Layout>
);

const styles = {
  content: css`
    background-color: #fafafa;
    padding: 50px;
  `,
};

export default NewInvoice;
