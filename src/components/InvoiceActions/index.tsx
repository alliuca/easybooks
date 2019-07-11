import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import { Button } from 'components';
import { Row, Col } from 'components/Grid';
import { Invoice, Locale } from 'actions/invoices';

enum InvoiceAction {
  pdf = 'pdf',
}

export interface Props {
  invoice: Invoice | null;
  downloadPDF: Function;
}

export interface State {
  actions: {
    [key in InvoiceAction]: { loading: boolean };
  };
}

class InvoiceActions extends Component<Props, State> {
  state = {
    actions: {
      pdf: { loading: false },
    },
  };

  downloadPDF = async (number: Invoice['invoiceNumber'], locale: keyof typeof Locale) => {
    const { downloadPDF } = this.props;
    const { actions } = this.state;

    let newActions = { ...actions };
    newActions = { ...newActions.pdf, pdf: { loading: true } };
    this.setState({ actions: newActions });
    await downloadPDF(number, locale);
    newActions = { ...newActions.pdf, pdf: { loading: false } };
    this.setState({ actions: newActions });
  };

  render() {
    const { invoice } = this.props;
    const { actions } = this.state;

    return (
      <Row type="flex" justify="space-between" margin="0 0 15px 0">
        {invoice && (
          <>
            <Col>
              <Button
                type="primary"
                icon="download"
                className="mt30 mt15"
                loading={actions.pdf.loading}
                onClick={this.downloadPDF.bind(this, invoice.invoiceNumber, invoice.locale)}
              >
                {actions.pdf.loading ? 'Getting it...' : 'Download .PDF'}
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure you want to delete this invoice?"
                // onConfirm={this.deleteInvoice.bind(this, invoice.invoiceNumber)}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon="delete" className="mt30 mb30">
                  Delete
                </Button>
              </Popconfirm>
            </Col>
          </>
        )}
      </Row>
    );
  }
}

export default InvoiceActions;