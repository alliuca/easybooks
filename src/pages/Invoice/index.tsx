import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import defaults from './defaults';
import { SettingsData, setMessages } from 'actions/app';
import {
  fetchInvoice,
  Locale,
  Invoice as InvoiceProps,
  saveInvoice,
  resetCurrentInvoice,
  downloadInvoicePDF,
} from 'actions/invoices';
import { AppState } from 'reducers/app';
import { InvoicesState } from 'reducers/invoices';
import { ProfileState } from 'reducers/profile';
import { PageContext } from 'providers/Page/context';
import { Text } from 'components';
import Layout from 'components/Layout';
import Spinner from 'components/Spinner';
import InvoiceLocalesTabs from 'components/InvoiceLocalesTabs';
import InvoiceForm from 'components/InvoiceForm';
import InvoiceActions from 'components/InvoiceActions';

interface Props {
  match: RouteComponentProps<{
    number: InvoiceProps['invoiceNumber'];
    locale: Locale;
  }>['match'];
  invoice: InvoicesState['current'];
  settings: AppState['settings'];
  profile: ProfileState;
  fetchInvoice: (number: string) => Promise<void>;
  setMessages: typeof setMessages;
  saveInvoice: Function;
  resetCurrentInvoice: Function;
  downloadInvoicePDF: Function;
}

class Invoice extends PureComponent<Props> {
  static contextType = PageContext;

  async componentDidMount() {
    await this.props.fetchInvoice(this.props.match.params.number);
  }

  componentWillUnmount() {
    this.props.resetCurrentInvoice();
  }

  onLocaleChange = (locale: string) => {
    const {
      match: {
        params: { number },
      },
    } = this.props;
    this.context.goTo(`/invoice/${number}/${locale}`);
  };

  save = async (data: InvoiceProps, options: { stay: boolean }) => {
    const {
      match: {
        params: { locale },
      },
    } = this.props;
    const globals = {
      client: data.client,
      currency: data.currency,
      status: data.status,
    };
    // https://codeburst.io/use-es2015-object-rest-operator-to-omit-properties-38a3ecffe90
    const { client, currency, status, ...currentData } = data;
    const number = currentData.invoiceNumber;

    await this.props.saveInvoice(number, locale, globals, currentData);

    if (!options.stay) {
      await this.props.setMessages({
        id: `save${number}`,
        type: 'success',
        text: `Invoice #${number} has been successfully saved`,
      });
      this.context.goTo(`/invoices`);
    }
  };

  downloadPDF = async (number: InvoiceProps['invoiceNumber'], locale: keyof typeof Locale) => {
    await this.props.downloadInvoicePDF(number, locale);
    const { invoice } = this.props;
    const currentInvoice = invoice && invoice.locales && invoice.locales[locale];
    const pdfPath = currentInvoice && currentInvoice.pdfPath;
    if (currentInvoice && pdfPath) {
      const globals = {
        client: currentInvoice.client,
        currency: currentInvoice.currency,
        status: currentInvoice.status,
      };
      const { client, currency, status, ...currentData } = currentInvoice;
      this.props.saveInvoice(number, locale, globals, currentData);
      window.open(`${process.env.REACT_APP_API}/${pdfPath}`);
    }
  };

  render() {
    const {
      match: {
        params: { number, locale },
      },
      invoice,
      profile,
    } = this.props;
    const locales = invoice && invoice.locales;
    const settings = locales ? locales[locale].settings : this.props.settings;
    const current = locales ? locales[locale] : null;
    const defaultInvoice: InvoiceProps & {
      settings: SettingsData;
    } = {
      ...defaults.locales[Locale.EN],
      key: number,
      invoiceNumber: number,
      settings,
    };

    return (
      <Layout>
        {invoice !== null ? (
          <>
            <Text as="h1" intl={locales ? 'invoice' : 'invoice.new'} values={{ number }} />
            <InvoiceLocalesTabs
              activeKey={locale}
              onChange={this.onLocaleChange}
              locales={locales ? Object.keys(locales) : [Locale.EN]}
            />
            <InvoiceForm
              // key={(current && (current.isSaving || current.saved) && current.key) || locale}
              initialData={locales ? locales[locale] : defaultInvoice}
              save={this.save}
              settings={settings}
              profile={profile}
            />
            <InvoiceActions invoice={current} downloadPDF={this.downloadPDF} />
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = ({
  invoices: { current },
  app: { settings },
  profile,
}: {
  invoices: InvoicesState;
  app: AppState;
  profile: ProfileState;
}) => ({
  invoice: current,
  settings,
  profile,
});

const mapDispatchToProps = {
  fetchInvoice,
  setMessages,
  saveInvoice,
  resetCurrentInvoice,
  downloadInvoicePDF,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
