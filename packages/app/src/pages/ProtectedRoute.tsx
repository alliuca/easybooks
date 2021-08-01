import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { PageContext } from 'providers/Page/context';
import Center from 'components/Center';
import Spinner from 'components/Spinner';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
}

class ProtectedRoute extends Component<Props> {
  static contextType = PageContext;

  isAuthenticated = (): string | false => Cookies.get('EasyBooksToken') || false;

  render() {
    const { component: WrappedComponent, ...rest } = this.props;
    const { locale } = this.context;

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
            <>
              {locale ? (
                <WrappedComponent {...props} />
              ) : (
                <Center>
                  <Spinner />
                </Center>
              )}
            </>
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
