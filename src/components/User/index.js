import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { Container, ShortInfo } from './user.theme';

const User = ({ data: { name, website }, withShortInfo }) => (
  <Container>
    <Link to="/profile">
      <Avatar size="large" icon="user" />
    </Link>
    { withShortInfo && (
      <ShortInfo>
        <div>{name || 'John Doe'}</div>
        <strong>{website || 'doe.com'}</strong>
      </ShortInfo>
    ) }
  </Container>
);

export default User;
