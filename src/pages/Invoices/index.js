import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import utils from 'utils';
import { fetchInvoices } from 'actions/invoices';
import Page from 'layout/Page';
import Table from 'components/Table';
export const InvoicesContext = createContext();

const columns = [
  {
    title: 'Number',
    dataIndex: 'invoiceNumber',
    sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
    render: text => <Link to={`/invoice/${text}`}>{text}</Link>,
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

class Invoices extends Component {
  componentDidMount() {
    this.props.fetchInvoices();
  }

  handleAdd = () => {
    const { history, invoices } = this.props;
    const currentInvoice = invoices.length > 0 ? parseInt(invoices[invoices.length - 1].invoiceNumber, 10) : 0;
    history.push(`/invoice/${utils.pad(currentInvoice + 1)}`);
  }

  render() {
    const { invoices } = this.props;

    return (
      <Page>
        <Row gutter={15}>
          <Col span={12}>
            <h1>Invoices</h1>
          </Col>
          <Col span={12} className="text-right">
            <Button
              type="primary"
              icon="plus-circle-o"
              onClick={this.handleAdd}
            >
              Create New Invoice
            </Button>
          </Col>
        </Row>
        <Table columns={columns} data={invoices} />
      </Page>
    );
  }
}

const mapStateToProps = ({ invoices: { all } }) => ({
  invoices: all,
});

const mapDispatchToProps = {
  fetchInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
