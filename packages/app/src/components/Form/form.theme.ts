import styled from '@emotion/styled';
import { Form as AntdForm } from 'antd';
import { Row } from 'components/Grid/grid.theme';
const AntdFormItem = AntdForm.Item;

export const Form = styled(AntdForm)``;

export const FormItem = styled(AntdFormItem)``;

export const FormFieldGroup = styled('label')`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input,
  > div {
    margin-left: 10px;
  }
`;

export const FormFields = styled('div')`
  margin-bottom: 30px;

  ${Row}:not(:last-child) {
    margin-bottom: 10px;
  }

  ${FormFieldGroup} {
    input,
    > span,
    > div {
      flex-basis: 50%;
    }
  }
`;

export default Form;
