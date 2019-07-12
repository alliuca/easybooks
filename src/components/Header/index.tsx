import React, { Component } from 'react';
import { Row, Col } from 'components/Grid';
import { Divider } from './header.theme';

interface Props {
  left: JSX.Element;
  right?: JSX.Element;
}

class Header extends Component<Props> {
  render() {
    const { left, right } = this.props;

    return (
      <>
        <Row gutter={15} margin="10px 0 0 0">
          <Col span={12}>{left}</Col>
          {right && (
            <Col span={12} className="text-right">
              {right}
            </Col>
          )}
        </Row>
        <Divider />
      </>
    );
  }
}

export default Header;
