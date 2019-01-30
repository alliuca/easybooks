// @flow
import * as React from 'react';
import { Container } from './layout.theme';

type Props = {
  children?: React.Node,
};

const Layout = (props: Props) => <Container>{props.children}</Container>;

export default Layout;
