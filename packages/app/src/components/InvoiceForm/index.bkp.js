// TODO: Omg, refactor this
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment-mini';
import { Row, Col, Input, Select, Button } from 'antd';
import {
  Form,
  FormItem,
  Template,
  Header,
  CompanyLogo,
  Content,
  Terms,
  Summary,
  AddFeeButton,
  AmountDue,
  Legal,
  SaveButton,
} from './invoiceform.theme';
import EditableTable from 'components/EditableTable';
import EditableCell from 'components/EditableCell';
import Text from 'components/Text';
import { baseURL, currencies, statuses } from 'config';
const { TextArea } = Input;
const { Option } = Select;

class InvoiceForm extends Component {
  static whyDidYouRender = false;
  state = {
    total: this.props.data.amount,
    subtotal: this.props.data.subtotal,
    details: {
      client: this.props.data.client,
      currency: this.props.data.currency || { CAD: { symbol: '$' } },
      status: this.props.data.status || 'Waiting',
      billedTo:
        this.props.data.billedTo || `Acme Inc.\n150 Main Street\nVancouver, BC, Canada\nV6A`,
      dateOfIssue: moment().format('DD/MM/YYYY'),
      invoiceNumber: this.props.number,
      terms:
        this.props.data.terms ||
        `Please pay by bank transfer to:\n\nLending Institution: Banca Intesa Sanpaolo\nIBAN: IT28D0306953990100000000310\nBIC/SWIFT: BCITITMM\nBank account holder: Luca Allievi`,
      notes:
        this.props.data.notes ||
        `Non EEC services given in accordance with the Italian Presidential Decree 633/1972 (section 7/ter)\n\nOperation falling under the preferential income tax policy provided by section 1, c. 111-113 Law 208/2015, with consequent VAT and withholding tax exemption.`,
    },
    fees: {
      items: this.props.data.fees ? this.props.data.fees.items : [],
      count: 0,
    },
    items: this.props.data.items ? this.props.data.items : [],
  };

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.data === nextProps.data) return false;
  //   return true;
  // }

  componentDidUpdate({ data, locale }) {
    // console.log('UPDATE');
    if (
      // data !== this.props.data ||
      data.currency &&
      this.props.data.currency.value !== data.currency.value
    ) {
      this.setState(
        {
          ...this.state,
          details: {
            ...this.state.details,
            client: this.props.data.client,
            status: this.props.data.status,
            currency: this.props.data.currency,
            billedTo: this.props.data.billedTo,
            terms: this.props.data.terms,
            notes: this.props.data.notes,
          },
          fees: {
            items: this.props.data.fees.items,
            count: this.props.data.fees.length,
          },
          items: this.props.data.items,
        },
        () => console.log('NEW STATE', this.state)
      );
    }
  }

  getColumnsData = () => {
    const { intl } = this.props;
    return [
      {
        title: intl.formatMessage({ id: 'invoice.form.description' }),
        dataIndex: 'description',
        width: '60%',
      },
      {
        title: intl.formatMessage({ id: 'invoice.form.hours' }),
        dataIndex: 'hours',
        width: '20%',
        align: 'right',
      },
      {
        title: intl.formatMessage({ id: 'invoice.form.amount' }),
        dataIndex: 'amount',
        width: '20%',
        align: 'right',
      },
    ];
  };

  updateTotal = () => {
    const { items, fees } = this.state;
    const amountsSum = items.reduce((a, b) => {
      if (!a) return parseFloat(b.amount.replace(',', ''), 0);
      return a + parseFloat(b.amount.replace(',', ''), 10);
    }, 0);
    const feesSum = fees.items.reduce((a, b) => {
      if (!a) return parseFloat(b.value, 10);
      return a + parseFloat(b.value, 10);
    }, 0);
    this.setState({
      total: (amountsSum + feesSum).toLocaleString('us-EN'),
      subtotal: amountsSum.toLocaleString('us-EN'),
    });
  };

  updateData = data => {
    this.setState(
      {
        items: data,
      },
      () => this.updateTotal()
    );
  };

  handleAddFee = () => {
    const { count, items } = this.state.fees;
    const newData = {
      key: count + 1,
      name: 'Fee Name',
      value: 0,
      editable: true,
    };
    this.setState({
      fees: {
        items: [...items, newData],
        count: count + 1,
      },
    });
  };

  onCellChange = (name, key, input) => {
    // if (input !== 'value')
    //   return;
    return value => {
      const dataSource = [...this.state[name].items];
      const target = dataSource.find(i => i.key === key);
      if (target) {
        if (input !== 'value') {
          target.name = value;
        } else {
          target.value = value;
        }
        this.setState(
          {
            [name]: {
              items: dataSource,
              count: this.state[name].count,
            },
          },
          () => this.updateTotal()
        );
      }
    };
  };

  onInputChange = e => {
    this.setState({
      details: {
        ...this.state.details,
        [e.target.name]: e.target.value,
      },
    });
  };

  onCurrencyChange = value => {
    this.setState({
      details: {
        ...this.state.details,
        currency: { value, symbol: currencies[value].symbol },
      },
    });
  };

  onStatusChange = value => {
    this.setState({
      details: {
        ...this.state.details,
        status: value,
      },
    });
  };

  render() {
    const {
      save,
      number,
      settings: { brandColor, logo },
      profile,
    } = this.props;
    const { total, subtotal, details, fees, items } = this.state;
    console.log('this.state', this.state);
    return (
      <>
        <Form brandcolor={brandColor}>
          <Row gutter={15}>
            <Col span={6}>
              <Input
                name="client"
                addonBefore="Client"
                value={details.client}
                onChange={this.onInputChange}
              />
            </Col>
            <Col span={3}>
              <Select
                defaultValue={'CAD'}
                value={details.currency.value ? details.currency.value : 'CAD'}
                onChange={this.onCurrencyChange}
              >
                {Object.keys(currencies).map(c => (
                  <Option key={c} value={c}>
                    {currencies[c].symbol}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={3}>
              <Select
                defaultValue={'Waiting'}
                value={details.status}
                onChange={this.onStatusChange}
              >
                {statuses.map(s => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <br />
          <Template>
            <Header brandcolor={brandColor}>
              <Row gutter={15}>
                <Col span={8}>
                  <CompanyLogo src={logo && `${baseURL}/files/upload/logo/${logo}`} size="large">
                    C
                  </CompanyLogo>
                  <div>
                    <div>{profile.name}</div>
                    <div>{profile.taxCode}</div>
                    <div>VAT: {profile.vat}</div>
                  </div>
                </Col>
                <Col span={8} align="right">
                  <div>{profile.phone}</div>
                  <div>{profile.email}</div>
                  <div>{profile.website}</div>
                </Col>
                <Col span={8} align="right">
                  <div>{profile.addressStreet}</div>
                  <div>{profile.addressCityCountry}</div>
                  <div>{profile.postalCode}</div>
                </Col>
              </Row>
            </Header>
            <Content>
              <Row gutter={15}>
                <Col span={8}>
                  <div>
                    <Text as="h5" intl="invoice.form.billed_to" />
                    <FormItem>
                      <TextArea
                        name="billedTo"
                        value={details.billedTo}
                        rows={5}
                        columns={10}
                        autosize={true}
                        onChange={this.onInputChange}
                      />
                    </FormItem>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <Text as="h5" intl="invoice.form.invoice_number" />
                    <Input
                      name="invoiceNumber"
                      value={details.invoiceNumber}
                      onChange={this.onInputChange}
                    />
                  </div>
                </Col>
                <Col span={8} className="text-right">
                  <div>
                    <Text as="h5" intl="invoice.form.invoice_total" />
                    <span className="text-right">
                      {currencies[details.currency.value] &&
                        currencies[details.currency.value].symbol}{' '}
                      {total}
                    </span>
                  </div>
                </Col>
              </Row>
            </Content>
            <EditableTable
              columns={this.getColumnsData()}
              currency={
                currencies[details.currency.value] && currencies[details.currency.value].symbol
              }
              data={items}
              pagination={false}
              editableCells={['description', 'hours', 'amount']}
              updateData={this.updateData}
            />
            <div>
              <Row gutter={15} type="flex" align="bottom">
                <Col span={12}>
                  <Terms>
                    <Text as="h5" intl="invoice.form.invoice_terms" />
                    <TextArea
                      name="terms"
                      value={details.terms}
                      rows={6}
                      columns={15}
                      autosize={true}
                      onChange={this.onInputChange}
                    />
                  </Terms>
                </Col>
                <Col span={12}>
                  <Summary brandcolor={brandColor}>
                    <Row gutter={15}>
                      <Col span={12}>
                        <Text intl="invoice.form.subtotal" />
                      </Col>
                      <Col span={12}>
                        {currencies[details.currency.value] &&
                          currencies[details.currency.value].symbol}{' '}
                        {subtotal}
                      </Col>
                    </Row>
                    {fees.items.map(f => {
                      if (f.editable) {
                        return (
                          <Row key={f.key} gutter={15}>
                            <Col span={12}>
                              <EditableCell
                                value={f.name}
                                onChange={this.onCellChange(`fees`, f.key, 'name')}
                              />
                            </Col>
                            <Col span={12}>
                              {currencies[details.currency.value] &&
                                currencies[details.currency.value].symbol}
                              &nbsp;
                              <EditableCell
                                value={f.value.toString()}
                                onChange={this.onCellChange(`fees`, f.key, 'value')}
                              />
                            </Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row key={f.key} gutter={15}>
                            <Col span={12}>{f.name}</Col>
                            <Col span={12}>{f.amount}</Col>
                          </Row>
                        );
                      }
                    })}
                    <AddFeeButton>
                      <Button size="small" icon="plus" onClick={this.handleAddFee}>
                        Add fee
                      </Button>
                    </AddFeeButton>
                    <Row gutter={15}>
                      <Col span={12}>
                        <Text intl="invoice.form.invoice_total" />
                      </Col>
                      <Col span={12}>
                        {currencies[details.currency.value] &&
                          currencies[details.currency.value].symbol}{' '}
                        {total}
                      </Col>
                    </Row>
                    <AmountDue gutter={15}>
                      <Col span={12}>
                        <Text
                          intl="invoice.form.amount_due"
                          values={{ currencyText: details.currency.value }}
                        />
                      </Col>
                      <Col span={12}>
                        {currencies[details.currency.value] &&
                          currencies[details.currency.value].symbol}{' '}
                        {total}
                      </Col>
                    </AmountDue>
                  </Summary>
                </Col>
              </Row>
            </div>
            <Legal>
              <TextArea
                name="notes"
                value={details.notes}
                autosize={true}
                onChange={this.onInputChange}
              />
            </Legal>
          </Template>
        </Form>
        <SaveButton type="primary" icon="save" onClick={save.bind(this, number, this.state)}>
          <Text intl="save" />
        </SaveButton>
      </>
    );
  }
}

export default injectIntl(InvoiceForm);
