import React from 'react';
import { Container } from './messages.theme';
import Alert from './../Alert';

const Messages = ({ children }) => (
  <Container>
    { children.map(child => (
      <Alert key={child.id} data={child} />
    )) }
  </Container>
);

export default Messages;
