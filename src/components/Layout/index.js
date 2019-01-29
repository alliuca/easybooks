import React, { Component } from 'react';
import { Container } from './layout.theme';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return <Container>{children}</Container>;
  }
}

export default Layout;
