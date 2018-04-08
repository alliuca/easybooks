// TODO: Omg, refactor this

import React, { Component } from 'react';
import { css } from 'emotion';
import {
  Avatar,
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
} from 'antd';
import EditableTable from './../EditableTable';
import EditableCell from './../EditableCell';
const FormItem = Form.Item;
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

const data = {
  dataSource: [],
  count: 1,
}

class InvoiceForm extends Component {
  state = {
    total: 0,
    subtotal: 0,
    fees: {
      items: [],
      count: 0,
    },
    items: [],
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

  render() {
    const { total, subtotal, fees } = this.state;
    return (
      <React.Fragment>
        <Form className={styles.form}>
          <div className={styles.header}>
            <Row gutter={15}>
              <Col span={8}>
                <Avatar size="large" className={styles.companyLogo}>C</Avatar>
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
          </div>
          <div className={styles.content}>
            <Row gutter={15}>
              <Col span={8}>
                <div>
                  <h5>Billed To:</h5>
                  <FormItem>
                    <TextArea
                      value={`Acme Inc. \n150 Main Street \nVancouver, BC, Canada \nV6A`}
                      rows={5}
                      columns={10}
                      autosize={true}
                    />
                  </FormItem>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <h5>Invoice Number</h5>
                  <Input value="00004" />
                </div>
              </Col>
              <Col span={8} className="text-right">
                <div>
                  <h5>Invoice Total</h5>
                  <Input value={`$ ${total}`} className="text-right" />
                </div>
              </Col>
            </Row>
          </div>
          <EditableTable
            columns={columns}
            data={data}
            pagination={false}
            editableCells={['description', 'hours', 'amount']}
            updateData={this.updateData}
          />
          <div>
            <Row gutter={15} type="flex" align="bottom">
              <Col span={12}>
                <div className={styles.terms}>
                  <h5>Invoice Terms</h5>
                  <TextArea
                    value={`Please pay by bank transfer to: \n\nLending Institution: Acme Bank \nBIC/SWIFT: AB000000 \nBank account holder: John Doe`}
                    rows={6}
                    columns={15}
                    autosize={true}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.summary}>
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
                  <div className={styles.addFeeButton}>
                    <Button
                      size="small"
                      icon="plus"
                      onClick={this.handleAddFee}
                    >
                      Add fee
                    </Button>
                  </div>
                  <Row gutter={15}>
                    <Col span={12}>Total</Col>
                    <Col span={12}>{total}</Col>
                  </Row>
                  <Row gutter={15} className={styles.amountDue}>
                    <Col span={12}>Amount Due (EUR)</Col>
                    <Col span={12}>{total}</Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.legal}>
            <TextArea
              value={`Non EEC services given in accordance with the Protectorate's Decree 633/366. \n\nOperation falling under the income tax policy.`}
              autosize={true}
            />
          </div>
        </Form>
        <Button
          type="primary"
          icon="save"
          className={styles.save}
          onClick={() => {}}
        >
          Save
        </Button>
      </React.Fragment>
    );
  }
}

const styles = {
  form: css`
    background-color: #fff;
    box-shadow: 2px 2px 15px #e8e8e8;
    margin-bottom: 30px;

    .ant-table-body {
      padding: 20px;
    }

    .ant-table-thead > tr > th {
      background: transparent;
      border-top: 3px solid #488f45;
      border-bottom-width: 0;
      color: #488f45;
      font-size: 16px;

      &:first-child,
      &:last-child {
        border-radius: 0;
      }
    }
  `,
  header: css`
    height: 125px;
    padding: 20px;
    background-color: #488f45;
    color: #fff;

    .ant-row > div {
      line-height: 1.8;
    }
  `,
  companyLogo: css`
    display: inline-block;
    background-color: #fff;
    color: #000;

    & + div {
      display: inline-block;
      margin-left: 20px;
      vertical-align: middle;
    }
  `,
  content: css`
    padding: 40px;

    h5 {
      color: #908c8c;
      font-size: 14px;
    }

    textarea {
      resize: none;
    }
  `,
  terms: css`
    padding: 37px;

    h5 {
      color: #908c8c;
      font-size: 14px;
    }
  `,
  summary: css`
    padding: 37px;

    .ant-row > div {
      text-align: right;

      &:first-child {
        color: #488f45;
        font-size: 16px;
        font-weight: 500;
      }
    }
  `,
  addFeeButton: css`
    margin: 10px 0;

    button {
      display: block;
      margin-left: auto;
    }
  `,
  amountDue: css`
    margin-top: 50px;
  `,
  legal: css`
    padding: 37px;
  `,
  save: css`
    display: block;
    margin: 0 auto;
  `,
};

export default InvoiceForm;
