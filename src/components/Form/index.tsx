import React, { PureComponent } from 'react';
import { Subtract } from 'utility-types';
import { Text, Button } from 'components';
import { Row, Col } from 'components/Grid';
import Form, { FormItem, FormFieldGroup } from './form.theme';

type SelectValue = string | number | object;

// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
// https://www.pluralsight.com/guides/higher-order-composition-typescript-react
export interface InjectedProps<T> {
  data: T;
  onInputChange: () => {};
  onSelectChange: (key: string, value: SelectValue) => {};
  itemComponent: typeof FormItem;
  fieldGroupComponent: typeof FormFieldGroup;
}

export interface Props {
  initialData: {};
  save: Function;
}

export interface State {
  data: {};
  isSaving: boolean;
  saved: boolean;
}

const withForm = <T, P extends InjectedProps<T>>(WrappedComponent: React.ComponentType<P>) => {
  return class extends PureComponent<Props & Subtract<P, InjectedProps<T>>, State> {
    state = {
      data: this.props.initialData,
      isSaving: false,
      saved: false,
    };

    // static getDerivedStateFromProps = (props: Props, state: State) => {
    //   console.log('test');
    //   if (props.initialData !== state.data) {
    //     console.log('change');
    //     return {
    //       data: props.initialData,
    //       isSaving: false,
    //       saved: false,
    //     };
    //   }
    //   return null;
    // };

    componentDidUpdate(prevProps: Props) {
      if (prevProps.initialData !== this.props.initialData) {
        this.setState({
          data: this.props.initialData,
          saved: this.state.saved ? false : this.state.saved,
        });
      }
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        data: {
          ...this.state.data,
          [e.currentTarget.name]: e.currentTarget.value,
        },
      });
    };

    onSelectChange = (key: string, value: SelectValue) => {
      this.setState({
        data: {
          ...this.state.data,
          [key]: value,
        },
      });
    };

    save = async (options: { stay: boolean }) => {
      this.setState({ isSaving: true });
      await this.props.save(this.state.data, options);
      this.setState({ isSaving: false, saved: true });
    };

    render() {
      const { data, isSaving, saved } = this.state;

      return (
        <Form>
          <fieldset disabled={isSaving}>
            <WrappedComponent
              {...(this.props as (P & Props))}
              // key={this.props.initialData !== this.state.data}
              data={data}
              onInputChange={this.onInputChange}
              onSelectChange={this.onSelectChange}
              itemComponent={FormItem}
              fieldGroupComponent={FormFieldGroup}
            />
            <Row gutter={15} type="flex" justify="center">
              <Col>
                <Button
                  type="primary"
                  icon="save"
                  loading={isSaving}
                  onClick={this.save.bind(this, { stay: false })}
                >
                  <Text intl="save" />
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={saved ? 'check' : 'save'}
                  loading={isSaving}
                  onClick={this.save.bind(this, { stay: true })}
                >
                  <Text intl="save_and_stay" />
                </Button>
              </Col>
            </Row>
          </fieldset>
        </Form>
      );
    }
  };
};

export { withForm };
