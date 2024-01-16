import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table/interface';
import { Invoice } from 'actions/invoices';
import Button from 'components/Button';
import Currency from 'components/Currency';
import Table from 'components/Table';
import Tag from 'components/Tag';
import Text from 'components/Text';
import utils from 'utils';
import { Tooltip } from 'antd';

export interface Props {
  dataSource: Invoice[]
  duplicateInvoice: Function
  setMessages: Function
}

export interface State {
  actions: {
    duplicate: { loading: boolean };
  };
}

interface InvoicesColumnProps extends ColumnProps<Invoice> {}

type StatusIntlId = 'invoice.statuses.waiting' | 'invoice.statuses.paid';

class InvoicesTable extends PureComponent<Props, State> {
  state = {
    actions: {
      duplicate: { loading: false },
    },
  };
  
  handleDuplicate = async (record: Invoice) => {
    const { dataSource: invoices, duplicateInvoice, setMessages } = this.props;
    const currentInvoice = invoices.length
      ? parseInt(invoices[invoices.length - 1].invoiceNumber, 10)
      : 0;
    const invoiceNumber = utils.pad(currentInvoice + 1)
    
    this.setState({ actions: { duplicate: { loading: true } } });
    await duplicateInvoice(record.invoiceNumber, invoiceNumber);
    this.setState({ actions: { duplicate: { loading: false } } });
    
    await setMessages({
      id: `save${invoiceNumber}`,
      type: 'success',
      text: <Text intl="messages.invoice_duplicated_success" values={{ number: record.invoiceNumber }} />,
    });
  }
  
  columns: InvoicesColumnProps[] = [
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
      render: status => (
        <Tag color={status}>
          <Text intl={`invoice.statuses.${status.toLowerCase()}` as StatusIntlId} />
        </Tag>
      ),
    },
    {
      title: <Text intl="actions" />,
      render: (_, record) => <Tooltip title="Duplicate">
        <Button
          icon="copy"
          loading={this.state.actions.duplicate.loading}
          // onClick={this.handleDuplicate.bind(this, invoice.invoiceNumber, invoice.locale)}
          onClick={() => this.handleDuplicate(record)}
        />
      </Tooltip>
    }
  ];

  render() {
    const { dataSource } = this.props;

    return (
      <Table columns={this.columns} dataSource={dataSource} />
    );
  }
}

export default InvoicesTable;
