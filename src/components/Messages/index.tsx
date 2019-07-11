import React from 'react';
import { Container } from './messages.theme';
import { Message } from 'actions/app';
import Alert from 'components/Alert';

interface Props {
  children: Message[];
}

const Messages = ({ children }: Props) => (
  <Container>
    {children.map(child => (
      <Alert key={child.id} data={child} />
    ))}
  </Container>
);

export default Messages;
