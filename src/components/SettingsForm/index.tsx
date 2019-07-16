import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import { UploadProps, UploadFile } from 'antd/lib/upload/interface';
import { uploadURL } from 'config';
import { Intl } from 'config/types';
import { SettingsData } from 'actions/app';
import { InjectedProps as InjectedFormProps, withForm } from 'components/Form';
import { Button } from 'components';
import { FormFields } from 'components/Form/form.theme';
import { Row, Col } from 'components/Grid';
import Upload from 'components/Upload';
import Select from 'components/Select';
import { ColorPicker, Logo } from './settingsform.theme';

interface Props extends InjectedFormProps<SettingsData> {
  intl: Intl;
  data: SettingsData;
  save: Function;
}

interface State {
  loadingLogo: boolean;
}

const localeOptions = [
  {
    value: 'en-GB',
    label: 'English',
  },
  {
    value: 'it',
    label: 'Italiano',
  },
];

const getBase64 = (img: File, callback: (readerResult: FileReader['result']) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

class SettingsForm extends Component<Props, State> {
  state = {
    showColorPicker: false,
    loadingLogo: false,
  };

  handleLogoChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'uploading') {
      this.setState({ loadingLogo: true });
      return;
    }
    if (file.status === 'done' && file.originFileObj) {
      getBase64(file.originFileObj, () => {
        this.setState({
          loadingLogo: false,
        });
      });
      this.props.onInputChange({ name: 'logo', value: file.name });
    }
  };

  render() {
    const { intl, data, formState, onInputChange, onInputEdit, fieldGroupComponent } = this.props;
    const { loadingLogo } = this.state;
    const FormFieldGroup = fieldGroupComponent;
    const labels = {
      brandColor: intl.formatMessage({ id: 'brandColor' }),
      language: intl.formatMessage({ id: 'language' }),
    };

    return (
      <FormFields>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.language}
              <Select
                value={data.locale}
                options={localeOptions}
                onChange={value => onInputChange({ name: 'locale', value })}
              />
            </FormFieldGroup>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={7}>
            <FormFieldGroup>
              {labels.brandColor}
              <Input
                id="name"
                name="name"
                value={data.brandColor}
                onChange={onInputChange}
                suffix={
                  <Button
                    icon="edit"
                    onClick={onInputEdit.bind(this, 'showColorPicker', !formState.showColorPicker)}
                    style={{ height: '100%', marginRight: -10, border: 0 }}
                  />
                }
              />
            </FormFieldGroup>
            {formState.showColorPicker && (
              <ColorPicker
                color={data.brandColor}
                onChange={color => onInputChange({ name: 'brandColor', value: color.hex })}
              />
            )}
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={6}>
            <Upload name="logo" listType="picture-card" onChange={this.handleLogoChange}>
              {data.logo ? (
                <Logo src={`${uploadURL}/logo/${data.logo}`} alt="Company Logo" />
              ) : (
                <Icon type={loadingLogo ? 'loading' : 'plus'} />
              )}
            </Upload>
          </Col>
        </Row>
      </FormFields>
    );
  }
}

export default withForm<SettingsData, Props>(SettingsForm);
