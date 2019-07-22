import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en'; // eslint-disable-line
import itLocaleData from 'react-intl/locale-data/it'; // eslint-disable-line
import enMessages from 'locales/en.ts';
import itMessages from 'locales/it.ts';
import { RootState } from 'reducers';
import { AppState } from 'reducers/app';
import ProtectedRoute from 'pages/ProtectedRoute';
import Home from 'pages/Home';
import Invoices from 'pages/Invoices';
import Invoice from 'pages/Invoice';
import Settings from 'pages/Settings';
import Profile from 'pages/Profile';
import SignIn from 'pages/SignIn';
import Page from 'providers/Page';
import { getLoginToken, fetchSettings } from 'actions/app';
import { fetchProfile } from 'actions/profile';
const history = createHistory();
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
  loggedIn?: AppState['loggedIn'];
  getLoginToken: () => ReturnType<ReturnType<typeof getLoginToken>>;
  fetchSettings: () => ReturnType<ReturnType<typeof fetchSettings>>;
  fetchProfile: () => ReturnType<ReturnType<typeof fetchProfile>>;
}

class App extends PureComponent<Props> {
  async componentDidMount() {
    await this.props.getLoginToken();
    if (this.props.loggedIn) await this.init();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.loggedIn !== this.props.loggedIn && this.props.loggedIn) await this.init();
  }

  init = async () => {
    await this.props.fetchSettings();
    await this.props.fetchProfile();
  };

  render() {
    const locale = this.props.locale || 'en-GB';

    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale.substr(0, 2)]}>
        <Router history={history}>
          <Page locale={this.props.locale}>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/invoices" component={Invoices} />
            <ProtectedRoute path="/invoice/:number/:locale?" component={Invoice} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route exact path="/login" component={SignIn} />
          </Page>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({
  app: {
    settings: { locale },
    loggedIn,
  },
}: RootState) => ({
  locale,
  loggedIn,
});

const mapDispatchToProps = {
  getLoginToken,
  fetchSettings,
  fetchProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
