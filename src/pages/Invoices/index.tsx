import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table/interface';
import utils from 'utils';
import { Invoice, fetchInvoices } from 'actions/invoices';
import { RootState } from 'reducers';
import Page from 'layout/Page';
import Table from 'components/Table';
import Text from 'components/Text';

interface Props extends RouteComponentProps {
  fetchInvoices: () => Promise<void>;
  invoices: Invoice[];
}

interface InvoicesColumnProps extends ColumnProps<Invoice> {}

const columns: InvoicesColumnProps[] = [
  {
    title: 'Number',
    dataIndex: 'invoiceNumber',
    sorter: (a, b) => parseInt(a.invoiceNumber) - parseInt(b.invoiceNumber),
    render: (text: string) => <Link to={`/invoice/${text}`}>{text}</Link>,
  },
  {
    title: 'Date of Issue',
    dataIndex: 'dateOfIssue',
  },
  {
    title: 'Client',
    dataIndex: 'client',
    sorter: (a, b) => a.client.length - b.client.length,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

class Invoices extends Component<Props> {
  componentDidMount() {
    this.props.fetchInvoices();
  }

  handleAdd = () => {
    const { history, invoices } = this.props;
    const currentInvoice = invoices.length
      ? parseInt(invoices[invoices.length - 1].invoiceNumber, 10)
      : 0;
    history.push(`/invoice/${utils.pad(currentInvoice + 1)}`);
  };

  render() {
    const { invoices } = this.props;

    return (
      <Page>
        <Row gutter={15}>
          <Col span={12}>
            <Text as="h1" intl="invoices.title" />
          </Col>
          <Col span={12} className="text-right">
            <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd}>
              <Text intl="invoices.create_new" />
            </Button>
          </Col>
        </Row>
        <Table columns={columns} data={invoices} />
      </Page>
    );
  }
}

const mapStateToProps = ({ invoices: { all } }: RootState) => ({
  invoices: all,
});

const mapDispatchToProps = {
  fetchInvoices,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices);
