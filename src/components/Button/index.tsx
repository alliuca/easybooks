import React, { Component } from 'react';
import { Button as AntdButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';

class Button extends Component<ButtonProps> {
  render() {
    return <AntdButton {...this.props}>{this.props.children}</AntdButton>;
  }
}

export default Button;
