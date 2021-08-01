import moment from 'moment-mini';
import { Locale, CurrencyValues } from 'actions/invoices';

export default {
  locales: {
    [Locale.EN]: {
      key: '',
      invoiceNumber: '',
      dateOfIssue: moment()
        .utc()
        .format(),
      client: 'Acme Inc.',
      currency: { value: CurrencyValues.CAD, symbol: '$' },
      billedTo: 'Acme Inc.\n150 Main Street\nVancouver, BC, Canada\nV6A',
      amount: '0',
      subtotal: '0',
      status: 'Waiting',
      items: [],
      fees: {
        items: [],
        count: 0,
      },
      terms: `Please pay by bank transfer to:\n\nLending Institution: Capital XYZ\nIBAN: XX00X0000000000000000000000\nBIC/SWIFT: BCITITMM\nBank account holder: John Doe`,
      notes: `Non EEC services given in accordance with the Italian Presidential Decree 633/1972 (section 7/ter)\n\nOperation falling under the preferential income tax policy provided by section 1, c. 111-113 Law 208/2015, with consequent VAT and withholding tax exemption.`,
      locale: Locale.EN,
      pdfPath: '',
    },
  },
};
