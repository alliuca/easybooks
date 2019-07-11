import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import { Intl } from 'config/types';
import { Profile } from 'actions/profile';
import { InjectedProps as InjectedFormProps, withForm } from 'components/Form';
import { FormFields } from 'components/Form/form.theme';
import { Row, Col } from 'components/Grid';

interface Props extends InjectedFormProps<Profile>, ReactIntl.InjectedIntlProps {
  intl: Intl;
  data: Profile;
  save: Function;
}

class ProfileForm extends Component<Props> {
  render() {
    const { intl, data, onInputChange, fieldGroupComponent } = this.props;
    const FormFieldGroup = fieldGroupComponent;
    const labels = {
      name: intl.formatMessage({ id: 'name' }),
      website: intl.formatMessage({ id: 'website' }),
      taxCode: intl.formatMessage({ id: 'taxCode' }),
      vat: intl.formatMessage({ id: 'vat' }),
      phone: intl.formatMessage({ id: 'phone' }),
      email: intl.formatMessage({ id: 'email' }),
      addressStreet: intl.formatMessage({ id: 'addressStreet' }),
      addressCityCountry: intl.formatMessage({ id: 'addressCityCountry' }),
      postalCode: intl.formatMessage({ id: 'postalCode' }),
    };

    return (
      <FormFields>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.name}
              <Input id="name" name="name" value={data.name} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.website}
              <Input id="website" name="website" value={data.website} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.taxCode}
              <Input id="taxCode" name="taxCode" value={data.taxCode} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.vat}
              <Input id="vat" name="vat" value={data.vat} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.phone}
              <Input id="phone" name="phone" value={data.phone} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.email}
              <Input id="email" name="email" value={data.email} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.addressStreet}
              <Input
                id="addressStreet"
                name="addressStreet"
                value={data.addressStreet}
                onChange={onInputChange}
              />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.addressCityCountry}
              <Input
                id="addressCityCountry"
                name="addressCityCountry"
                value={data.addressCityCountry}
                onChange={onInputChange}
              />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.postalCode}
              <Input
                id="postalCode"
                name="postalCode"
                value={data.postalCode}
                onChange={onInputChange}
              />
            </FormFieldGroup>
          </Col>
        </Row>
      </FormFields>
    );
  }
}

export default injectIntl(withForm<Profile, Props>(ProfileForm));
