import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
  isAuthenticated = () => {
    return Cookies.get('EasyBooksToken') || false;
  };

  render() {
    const { component: WrappedComponent, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !this.isAuthenticated() ? (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          ) : (
            <WrappedComponent {...props} />
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
