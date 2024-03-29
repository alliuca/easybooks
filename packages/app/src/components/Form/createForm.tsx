import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

// interface Props<T> {
//   profile: T;
//   saveProfile: (data: T) => void;
//   setMessages: (message: T) => void;
// }

interface Props extends FormComponentProps {
  profile: any;
  saveProfile: Function;
  setMessages: Function;
}

class ProfileForm<T> extends Component<Props> {
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { form } = this.props;
    if (form) {
      const values = form.getFieldsValue() || {};
      // await this.props.saveProfile(values);
      // await this.props.setMessages({
      //   id: 'save_profile',
      //   type: 'success',
      //   text: 'Profile has been successfully saved',
      // });
      // callbacks();
    }
  };

  render() {
    const { profile, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('name', {
              initialValue: profile.name,
            })(<Input name="name" addonBefore="Name" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('website', {
              initialValue: profile.website,
            })(<Input name="website" addonBefore="Website" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('taxCode', {
              initialValue: profile.taxCode,
            })(<Input name="taxCode" addonBefore="Tax Code" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('vat', {
              initialValue: profile.vat,
            })(<Input name="vat" addonBefore="VAT" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('phone', {
              initialValue: profile.phone,
            })(<Input name="phone" addonBefore="Phone Number" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('email', {
              initialValue: profile.email,
            })(<Input name="email" addonBefore="E-mail" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('addressStreet', {
              initialValue: profile.addressStreet,
            })(<Input name="addressStreet" addonBefore="Street name / number" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('addressCityCountry', {
              initialValue: profile.addressCityCountry,
            })(<Input name="addressCityCountry" addonBefore="City / Country" />)}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            {getFieldDecorator('postalCode', {
              initialValue: profile.postalCode,
            })(<Input name="postalCode" addonBefore="Postal Code" />)}
          </Col>
        </Row>
        <Button className="mb30" type="primary" htmlType="submit" icon="save">
          Save
        </Button>
      </Form>
    );
  }
}

export default Form.create<Props>()(ProfileForm);
