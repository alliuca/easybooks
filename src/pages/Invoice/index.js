import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currencies } from 'config';
import { setMessages, clearAllMessages, fetchSettings } from 'actions/app';
import {
  resetCurrentInvoice,
  fetchInvoiceLocales,
  fetchInvoice,
  deleteInvoice,
  saveInvoice,
  downloadInvoicePDF,
} from 'actions/invoices';
import { Row, Col, Button, Popconfirm, Tabs, Input, Modal } from 'antd';
import Page from 'layout/Page';
import Spinner from 'components/Spinner';
import InvoiceForm from 'components/InvoiceForm';
import MyIcon from 'components/Icon';
const { TabPane } = Tabs;

class Invoice extends Component {
  state = {
    actions: {
      pdf: { loading: false },
    },
    addLocaleModalVisible: false,
    localLocales: [],
  };

  async componentDidMount() {
    const {
      history,
      match: {
        params: { number, locale },
      },
    } = this.props;
    await this.props.fetchSettings();
    await this.props.fetchInvoiceLocales(number);
    if (!locale) history.replace(`${number}/${this.props.invoice.locales[0]}`);
    await this.props.fetchInvoice(number, locale);
    this.props.clearAllMessages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.fetchInvoice(this.props.match.params.number, this.props.match.params.locale);
    }
  }

  componentWillUnmount() {
    this.props.resetCurrentInvoice();
  }

  onLocaleChange = locale => {
    const {
      history,
      match: {
        params: { number },
      },
    } = this.props;
    history.push(`/invoice/${number}/${locale}`);
  };

  onLocaleEdit = (e, action) => {
    if (action === 'add') {
      this.setState({ addLocaleModalVisible: true });
    }
  };

  add = locale => {
    console.log('asd', locale);
    const { invoice } = this.props;
    const locales = invoice.locales;
    console.log('locales', locales);
    this.setState({ localLocales: [...this.state.localLocales, locale] });
  };

  handleOk = () => {
    const locale = this.localeInput.input.value;
    this.setState({ addLocaleModalVisible: false });
    if (locale) {
      this.add(locale);
    }
  };

  onLocaleInputChange = e => {
    console.log(e.target.value);
  };

  deleteInvoice = async number => {
    const {
      history,
      match: {
        params: { locale },
      },
    } = this.props;
    this.props.deleteInvoice(number, locale.toUpperCase());
    this.props.setMessages({
      id: `delete${number}`,
      type: 'success',
      text: `Invoice #${number} has been deleted`,
    });
    history.push('/invoices');
  };

  save = async (number, data) => {
    const {
      history,
      match: {
        params: { locale },
      },
      settings: { brandColor, logo },
    } = this.props;
    const { details, total, subtotal, items, fees } = data;
    await this.props.saveInvoice(number, locale.toUpperCase(), {
      key: number,
      invoiceNumber: number,
      dateOfIssue: details.dateOfIssue,
      client: details.client,
      currency: {
        value: details.currency.value,
        symbol: currencies[details.currency.value].symbol,
      },
      billedTo: details.billedTo,
      amount: total,
      subtotal: subtotal,
      status: details.status,
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
  };

  downloadPDF = async (number, locale) => {
    const { actions } = this.state;
    this.setState({
      actions: {
        ...actions,
        pdf: {
          loading: false,
        },
      },
    });
    await this.props.downloadInvoicePDF(number, locale);
    window.open(`${process.env.REACT_APP_API}/${this.props.invoice.filepath}`);
  };

  render() {
    const {
      match: {
        params: { number, locale },
      },
      invoice,
      settings,
      profile,
    } = this.props;
    const { actions, localLocales } = this.state;
    console.log('invoice', invoice);

    return (
      <Page>
        {invoice && (invoice.message || invoice.key) ? (
          <>
            <Modal
              visible={this.state.addLocaleModalVisible}
              width={280}
              okText="Add Locale"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <br />
              <Input
                ref={i => {
                  this.localeInput = i;
                }}
                name="new-locale"
                placeholder="Locale code (e.g. en for English)"
              />
            </Modal>
            {!invoice.key ? (
              <>
                <h1>New Invoice #{number}</h1>
                <Tabs
                  onChange={this.onLocaleChange}
                  activeKey={invoice.locales[0]}
                  onEdit={this.onLocaleEdit}
                  type="editable-card"
                >
                  {[...invoice.locales, ...localLocales].map(locale => (
                    <TabPane
                      key={locale.toLowerCase()}
                      tab={
                        <span>
                          <MyIcon type={`icon-locale-${locale.toLowerCase()}`} />
                        </span>
                      }
                      closable={true}
                    />
                  ))}
                </Tabs>
                <InvoiceForm
                  number={number}
                  save={this.save}
                  data={{}}
                  locale={'en'}
                  settings={settings}
                  profile={profile}
                />
              </>
            ) : (
              <>
                <h1>Invoice #{number}</h1>
                <Tabs
                  onChange={this.onLocaleChange}
                  activeKey={locale}
                  onEdit={this.onLocaleEdit}
                  type="editable-card"
                  // tabPosition="bottom"
                  // tabBarExtraContent={
                  //   <Popover
                  //     content={
                  //       <Input
                  //         name="new-locale"
                  //         placeholder="Locale code (e.g. en for English)"
                  //       />
                  //     }
                  //     trigger="click"
                  //     placement="left"
                  //   >
                  //     <Button size="small" onClick={this.onLocaleAdd}><Icon type="plus" /></Button>
                  //   </Popover>
                  // }
                >
                  {[...invoice.locales, ...localLocales].map(locale => (
                    <TabPane
                      key={locale}
                      tab={
                        <span>
                          <MyIcon type={`icon-locale-${locale.toLowerCase()}`} />
                        </span>
                      }
                      closable={true}
                    />
                  ))}
                </Tabs>
                <InvoiceForm
                  number={number}
                  save={this.save}
                  data={invoice}
                  locale={locale}
                  settings={settings}
                  profile={profile}
                />
                <Row>
                  <Col span={12}>
                    <Button
                      type="primary"
                      icon="download"
                      className="mt30 mt15"
                      loading={actions.pdf.loading}
                      onClick={this.downloadPDF.bind(
                        this,
                        invoice.invoiceNumber,
                        locale.toLowerCase()
                      )}
                    >
                      {actions.pdf.loading ? 'Getting it...' : 'Download .PDF'}
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
                      <Button type="danger" icon="delete" className="mt30 mb30">
                        Delete
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </Page>
    );
  }
}

const mapStateToProps = ({ invoices: { current }, app: { settings }, profile }) => ({
  invoice: current,
  settings,
  profile,
});

const mapDispatchToProps = {
  setMessages,
  clearAllMessages,
  resetCurrentInvoice,
  fetchSettings,
  fetchInvoiceLocales,
  fetchInvoice,
  deleteInvoice,
  saveInvoice,
  downloadInvoicePDF,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
