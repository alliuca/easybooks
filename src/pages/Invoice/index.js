import React from 'react';
import { css } from 'emotion';
import {
  Layout,
  Divider,
  Row,
  Col,
  Button,
} from 'antd';
import Table from './../../components/Table';
import { details, items } from './invoice00001.json';
const { Content } = Layout;

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];

const Invoice = ({ match }) => (
  <Layout>
    <Content className={styles.content}>
      <h1>Invoice #{ match.params.number }</h1>
      <Divider />
      <div>
        <Row gutter={15}>
          <Col span={8}>
            <div>
              <h5>Billed To:</h5>
              <address>
                Acme Inc.<br />
                150 Main Street<br />
                Vancouver, BC, Canada<br />
                V6A
              </address>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <h5>Invoice Number</h5>
              <span>{ details.invoiceNumber }</span>
            </div>
          </Col>
          <Col span={8} className={styles.columnTotal}>
            <div>
              <h5>Invoice Total</h5>
              <strong>$ { details.amount }</strong>
            </div>
          </Col>
        </Row>
      </div>
      <Table
        columns={columns}
        data={items}
        pagination={false}
      />
      <Button
        type="primary"
        icon="download"
        className={styles.download}
      >
        Download .PDF
      </Button>
    </Content>
  </Layout>
);

const styles = {
  content: css`
    background-color: #fafafa;
    padding: 50px;
  `,
  columnTotal: css`
    text-align: right;

    strong {
      font-size: 30px;
      font-weight: normal;
    }
  `,
  download: css`
    margin-top: 30px;
  `,
};

export default Invoice;
