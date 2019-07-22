import React, { Component } from 'react';
import _sortBy from 'lodash/sortBy';
import { countries } from 'config';
import { Intl } from 'config/types';
import { Profile } from 'actions/profile';
import { InjectedProps as InjectedFormProps, withForm } from 'components/Form';
import { FormFields } from 'components/Form/form.theme';
import { Row, Col } from 'components/Grid';
import Input, { InputGroup } from 'components/Input';
import Select from 'components/Select';

interface Props extends InjectedFormProps<Profile> {
  intl: Intl;
  data: Profile;
  save: Function;
}

class ProfileForm extends Component<Props> {
  countryOptions: { value: string; label: string }[] = [];

  constructor(props: Props) {
    super(props);
    const allCountries = countries.getNames(props.intl.locale.split('-')[0]);
    this.countryOptions = _sortBy(
      Object.keys(allCountries).map(k => ({
        value: k,
        label: allCountries[k],
      })),
      ['label']
    );
  }

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
          <Col span={12}>
            <FormFieldGroup>
              {labels.name}
              <Input id="name" name="name" value={data.name} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <FormFieldGroup>
              {labels.website}
              <Input id="website" name="website" value={data.website} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <FormFieldGroup>
              {labels.taxCode}
              <Input id="taxCode" name="taxCode" value={data.taxCode} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <FormFieldGroup>
              {labels.vat}
              <Input id="vat" name="vat" value={data.vat} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <FormFieldGroup>
              {labels.phone}
              <Input id="phone" name="phone" value={data.phone} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <FormFieldGroup>
              {labels.email}
              <Input id="email" name="email" value={data.email} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
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
          <Col span={12}>
            <FormFieldGroup>
              {labels.addressCityCountry}
              <InputGroup compact>
                <Input
                  id="addressCity"
                  name="addressCity"
                  value={data.addressCity}
                  onChange={onInputChange}
                />
                <Select
                  value={data.addressCountry}
                  options={this.countryOptions}
                  onChange={value => onInputChange({ name: 'addressCountry', value })}
                />
              </InputGroup>
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
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

export default withForm<Profile, Props>(ProfileForm);
