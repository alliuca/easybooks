import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import itLocaleData from 'react-intl/locale-data/it';
import enMessages from 'locales/en.json';
import itMessages from 'locales/it.json';
import ProtectedRoute from 'pages/ProtectedRoute';
import Home from 'pages/Home';
import Invoices from 'pages/Invoices';
import Invoice from 'pages/Invoice';
import Settings from 'pages/Settings';
import Profile from 'pages/Profile';
import SignIn from 'pages/SignIn';
import Layout from 'components/Layout';
const store = configureStore();
addLocaleData([...enLocaleData, ...itLocaleData]);
const messages = {
  en: enMessages,
  it: itMessages,
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale={'en'} messages={messages['en']}>
          <Router>
              <Layout>
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/invoices" component={Invoices} />
                <ProtectedRoute path="/invoice/:number/:locale?" component={Invoice} />
                <ProtectedRoute exact path="/settings" component={Settings} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route exact path="/login" component={SignIn} />
              </Layout>
          </Router>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
