import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { Input } from 'antd';
import { baseURL, currencies, statuses } from 'config';
import { Invoice, CurrencyValues } from 'actions/invoices';
import {
  Template,
  Header,
  CompanyLogo,
  Content,
  ItemsTable,
  Terms,
  Summary,
  AddFeeButton,
  AmountDue,
  Legal,
} from './invoiceform.theme';
import { Text } from 'components';
import { InjectedProps as InjectedFormProps, withForm } from 'components/Form';
import Select from 'components/Select';
import { Row, Col } from 'components/Grid';
import Currency from 'components/Currency';
import { EditableTableColumnProps } from 'components/EditableTable';
import { AppState } from 'reducers/app';
import { ProfileState } from 'reducers/profile';
const { TextArea } = Input;

interface Props extends InjectedFormProps<Invoice>, ReactIntl.InjectedIntlProps {
  settings: AppState['settings'];
  profile: ProfileState;
}

const currencyOptions = (Object.keys(currencies) as Array<keyof typeof CurrencyValues>).map(k => {
  return {
    value: currencies[k].value,
    label: currencies[k].symbol,
  };
});

const statusOptions = statuses.map(s => {
  return {
    value: s,
    label: s,
  };
});

class InvoiceForm extends PureComponent<Props> {
  getColumnsData = (): EditableTableColumnProps<Invoice['items'][0]>[] => {
    const {
      intl,
      data: { currency },
    } = this.props;

    return [
      {
        title: intl.formatMessage({ id: 'invoice.form.description' }),
        dataIndex: 'description',
        width: '60%',
        editable: true,
      },
      {
        title: intl.formatMessage({ id: 'invoice.form.hours' }),
        dataIndex: 'hours',
        width: '20%',
        align: 'right',
        editable: true,
      },
      {
        title: intl.formatMessage({ id: 'invoice.form.amount' }),
        dataIndex: 'amount',
        width: '20%',
        align: 'right',
        render: text => <Currency value={parseFloat(text)} currency={currency.value} />,
      },
    ];
  };

