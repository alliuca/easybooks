import React, { Component } from 'react';
import { Subtract } from 'utility-types';
import { injectIntl } from 'react-intl';
import _set from 'lodash/set';
import { Text, Button } from 'components';
import { Row, Col } from 'components/Grid';
import Form, { FormItem, FormFieldGroup } from './form.theme';

type Value = string | number | object | boolean;

type FormState = Pick<State, 'showColorPicker'>;

interface InputTarget {
  name: string;
  value: any;
}

// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
// https://www.pluralsight.com/guides/higher-order-composition-typescript-react
export interface InjectedProps<T> {
  data: T;
  formState: FormState;
  onInputChange: any;
  onInputEdit: (key: keyof FormState, value: Value) => {};
  updateData: Function;
  itemComponent: typeof FormItem;
  fieldGroupComponent: typeof FormFieldGroup;
}

export interface Props extends ReactIntl.InjectedIntlProps {
  initialData: {
    [key: string]: any;
  };
  save: Function;
}

export interface State {
  data: {
    [key: string]: string;
  };
  isSaving: boolean;
  saved: boolean;
  showColorPicker: boolean;
}

const withForm = <T, P extends InjectedProps<T>>(WrappedComponent: React.ComponentType<P>) => {
  class FormComponent extends Component<Props & Subtract<P, InjectedProps<T>>, State> {
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

    updateData = (state: { [key: string]: any }, callback?: () => void) => {
      let newData = { ...this.state.data };

      Object.keys(state).forEach(key => {
        newData = _set(newData, key, state[key]);
      });

      this.setState({ data: newData }, () => callback && callback());
    };

    onInputChange = (target: InputTarget, callback: () => void) => {
      let { name, value } = target;
      this.updateData({ [name]: value }, callback);
    };

    onInputEdit = (key: keyof FormState, value: FormState[keyof FormState]) => {
      this.setState({
        ...this.state,
        [key]: value,
      });
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
              onInputEdit={this.onInputEdit}
              updateData={this.updateData}
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
  }

  return injectIntl(FormComponent);
};

export { withForm };
