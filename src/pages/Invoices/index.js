import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { Layout } from 'antd';
import Table from './../../components/Table';
import { data } from './invoices.json';
const { Content } = Layout;

const columns = [
  {
    title: 'Number',
    dataIndex: 'invoiceNumber',
    sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
    render: text => <Link to={`/invoices/${text}`}>{text}</Link>,
  },
  {
    title: 'Date of Issue',
    dataIndex: 'dateOfIssue'
  },
  {
    title: 'Client',
    dataIndex: 'client',
    sorter: (a, b) => a.client.length - b.client.length,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

const Invoices = () => (
  <Layout>
    <Content className={styles.content}>
      <h1>Invoices</h1>
      <Table columns={columns} data={data} />
    </Content>
  </Layout>
);

const styles = {
  content: css`
    background-color: #fafafa;
    padding: 50px;
  `,
};

export default Invoices;
