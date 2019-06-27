import * as React from 'react';
import { Route } from 'react-router-dom';
import { Container } from './layout.theme';

interface Props {
  children: Route;
}

const Layout = (props: Props) => <Container>{props.children}</Container>;

export default Layout;
