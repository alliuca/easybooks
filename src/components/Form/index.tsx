import React, { PureComponent } from 'react';
import { Subtract } from 'utility-types';
import { ColorResult } from 'react-color';
import { Text, Button } from 'components';
import { Row, Col } from 'components/Grid';
import Form, { FormItem, FormFieldGroup } from './form.theme';

type Value = string | number | object | boolean;

type FormState = Pick<State, 'showColorPicker'>;

// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
// https://www.pluralsight.com/guides/higher-order-composition-typescript-react
export interface InjectedProps<T> {
  data: T;
  formState: FormState;
  onInputChange: () => {};
  onSelectChange: (key: string, value: Value) => {};
  onColorChange: (key: string, color: Value) => {};
  onInputEdit: (key: keyof FormState, value: Value) => {};
  onUploadChange: (key: string, value: Value) => {};
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
  showColorPicker: boolean;
}

const withForm = <T, P extends InjectedProps<T>>(WrappedComponent: React.ComponentType<P>) => {
  return class extends PureComponent<Props & Subtract<P, InjectedProps<T>>, State> {
    state = {
      data: this.props.initialData,
      isSaving: false,
      saved: false,
      showColorPicker: false,
    };

    componentDidUpdate(prevProps: Props) {
      if (prevProps.initialData !== this.props.initialData) {
        this.setState({
          data: this.props.initialData,
          saved: this.state.saved ? false : this.state.saved,
        });
      }
    }

    updateData = (key: string, value: Value) => {
      this.setState({
        data: {
          ...this.state.data,
          [key]: value,
        },
      });
    };

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // this.setState({
      //   data: {
      //     ...this.state.data,
      //     [e.currentTarget.name]: e.currentTarget.value,
      //   },
      // });
      this.updateData(e.currentTarget.name, e.currentTarget.value);
    };

    onSelectChange = (key: string, value: Value) => {
      // this.setState({
      //   data: {
      //     ...this.state.data,
      //     [key]: value,
      //   },
      // });
      this.updateData(key, value);
    };

    onColorChange = (key: string, color: ColorResult) => {
      this.updateData(key, color);
    };

    onInputEdit = (key: keyof FormState, value: FormState[keyof FormState]) => {
      this.setState({
        ...this.state,
        [key]: value,
      });
    };

    onUploadChange = (key: string, value: string) => {
      this.updateData(key, value);
    };

    save = async (options: { stay: boolean }) => {
      this.setState({ isSaving: true });
      await this.props.save(this.state.data, options);
      if (options.stay) this.setState({ isSaving: false, saved: true });
    };

    render() {
      const { data, isSaving, saved, showColorPicker } = this.state;

      return (
        <Form>
          <fieldset disabled={isSaving}>
            <WrappedComponent
              {...(this.props as (P & Props))}
              data={data}
              formState={{ showColorPicker }}
              onInputChange={this.onInputChange}
              onSelectChange={this.onSelectChange}
              onColorChange={this.onColorChange}
              onInputEdit={this.onInputEdit}
              onUploadChange={this.onUploadChange}
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
