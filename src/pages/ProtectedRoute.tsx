import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  component: React.ComponentClass;
}

class ProtectedRoute extends Component<Props> {
  isAuthenticated = (): string | false => Cookies.get('EasyBooksToken') || false;

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
