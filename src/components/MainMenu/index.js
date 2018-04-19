import React from 'react';
import { Icon } from 'antd';
import { Container, Item, ItemLink } from './mainmenu.theme';

const MainMenu = () => (
  <Container>
    <Item key="1">
      <ItemLink to="/invoices">
        <Icon type="file-text" /> Invoices
      </ItemLink>
    </Item>
    <Item key="2">
      <ItemLink to="/settings">
        <Icon type="setting" /> Settings
      </ItemLink>
    </Item>
  </Container>
);

export default MainMenu;
