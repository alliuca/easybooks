import React, { Component } from 'react';
import { Form as AntdForm, Icon, Input } from 'antd';
import { Form, LoginButton } from './loginform.theme';
const FormItem = AntdForm.Item;

class LoginForm extends Component {
  state = {
    submitting: false,
  }

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    this.setState({ submitting: true });
    form.validateFields(async (err, values) => {
      if (!err) {
        const values = form.getFieldsValue();
        await this.props.login(values);
      }
      this.setState({ submitting: false });
    });
    // await this.props.setMessages({
    //   id: 'save_profile',
    //   type: 'success',
    //   text: 'Profile has been successfully saved',
    // });
  }

  render() {
    const { form, loggedIn } = this.props;
    const { submitting } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          { getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username' }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="username" />
          ) }
        </FormItem>
        <FormItem>
          { getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="password" />
          ) }
        </FormItem>
        <FormItem>
          <LoginButton
            type="primary"
            htmlType="submit"
            loading={submitting}
          >
            Log in
          </LoginButton>
        </FormItem>
        { loggedIn === false && (
          <FormItem>
            Oooops
          </FormItem>
        ) }
      </Form>
    );
  }
}

export default AntdForm.create()(LoginForm);
