import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { css } from 'emotion';
import {
  Layout,
  Divider,
  Row,
  Col,
  Button,
  Popconfirm,
} from 'antd';
import Spinner from './../../components/Spinner';
import Table from './../../components/Table';
import InvoiceForm from './../../components/InvoiceForm';
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
    actions: {
      pdf: { loading: false }
    }
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

  save = async (number, data) => {
    const { history } = this.props;
    const { details, total, subtotal, status, items, fees } = data;
    const res = await axios.post(`http://localhost:3030/api/invoices/${number}`, {
      key: number,
      invoiceNumber: number,
      dateOfIssue: details.dateOfIssue,
      client: details.client,
      currency: details.currency,
      billedTo: details.billedTo,
      amount: total,
      subtotal: subtotal,
      status: status,
      items: items,
      fees: fees,
      terms: details.terms,
      notes: details.notes,
    });
    const saved = res.data;
    history.push({
      pathname: '/invoices',
      state: {
        msg: {
          id: `save${number}`,
          type: 'success',
          text: saved
        }
      }
    });
  }

  downloadPDF = async (number) => {
    const { actions } = this.state;
    const res = await axios.get(`http://localhost:3030/api/invoices/${number}/pdf`);
    const filepath = res.data;
    this.setState({
      actions: {
        ...actions,
        pdf: {
          ...actions.pdf,
          filepath,
          loading: false,
        }
      }
    }, () => window.open(`http://localhost:3030/${filepath}`));
  }

  render() {
    const { match } = this.props;
    const { data, loading, actions } = this.state;
    return (
      <Layout>
        <Content className={styles.content}>
          { !loading ? (
            <Fragment>
            { !data.key
              ? (
                <Fragment>
                  <h1>New Invoice #{ match.params.number }</h1>
                  <Divider />
                  <InvoiceForm number={match.params.number} save={this.save} data={{}} />
                </Fragment>
                )
              : (
                <Fragment>
                  <h1>Invoice #{ match.params.number }</h1>
                  <Divider />
                  <InvoiceForm number={match.params.number} save={this.save} data={data} />
                  <Row>
                    <Col span={12}>
                      <Button
                        type="primary"
                        icon="download"
                        className={styles.download}
                        loading={actions.pdf.loading}
                        onClick={this.downloadPDF.bind(this, data.invoiceNumber)}
                      >
                        { actions.pdf.loading ? 'Getting it...' : 'Download .PDF' }
                      </Button>
                    </Col>
                    <Col span={12} className="text-right">
                      <Popconfirm
                        title="Are you sure delete this invoice?"
                        onConfirm={this.deleteInvoice.bind(this, data.invoiceNumber)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="danger"
                          icon="delete"
                          className={styles.download}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
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
