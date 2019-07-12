import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
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
import { ColorPicker, Logo } from './settingsform.theme';

interface Props extends InjectedFormProps<SettingsData>, ReactIntl.InjectedIntlProps {
  intl: Intl;
  data: SettingsData;
  save: Function;
}

interface State {
  loadingLogo: boolean;
}

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

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (!nextProps.settings.logo || nextProps.settings.logo.file.name === prevState.imageUrl) {
  //     return null;
  //   }
  //   return {
  //     imageUrl: `${baseURL}/files/upload/logo/${nextProps.settings.logo.file.name}`,
  //   };
  // }

  handleLogoChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'uploading') {
      this.setState({ loadingLogo: true });
      return;
    }
    if (file.status === 'done' && file.originFileObj) {
      getBase64(file.originFileObj, imageURL => {
        this.setState({
          loadingLogo: false,
        });
      });
      this.props.onUploadChange('logo', file.name);
    }
  };

  render() {
    const {
      intl,
      data,
      formState,
      onInputChange,
      onColorChange,
      onInputEdit,
      fieldGroupComponent,
    } = this.props;
    const { loadingLogo } = this.state;
    const FormFieldGroup = fieldGroupComponent;
    const labels = {
      brandColor: intl.formatMessage({ id: 'brandColor' }),
    };

    return (
      <FormFields>
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
                onChange={color => onColorChange('brandColor', color.hex)}
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

export default injectIntl(withForm<SettingsData, Props>(SettingsForm));