  render() {
    const {
      intl,
      onInputChange,
      onSelectChange,
      fieldGroupComponent,
      settings: { brandColor, logo },
      profile,
    } = this.props;
    const data: Invoice = this.props.data;
    const FormFieldGroup = fieldGroupComponent;
    const labels = {
      client: intl.formatMessage({ id: 'client' }),
      currency: intl.formatMessage({ id: 'currency' }),
      status: intl.formatMessage({ id: 'status' }),
    };

    return (
      <>
        <Row gutter={15} margin="0 0 10px">
          <Col span={10}>
            <FormFieldGroup>
              {labels.client}
              <Input id="client" name="client" value={data.client} onChange={onInputChange} />
            </FormFieldGroup>
          </Col>
          <Col span={5} push={9}>
            <FormFieldGroup>
              {labels.currency}
              <Select
                value={data.currency.value}
                options={currencyOptions}
                onChange={value =>
                  onSelectChange('currency', {
                    value,
                    symbol: currencies[value as CurrencyValues].symbol,
                  })
                }
              />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15} margin="0 0 1rem">
          <Col span={10}>
            <FormFieldGroup>
              {labels.status}
              <Select
                value={data.status}
                onChange={value => onSelectChange('status', value)}
                options={statusOptions}
              />
            </FormFieldGroup>
          </Col>
        </Row>

        <Template>
          <Header brandColor={brandColor}>
            <Row gutter={15}>
              <Col span={8}>
                <CompanyLogo
                  src={logo && `${baseURL}/files/upload/logo/${logo}`}
                  size="large"
                  alt="Company Logo"
                >
                  C
                </CompanyLogo>
                <div>
                  <Text as="div">{profile.name}</Text>
                  <Text as="div">{profile.taxCode}</Text>
                  <Text as="div">VAT: {profile.vat}</Text>
                </div>
              </Col>
              <Col span={8} align="right">
                <Text as="div">{profile.phone}</Text>
                <Text as="div">{profile.email}</Text>
                <Text as="div">{profile.website}</Text>
              </Col>
              <Col span={8} align="right">
                <Text as="div">{profile.addressStreet}</Text>
                <Text as="div">{profile.addressCityCountry}</Text>
                <Text as="div">{profile.postalCode}</Text>
              </Col>
            </Row>
          </Header>
          <Content>
            <Row gutter={15}>
              <Col span={8}>
                <Text as="h5" intl="invoice.form.billed_to" />
                <FormFieldGroup>
                  <TextArea
                    name="billedTo"
                    value={data.billedTo}
                    rows={5}
                    cols={10}
                    autosize={true}
                    onChange={onInputChange}
                  />
                </FormFieldGroup>
              </Col>
              <Col span={8}>
                <Text as="h5" intl="invoice.form.invoice_number" />
                <Input name="invoiceNumber" value={data.invoiceNumber} onChange={onInputChange} />
              </Col>
              <Col span={8} className="text-right">
                <Text as="h5" intl="invoice.form.invoice_total" />
                <Currency value={parseFloat(data.amount)} currency={data.currency.value} />
              </Col>
            </Row>
          </Content>
          <ItemsTable
            brandColor={brandColor}
            columns={this.getColumnsData()}
            dataSourceKey="items"
            dataSource={data.items}
            onChange={onInputChange}
            // editableCells={['description', 'hours', 'amount']}
            // updateData={this.updateData}
          />
          <Row gutter={15} type="flex" align="bottom">
            <Col span={12}>
              <Terms>
                <Text as="h5" intl="invoice.form.invoice_terms" />
                <TextArea
                  name="terms"
                  value={data.terms}
                  rows={6}
                  cols={15}
                  autosize={true}
                  onChange={onInputChange}
                />
              </Terms>
            </Col>
            <Col span={12}>
              <Summary brandColor={brandColor}>
                <Row gutter={15}>
                  <Col span={12}>
                    <Text intl="invoice.form.subtotal" />
                  </Col>
                  <Col span={12}>
                    <Currency value={parseFloat(data.subtotal)} currency={data.currency.value} />
                  </Col>
                </Row>
                {data.fees.items.map(f => {
                  if (f.editable) {
                    return (
                      <Row key={f.key} gutter={15}>
                        <Col span={12}>
                          <Text>{f.name}</Text>
                          {/* <EditableCell
                            value={f.name}
                            onChange={this.onCellChange(`fees`, f.key, 'name')}
                          /> */}
                        </Col>
                        <Col span={12}>
                          <Currency value={parseFloat(f.value)} currency={data.currency.value} />
                          {/* <EditableCell
                            value={f.value.toString()}
                            onChange={this.onCellChange(`fees`, f.key, 'value')}
                          /> */}
                        </Col>
                      </Row>
                    );
                  } else {
                    return (
                      <Row key={f.key} gutter={15}>
                        <Col span={12}>{f.name}</Col>
                        <Col span={12}>{f.value}</Col>
                      </Row>
                    );
                  }
                })}
                <AddFeeButton size="small" icon="plus" onClick={() => {}}>
                  <Text intl="invoice.form.fees.add_fee" />
                </AddFeeButton>
                <Row gutter={15}>
                  <Col span={12}>
                    <Text intl="invoice.form.invoice_total" />
                  </Col>
                  <Col span={12}>
                    <Currency value={parseFloat(data.amount)} currency={data.currency.value} />
                  </Col>
                </Row>
                <AmountDue gutter={15}>
                  <Col span={12}>
                    <Text
                      intl="invoice.form.amount_due"
                      values={{ currencyText: data.currency.value }}
                    />
                  </Col>
                  <Col span={12}>
                    <Currency value={parseFloat(data.amount)} currency={data.currency.value} />
                  </Col>
                </AmountDue>
              </Summary>
            </Col>
          </Row>
          <Legal>
            <TextArea name="notes" value={data.notes} autosize={true} onChange={onInputChange} />
          </Legal>
        </Template>
      </>
    );
  }
}

export default injectIntl(withForm<Invoice, Props>(InvoiceForm));
