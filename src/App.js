import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from 'pages/ProtectedRoute';
import Home from 'pages/Home';
import Invoices from 'pages/Invoices';
import Invoice from 'pages/Invoice';
import Settings from 'pages/Settings';
import Profile from 'pages/Profile';
import SignIn from 'pages/SignIn';
import Layout from 'components/Layout';
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/invoices" component={Invoices} />
            <ProtectedRoute path="/invoice/:number" component={Invoice} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route exact path="/login" component={SignIn} />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
