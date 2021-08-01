import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { baseURL } from 'config';
import { Container, ShortInfo } from './user.theme';
import { SettingsData } from 'actions/app';
import { Profile } from 'actions/profile';

export interface Props {
  data: Pick<SettingsData, 'logo'> & Pick<Profile, 'name' | 'website'>;
  withShortInfo: boolean;
}

const User = ({ data: { logo, name, website }, withShortInfo }: Props) => (
  <Container>
    <Link to="/profile">
      <Avatar
        size="large"
        icon={!logo ? 'user' : ''}
        src={logo ? `${baseURL}/files/upload/logo/${logo}` : ''}
      />
    </Link>
    {withShortInfo && (
      <ShortInfo>
        <div>{name || 'John Doe'}</div>
        <strong>{website || 'doe.com'}</strong>
      </ShortInfo>
    )}
  </Container>
);

export default User;
