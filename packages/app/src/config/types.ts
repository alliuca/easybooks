import localeStrings from 'locales/en.ts';

export interface Intl extends ReactIntl.InjectedIntl {
  formatMessage: (messageDescriptor: { id: keyof typeof localeStrings }) => string;
}
