import styled from 'react-emotion';
import { Form as AntdForm, Avatar, Row, Button } from 'antd';
const AntdFormItem = AntdForm.Item;

export const Form = styled(AntdForm)`
  .ant-table-body {
    padding: 20px;
  }

  .ant-table-thead > tr > th {
    background: transparent;
    border-top: 3px solid ${props => props.brandcolor};
    border-bottom-width: 0;
    color: ${props => props.brandcolor};
    font-size: 16px;

    &:first-child,
    &:last-child {
      border-radius: 0;
    }
  }
`;

export const FormItem = styled(AntdFormItem)``;

export const Template = styled('div')`
  background-color: #fff;
  box-shadow: 2px 2px 15px #e8e8e8;
  margin-bottom: 30px;
`;

export const Header = styled('div')`
  height: 125px;
  padding: 20px;
  background-color: ${props => props.brandcolor};
  color: #fff;

  .ant-row > div {
    line-height: 1.8;
  }
`;

export const CompanyLogo = styled(Avatar)`
  display: inline-block;
  background-color: #fff;
  color: #000;

  & + div {
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
  }
`;

export const Content = styled('div')`
  padding: 40px;

  h5 {
    color: #908c8c;
    font-size: 14px;
  }

  textarea {
    resize: none;
  }
`;

export const Terms = styled('div')`
  padding: 37px;

  h5 {
    color: #908c8c;
    font-size: 14px;
  }
`;

export const Summary = styled('div')`
  padding: 37px;

  .ant-row > div {
    text-align: right;

    &:first-child {
      color: ${props => props.brandcolor};
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

export const AddFeeButton = styled('div')`
  margin: 10px 0;

  button {
    display: block;
    margin-left: auto;
  }
`;

export const AmountDue = styled(Row)`
  margin-top: 50px;
`;

export const Legal = styled('div')`
  padding: 37px;
`;

export const SaveButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;
