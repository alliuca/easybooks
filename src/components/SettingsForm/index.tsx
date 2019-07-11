import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Upload, Icon, message } from 'antd';
import Cookies from 'js-cookie';
import { baseURL } from 'config';
import { Intl } from 'config/types';
import { SettingsData } from 'actions/app';
import { InjectedProps as InjectedFormProps, withForm } from 'components/Form';
import { Button } from 'components';
import { FormFields } from 'components/Form/form.theme';
import { Row, Col } from 'components/Grid';
import { ColorPicker, Logo } from './settingsform.theme';
const maxFileSize = 51200; // 50kb = 50 * 1024

interface Props extends InjectedFormProps<SettingsData>, ReactIntl.InjectedIntlProps {
  intl: Intl;
  data: SettingsData;
  save: Function;
}

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = file => {
//   const isLt50k = file.size < maxFileSize;
//   if (!isLt50k) {
//     message.error('Image must be smaller than 50kb');
//   }
//   return isLt50k;
// };

class SettingsForm extends Component<Props> {
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

  handleColorPickerVisibility = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  };

  // handleLogoChange = ({ file }) => {
  //   if (file.status === 'uploading') {
  //     this.setState({ loadingLogo: true });
  //     return;
  //   }
  //   if (file.status === 'done') {
  //     getBase64(file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loadingLogo: false,
  //       })
  //     );
  //   }
  // };

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
    // const { showColorPicker, imageUrl } = this.state;
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
        {/* <Row gutter={15}>
          <Col span={6}>
            <FormFieldGroup>
              <Upload
                accept=".jpg,.png,.gif"
                action={`${baseURL}/api/upload`}
                beforeUpload={beforeUpload}
                name="logo"
                listType="picture-card"
                onChange={this.handleLogoChange}
                showUploadList={false}
                type="file"
                headers={{
                  Authorization: `Bearer ${encodeURIComponent(Cookies.get('EasyBooksToken'))}`,
                }}
              >
                {imageUrl ? (
                  <Logo src={imageUrl} alt="" />
                ) : (
                  <div>
                    <Icon type={this.state.loadingLogo ? 'loading' : 'plus'} />
                  </div>
                )}
              </Upload>
            </FormFieldGroup>
          </Col>
        </Row> */}
      </FormFields>
    );
  }
}

export default injectIntl(withForm<SettingsData, Props>(SettingsForm));
