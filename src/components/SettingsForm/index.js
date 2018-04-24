import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Upload,
  Button,
  Icon,
  message,
} from 'antd';
import { Fields, ColorPicker, Logo } from './settingsform.theme';
import { baseURL } from 'config';
const maxFileSize = 51200; // 50kb = 50 * 1024

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
  const isLt50k = file.size < maxFileSize;
  if (!isLt50k) {
    message.error('Image must be smaller than 50kb');
  }
  return isLt50k;
};

class SettingsForm extends Component {
  state = {
    showColorPicker: false,
    loadingLogo: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.settings.logo || nextProps.settings.logo.file.name === prevState.imageUrl) {
      return null;
    }
    return {
      imageUrl: `${baseURL}/files/upload/logo/${nextProps.settings.logo.file.name}`,
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const values = this.props.form.getFieldsValue();
    await this.props.saveSettings(values);
    await this.props.setMessages({
      id: 'save_settings',
      type: 'success',
      text: 'Settings has been successfully saved',
    });
  }

  handleColorChange = (color, e) => {
    this.props.form.setFieldsValue({ brandColor: color.hex });
  }

  handleColorPickerVisibility = e => {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  }

  handleLogoChange = ({ file }) => {
    if (file.status === 'uploading') {
      this.setState({ loadingLogo: true });
      return;
    }
    if (file.status === 'done') {
      getBase64(file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loadingLogo: false,
      }));
    }
  }

  render() {
    const { settings, form } = this.props;
    const { showColorPicker, imageUrl } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Fields>
          <Row gutter={15}>
            <Col span={6}>
              {getFieldDecorator('brandColor', {
                initialValue: settings.brandColor,
              })(
                <Input
                  name="brandColor"
                  addonBefore="Brand Color"
                  suffix={
                    <Button
                      icon="edit"
                      onClick={this.handleColorPickerVisibility}
                      style={{ height: '100%', marginRight: -10, border: 0 }}
                    />
                  }
                />
              )}
              { showColorPicker && (
                <ColorPicker
                  color={form.getFieldValue('brandColor')}
                  onChange={this.handleColorChange}
                />
              ) }
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={6}>
              {getFieldDecorator('logo', {
                initialValue: settings.logo,
              })(
                <Upload
                  accept=".jpg,.png,.gif"
                  action={`${baseURL}/api/upload`}
                  beforeUpload={beforeUpload}
                  name="logo"
                  listType="picture-card"
                  onChange={this.handleLogoChange}
                  showUploadList={false}
                  type="file"
                >
                  { imageUrl
                  ? (
                    <Logo src={imageUrl} alt="" />
                  )
                  : (
                    <div>
                      <Icon type={this.state.loadingLogo ? 'loading' : 'plus'} />
                    </div>
                  ) }
                </Upload>
              )}
            </Col>
          </Row>
        </Fields>
        <Button
          type="primary"
          htmlType="submit"
          icon="save"
        >
          Save
        </Button>
      </Form>
    );
  }
}

export default Form.create()(SettingsForm);
