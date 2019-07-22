import React, { Component } from 'react';
import { Form as AntdForm, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Props as SignInProps } from 'pages/SignIn';
import { LoginData } from 'actions/app';
import { Button } from 'components';
import { Form, LoginButton } from './loginform.theme';
const FormItem = AntdForm.Item;

interface Props extends Pick<SignInProps, 'login' | 'loggedIn'>, FormComponentProps {}

class LoginForm extends Component<Props> {
  state = {
    submitting: false,
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { form } = this.props;
    e.preventDefault();
    this.setState({ submitting: true });
    if (form) {
      form.validateFields(async err => {
        if (!err) {
          const values = form.getFieldsValue() as LoginData;
          await this.props.login(values);
        }
      });
    }
  };

  render() {
    const { form, loggedIn } = this.props;
    const { submitting } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username' }],
          })(<Input prefix={<Icon type="user" />} placeholder="username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(<Input prefix={<Icon type="lock" />} type="password" placeholder="password" />)}
        </FormItem>
        <FormItem>
          <Button htmlType="submit" loading={submitting}>
            Log in
          </Button>
        </FormItem>
        {/* {loggedIn === false && <FormItem>Oooops</FormItem>} */}
      </Form>
    );
  }
}

export default AntdForm.create<Props>()(LoginForm);
