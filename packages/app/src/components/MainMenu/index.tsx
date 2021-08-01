import React from 'react';
import { Icon } from 'antd';
import { Text } from 'components';
import { Container, Item, ItemLink } from './mainmenu.theme';

const MainMenu = () => (
  <Container>
    <Item key="1">
      <ItemLink to="/invoices">
        <Icon type="file-text" /> <Text intl="invoices.title" />
      </ItemLink>
    </Item>
    <Item key="2">
      <ItemLink to="/settings">
        <Icon type="setting" /> <Text intl="settings" />
      </ItemLink>
    </Item>
  </Container>
);

export default MainMenu;
