import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { baseURL, currencies, statuses, countries } from 'config';
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
import { messages } from '../../App';
import { InjectedProps as InjectedFormProps, withForm } from 'components/Form';
import Select from 'components/Select';
import TextArea from 'components/TextArea';
import Input from 'components/Input';
import InputNumber from 'components/InputNumber';
import { Row, Col } from 'components/Grid';
import Currency from 'components/Currency';
import { EditableTableColumnProps } from 'components/EditableTable';
import EditableCell from 'components/EditableCell';
import { AppState } from 'reducers/app';
import { ProfileState } from 'reducers/profile';

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

class InvoiceForm extends PureComponent<Props> {
  statusOptions: { value: string; label: string }[] = [];

  constructor(props: Props) {
    super(props);
    const { intl } = props;
    this.statusOptions = statuses.map(s => {
      return {
        value: s,
        label: intl.formatMessage({ id: `invoice.statuses.${s.toLowerCase()}` }),
      };
    });
  }

  getColumnsData = (): EditableTableColumnProps<Invoice['items'][0]>[] => {
    const {
      intl,
      data: { currency },
    } = this.props;

    return [
      {
        key: 'description',
        title: <Text intl="invoice.form.description" />,
        editable: true,
        render: record => (
          <td>
            <table>
              <tbody>
                <tr>
                  <EditableCell
                    record={record}
                    dataIndex="name"
                    align="left"
                    editable={true}
                    name={`items[${parseFloat(record.key) - 1}].name`}
                    onCellChange={this.onItemChange}
                  />
                </tr>
                <tr>
                  <EditableCell
                    record={record}
                    dataIndex="description"
                    align="left"
                    editable={true}
                    name={`items[${parseFloat(record.key) - 1}].description`}
                    onCellChange={this.onItemChange}
                  />
                </tr>
              </tbody>
            </table>
          </td>
        ),
      },
      {
        key: 'hours',
        title: <Text intl="invoice.form.hours" />,
        dataIndex: 'hours',
        width: '20%',
        align: 'right',
        editable: true,
        number: true,
      },
      {
        key: 'amount',
        title: <Text intl="invoice.form.amount" />,
        dataIndex: 'amount',
        width: '20%',
        align: 'right',
        editable: true,
        number: true,
        currency: currency.symbol,
      },
    ];
  };

  onItemChange = (target: { name: string; value: any }) => {
    this.props.onInputChange(target, this.updateTotal);
  };

  updateTotal = () => {
    const { items, fees } = this.props.data;
    const amountsSum = items.reduce((a, item) => a + parseFloat(item.amount), 0);
    const feesSum = fees.items.reduce((a, item) => a + parseFloat(item.value), 0);
    this.props.updateData({ subtotal: amountsSum, amount: amountsSum + feesSum });
  };

  render() {
    const {
      intl,
      onInputChange,
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
                  onInputChange({
                    name: 'currency',
                    value: {
                      value,
                      symbol: currencies[value as CurrencyValues].symbol,
                    },
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
                value={this.statusOptions.filter(s => s.value === data.status)[0].label}
                onChange={value => onInputChange({ name: 'status', value })}
                options={this.statusOptions}
              />
            </FormFieldGroup>
          </Col>
        </Row>

        <IntlProvider messages={messages[data.locale.toLocaleLowerCase()]}>
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
                  <Text as="div">
                    {profile.addressCity},{' '}
                    {countries.getName(profile.addressCountry, data.locale.toLowerCase())}
                  </Text>
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
              onCellChange={this.onItemChange}
              updateData={this.props.updateData}
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
                    <Col span={13}>
                      <Text intl="invoice.form.subtotal" />
                    </Col>
                    <Col span={11}>
                      <Currency value={parseFloat(data.subtotal)} currency={data.currency.value} />
                    </Col>
                  </Row>
                  {data.fees.items.map((f, index) => (
                    <Row key={f.key} gutter={15}>
                      <Col span={13}>
                        {f.editable ? (
                          <Input
                            id={`fees.items[${index}].name`}
                            name={`fees.items[${index}].name`}
                            value={f.name}
                            onChange={onInputChange}
                            align="right"
                          />
                        ) : (
                          f.name
                        )}
                      </Col>
                      <Col span={11}>
                        {f.editable ? (
                          <InputNumber
                            name={name}
                            value={parseFloat(f.value)}
                            onChange={onInputChange}
                            currency={data.currency.symbol}
                            align="right"
                          />
                        ) : (
                          f.value
                        )}
                        {/* <EditableCell
                            value={f.value.toString()}
                            onChange={this.onCellChange(`fees`, f.key, 'value')}
                          /> */}
                      </Col>
                    </Row>
                  ))}
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
        </IntlProvider>
      </>
    );
  }
}

export default withForm<Invoice, Props>(InvoiceForm);
