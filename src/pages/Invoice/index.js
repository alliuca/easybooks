import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { css } from 'emotion';
import {
  Layout,
  Divider,
  Row,
  Col,
  Button,
} from 'antd';
import Spinner from './../../components/Spinner';
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

class Invoice extends Component {
  state = {
    data: {},
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { number } } } = this.props;
    const res = await axios.get(`http://localhost:3030/api/invoices/${number}`);
    const data = res.data;
    this.setState({ data: data, loading: false });
  }

  deleteInvoice = async number => {
    const { history } = this.props;
    const res = await axios.delete(`http://localhost:3030/api/invoices/${number}`);
    const deleted = res.data;
    history.push({
      pathname: '/invoices',
      state: {
        msg: {
          id: `delete${number}`,
          type: 'success',
          text: deleted
        }
      }
    });
  }

  render() {
    const { match } = this.props;
    const { data, loading } = this.state;
    return (
      <Layout>
        <Content className={styles.content}>
          { !loading ? (
            <Fragment>
            { !data.key
              ? <h1>Invoice #{ match.params.number } not found</h1>
              : (
                <Fragment>
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
                          <span>{ data.invoiceNumber }</span>
                        </div>
                      </Col>
                      <Col span={8} className={styles.columnTotal}>
                        <div>
                          <h5>Invoice Total</h5>
                          <strong>$ { data.amount }</strong>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {/* <Table
                    columns={columns}
                    data={items}
                    pagination={false}
                  /> */}
                  <Row>
                    <Col span={12}>
                      <Button
                        type="primary"
                        icon="download"
                        className={styles.download}
                      >
                        Download .PDF
                      </Button>
                    </Col>
                    <Col span={12} className="text-right">
                      <Button
                        type="danger"
                        icon="delete"
                        className={styles.download}
                        onClick={this.deleteInvoice.bind(this, data.invoiceNumber)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Fragment>
              )
            }
            </Fragment>
          ) : <Spinner /> }
        </Content>
      </Layout>
    );
  }
};

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
