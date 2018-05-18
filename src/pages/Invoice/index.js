import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  setMessages,
  clearAllMessages,
  fetchSettings,
} from 'actions/app';
import {
  resetCurrentInvoice,
  fetchInvoice,
  deleteInvoice,
  saveInvoice,
  downloadInvoicePDF,
} from 'actions/invoices';
import {
  Divider,
  Row,
  Col,
  Button,
  Popconfirm,
} from 'antd';
import Page from 'layout/Page';
import Spinner from 'components/Spinner';
import InvoiceForm from 'components/InvoiceForm';

class Invoice extends Component {
  state = {
    actions: {
      pdf: { loading: false }
    }
  }

  async componentDidMount() {
    const { match: { params: { number } } } = this.props;
    await this.props.fetchSettings();
    await this.props.fetchInvoice(number);
    this.props.clearAllMessages();
  }

  componentWillUnmount() {
    this.props.resetCurrentInvoice();
  }

  deleteInvoice = async number => {
    const { history } = this.props;
    this.props.deleteInvoice(number);
    this.props.setMessages({
      id: `delete${number}`,
      type: 'success',
      text: `Invoice #${number} has been deleted`,
    });
    history.push('/invoices');
  }

  save = async (number, data) => {
    const { history, settings: { brandColor, logo } } = this.props;
    const { details, total, subtotal, status, items, fees } = data;
    await this.props.saveInvoice(number, {
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
      settings: {
        brandColor,
        logo: logo ? logo.file.name : null,
      },
    });
    await this.props.setMessages({
      id: `save${number}`,
      type: 'success',
      text: `Invoice #${number} has been successfully saved`,
    });
    history.push('/invoices');
  }

  downloadPDF = async (number) => {
    const { actions } = this.state;
    this.setState({
      actions: {
        ...actions,
        pdf: {
          loading: false,
        }
      }
    });
    await this.props.downloadInvoicePDF(number);
    window.open(`${process.env.REACT_APP_API}/${this.props.invoice.filepath}`)
  }

  render() {
    const { match: { params: { number } }, invoice, settings } = this.props;
    const { actions } = this.state;

    return (
      <Page>
        { invoice ? (
          <Fragment>
          { !invoice.key
            ? (
              <Fragment>
                <h1>New Invoice #{ number }</h1>
                <Divider />
                <InvoiceForm number={number} save={this.save} data={{}} settings={settings} />
              </Fragment>
              )
            : (
              <Fragment>
                <h1>Invoice #{ number }</h1>
                <Divider />
                <InvoiceForm number={number} save={this.save} data={invoice} settings={settings} />
                <Row>
                  <Col span={12}>
                    <Button
                      type="primary"
                      icon="download"
                      className="mt30"
                      loading={actions.pdf.loading}
                      onClick={this.downloadPDF.bind(this, invoice.invoiceNumber)}
                    >
                      { actions.pdf.loading ? 'Getting it...' : 'Download .PDF' }
                    </Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Popconfirm
                      title="Are you sure you want to delete this invoice?"
                      onConfirm={this.deleteInvoice.bind(this, invoice.invoiceNumber)}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="danger"
                        icon="delete"
                        className="mt30"
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
      </Page>
    );
  }
};

const mapStateToProps = ({ invoices: { current }, app: { settings } }) => ({
  invoice: current,
  settings,
});

const mapDispatchToProps = {
  setMessages,
  clearAllMessages,
  resetCurrentInvoice,
  fetchSettings,
  fetchInvoice,
  deleteInvoice,
  saveInvoice,
  downloadInvoicePDF,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
