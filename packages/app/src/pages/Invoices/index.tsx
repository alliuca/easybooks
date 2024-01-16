import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import utils from 'utils';
import { PageContext } from 'providers/Page/context';
import { setMessages } from 'actions/app';
import { Locale, saveInvoice, duplicateInvoice } from 'actions/invoices';
import { Invoice, fetchInvoices } from 'actions/invoices';
import { RootState } from 'reducers';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Text from 'components/Text';
import InvoicesTable from 'components/InvoicesTable';

interface Props {
  fetchInvoices: () => Promise<void>;
  saveInvoice: Function;
  duplicateInvoice: Function;
  invoices: Invoice[];
  setMessages: typeof setMessages;
}

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
        <InvoicesTable
          dataSource={invoices}
          duplicateInvoice={this.props.duplicateInvoice}
          setMessages={this.props.setMessages}
        />
      </Layout>
    );
  }
}

const mapStateToProps = ({ invoices: { all } }: RootState) => ({
  invoices: all,
});

const mapDispatchToProps = {
  fetchInvoices,
  saveInvoice,
  duplicateInvoice,
  setMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoices);
