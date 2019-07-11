import styled from '@emotion/styled';
import { Layout } from 'antd';
const { Content } = Layout;

export const Container = styled(Layout)`
  height: 100%;
`;

export const Wrapper = styled(Content)`
  background-color: #fafafa;
  padding: 50px;
  min-height: auto;
`;
