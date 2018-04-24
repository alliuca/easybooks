// TODO: Omg, refactor this

import React, { Component, Fragment } from 'react';
import moment from 'moment-mini';
import {
  Row,
  Col,
  Input,
  Button,
} from 'antd';
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
import { baseURL } from 'config';
const { TextArea } = Input;

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    width: '60%',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    width: '20%',
    align: 'right',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: '20%',
    align: 'right',
  },
];

class InvoiceForm extends Component {
  state = {
    total: this.props.data.amount,
    subtotal: this.props.data.subtotal,
    details: {
      client: this.props.data.client,
      currency: this.props.data.currency,
      billedTo: this.props.data.billedTo || `Acme Inc.\n150 Main Street\nVancouver, BC, Canada\nV6A`,
      dateOfIssue: moment().format('DD/MM/YYYY'),
      invoiceNumber: this.props.number,
      terms: this.props.data.terms || `Please pay by bank transfer to:\n\nLending Institution: Acme Bank\nBIC/SWIFT: AB000000\nBank account holder: John Doe`,
      notes: this.props.data.notes || `Non EEC services given in accordance with the Protectorate's Decree 633/366.\n\nOperation falling under the income tax policy.`,
    },
    status: 'Waiting',
    fees: {
      items: this.props.data.fees ? this.props.data.fees.items : [],
      count: 0,
    },
    items: this.props.data.items ? this.props.data.items : [],
  }

  updateTotal = () => {
    const { items, fees } = this.state;
    const amountsSum = items.reduce((a, b) => {
      if (!a)
        return parseInt(b.amount, 0);
      return a + parseInt(b.amount, 10);
    }, 0);
    const feesSum = fees.items.reduce((a, b) => {
      if (!a)
        return parseInt(b.value, 10);
      return a + parseInt(b.value, 10);
    }, 0);
    this.setState({
      total: amountsSum + feesSum,
      subtotal: amountsSum,
    });
  }

  updateData = data => {
    this.setState({
      items: data,
    }, () => this.updateTotal());
  }

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
      }
    });
  }

  onCellChange = (name, key, input) => {
    if (input !== 'value')
      return;
    return value => {
      const dataSource = [...this.state[name].items];
      const target = dataSource.find(i => i.key === key);
      if (target) {
        target.value = value;
        this.setState({
          [name]: {
            items: dataSource,
            count: this.state[name].count,
          }
        }, () => this.updateTotal());
      }
    }
  }

  onInputChange = (e) => {
    this.setState({
      details: {
        ...this.state.details,
        [e.target.name]: e.target.value,
      }
    });
  }

  render() {
    const { save, number, settings: { brandColor, logo } } = this.props;
    const {
      total,
      subtotal,
      details,
      fees,
      items,
    } = this.state;
    return (
      <Fragment>
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
            <Col span={6}>
              <Input
                name="currency"
                addonBefore="Currency"
                value={details.currency}
                onChange={this.onInputChange}
              />
            </Col>
          </Row>
          <br />
          <Template>
            <Header brandcolor={brandColor}>
              <Row gutter={15}>
                <Col span={8}>
                  <CompanyLogo src={logo && `${baseURL}/files/upload/logo/${logo.file.name}`} size="large">C</CompanyLogo>
                  <div>
                    <div>John Doe</div>
                    <div>JHNDOE1234</div>
                    <div>VAT: 0123456789</div>
                  </div>
                </Col>
                <Col span={8} align="right">
                  <div>+1 555-555</div>
                  <div>john@doe.com</div>
                  <div>doe.com</div>
                </Col>
                <Col span={8} align="right">
                  <div>102 West Hastings</div>
                  <div>Vancouver, BC, Canada</div>
                  <div>V6B</div>
                </Col>
              </Row>
            </Header>
            <Content>
              <Row gutter={15}>
                <Col span={8}>
                  <div>
                    <h5>Billed To:</h5>
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
                    <h5>Invoice Number</h5>
                    <Input
                      name="invoiceNumber"
                      value={details.invoiceNumber}
                      onChange={this.onInputChange}
                    />
                  </div>
                </Col>
                <Col span={8} className="text-right">
                  <div>
                    <h5>Invoice Total</h5>
                    <span className="text-right">{details.currency} {total}</span>
                  </div>
                </Col>
              </Row>
            </Content>
            <EditableTable
              columns={columns}
              currency={details.currency}
              data={items}
              pagination={false}
              editableCells={['description', 'hours', 'amount']}
              updateData={this.updateData}
            />
            <div>
              <Row gutter={15} type="flex" align="bottom">
                <Col span={12}>
                  <Terms>
                    <h5>Invoice Terms</h5>
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
                      <Col span={12}>Subtotal</Col>
                      <Col span={12}>{subtotal}</Col>
                    </Row>
                    { fees.items.map(f => {
                      if (f.editable) {
                        return (
                          <Row key={f.key} gutter={15}>
                            <Col span={12}>
                              <EditableCell
                                value={f.name}
                                onChange={this.onCellChange('fees', f.key, 'name')}
                              />
                            </Col>
                            <Col span={12}>
                              {details.currency}&nbsp;
                              <EditableCell
                                value={f.value.toString()}
                                onChange={this.onCellChange(`fees`, f.key, 'value')}
                              />
                            </Col>
                          </Row>
                        )
                      } else {
                        return (
                          <Row key={f.key} gutter={15}>
                            <Col span={12}>{f.name}</Col>
                            <Col span={12}>{f.amount}</Col>
                          </Row>
                        );
                      }
                    }) }
                    <AddFeeButton>
                      <Button
                        size="small"
                        icon="plus"
                        onClick={this.handleAddFee}
                      >
                        Add fee
                      </Button>
                    </AddFeeButton>
                    <Row gutter={15}>
                      <Col span={12}>Total</Col>
                      <Col span={12}>{details.currency} {total}</Col>
                    </Row>
                    <AmountDue gutter={15}>
                      <Col span={12}>Amount Due (EUR)</Col>
                      <Col span={12}>{details.currency} {total}</Col>
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
        <SaveButton
          type="primary"
          icon="save"
          onClick={save.bind(this, number, this.state)}
        >
          Save
        </SaveButton>
      </Fragment>
    );
  }
}

export default InvoiceForm;
