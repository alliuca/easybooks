import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en'; // eslint-disable-line
import itLocaleData from 'react-intl/locale-data/it'; // eslint-disable-line
import enMessages from 'locales/en.ts';
import itMessages from 'locales/it.ts';
import { RootState } from 'reducers';
import ProtectedRoute from 'pages/ProtectedRoute';
import Home from 'pages/Home';
import Invoices from 'pages/Invoices';
import Invoice from 'pages/Invoice';
import Settings from 'pages/Settings';
import Profile from 'pages/Profile';
import SignIn from 'pages/SignIn';
import Page from 'providers/Page';
import { fetchSettings } from 'actions/app';
import { fetchProfile } from 'actions/profile';
import Center from 'components/Center';
import Spinner from 'components/Spinner';
addLocaleData([...enLocaleData, ...itLocaleData]);
const messages: {
  [key: string]: typeof enMessages;
} = {
  en: enMessages,
  it: itMessages,
};

// if (process.env.NODE_ENV !== 'production') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
//   whyDidYouRender(React, { trackHooks: false, include: [/^Invoice$/] });
// }

interface Props {
  locale: string;
  fetchSettings: () => ReturnType<ReturnType<typeof fetchSettings>>;
  fetchProfile: () => ReturnType<ReturnType<typeof fetchProfile>>;
}

class App extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchSettings();
    this.props.fetchProfile();
  }

  render() {
    const { locale } = this.props;

    return locale ? (
      <IntlProvider locale={locale} key={locale} messages={messages[locale.substr(0, 2)]}>
        <Router>
          <Page>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/invoices" component={Invoices} />
            <ProtectedRoute path="/invoice/:number/:locale?" component={Invoice} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route exact path="/login" component={SignIn} />
          </Page>
        </Router>
      </IntlProvider>
    ) : (
      <Center>
        <Spinner />
      </Center>
    );
  }
}

const mapStateToProps = ({
  app: {
    settings: { locale },
  },
}: RootState) => ({
  locale,
});

const mapDispatchToProps = {
  fetchSettings,
  fetchProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
