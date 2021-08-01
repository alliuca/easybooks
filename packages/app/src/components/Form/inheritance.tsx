import React, { PureComponent } from 'react';

export interface Props<T> {
  initialData: T;
}

export interface State<T> {
  data: T;
}

class Form<FormData> extends PureComponent<Props<FormData>, State<FormData>> {
  state = {
    data: this.props.initialData,
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
  };

  render() {
    return <div>test</div>;
  }
}

export default Form;
