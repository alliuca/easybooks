import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table/interface';
import utils from 'utils';
import { PageContext } from 'providers/Page/context';
import { Locale } from 'actions/invoices';
import { Invoice, fetchInvoices } from 'actions/invoices';
import { RootState } from 'reducers';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Table from 'components/Table';
import Text from 'components/Text';
import Tag from 'components/Tag';
import Currency from 'components/Currency';

interface Props extends RouteComponentProps {
  fetchInvoices: () => Promise<void>;
  invoices: Invoice[];
}

interface InvoicesColumnProps extends ColumnProps<Invoice> {}

const columns: InvoicesColumnProps[] = [
  {
    title: <Text intl="invoice.number" />,
    dataIndex: 'invoiceNumber',
    sorter: (a, b) => parseInt(a.invoiceNumber) - parseInt(b.invoiceNumber),
    render: (number: string, invoice: Invoice) => (
      <Link to={`/invoice/${number}/${invoice.locale}`}>{number}</Link>
    ),
  },
  {
    title: <Text intl="invoice.date_of_issue" />,
    dataIndex: 'dateOfIssue',
    render: (date: Date) => <Text type="date" value={date} />,
  },
  {
    title: <Text intl="client" />,
    dataIndex: 'client',
    sorter: (a, b) => a.client.length - b.client.length,
  },
  {
    title: <Text intl="invoice.form.amount" />,
    dataIndex: 'amount',
    sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount),
    render: (amount: number, invoice: Invoice) => (
      <Currency value={parseFloat(invoice.amount)} currency={invoice.currency.value} />
    ),
  },
  {
    title: <Text intl="status" />,
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    render: status => <Tag color={status}>{status}</Tag>,
  },
];

class Invoices extends Component<Props> {
  static contextType = PageContext;

  componentDidMount() {
    this.props.fetchInvoices();
  }

  handleAdd = () => {
    const { invoices } = this.props;
    const currentInvoice = invoices.length
      ? parseInt(invoices[invoices.length - 1].invoiceNumber, 10)
      : 0;
    this.context.goTo(`/invoice/${utils.pad(currentInvoice + 1)}/${Locale.EN}`);
  };

  render() {
    const { invoices } = this.props;

    return (
      <Layout>
        <Header
          left={<Text as="h1" intl="invoices.title" />}
          right={
            <Button type="primary" icon="plus-circle-o" onClick={this.handleAdd}>
              <Text intl="invoices.create_new" />
            </Button>
          }
        />
        <Table columns={columns} dataSource={invoices} />
      </Layout>
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
