import React, { Component, createContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { css } from 'emotion';
import {
  Layout,
  Row,
  Col,
  Button,
} from 'antd';
import Table from './../../components/Table';
import Messages from './../../components/Messages';
const { Content } = Layout;
export const InvoicesContext = createContext();

const columns = [
  {
    title: 'Number',
    dataIndex: 'invoiceNumber',
    sorter: (a, b) => a.invoiceNumber - b.invoiceNumber,
    render: text => <Link to={`/invoice/${text}`}>{text}</Link>,
  },
  {
    title: 'Date of Issue',
    dataIndex: 'dateOfIssue'
  },
  {
    title: 'Client',
    dataIndex: 'client',
    sorter: (a, b) => a.client.length - b.client.length,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

class Invoices extends Component {
  state = {
    invoices: [],
    messages: [],
  }

  async componentDidMount() {
    const { history } = this.props;
    if (history.location && history.location.state && history.location.state.msg) {
      history.replace({ pathname: '/invoices', state: {} });
    }
    const res = await axios.get('http://localhost:3030/api/invoices');
    const invoices = res.data;
    this.setState({ invoices });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.location.state || nextProps.location.state.msg === prevState.msg) {
      return null;
    }
    return {
      messages: [...prevState.messages, nextProps.location.state.msg],
    };
  }

  updateMessages = (id) => {
    const { messages } = this.state;
    this.setState({
      messages: messages.filter(message => message.id !== id)
    });
  }

  render() {
    const { history } = this.props;
    const { invoices, messages } = this.state;
    return (
      <InvoicesContext.Provider value={{ updateMessages: this.updateMessages }}>
        <Layout>
          <Content className={styles.content}>
            <Messages>{messages}</Messages>
            <Row gutter={15}>
              <Col span={12}>
                <h1>Invoices</h1>
              </Col>
              <Col span={12} className="text-right">
                <Button
                  type="primary"
                  icon="plus-circle-o"
                  onClick={() => history.push('/invoices/new')}
                >
                  Create New Invoice
                </Button>
              </Col>
            </Row>
            <Table columns={columns} data={invoices} />
          </Content>
        </Layout>
      </InvoicesContext.Provider>
    );
  }
}

const styles = {
  content: css`
    background-color: #fafafa;
    padding: 50px;
  `,
};

export default Invoices;
