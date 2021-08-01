import React, { PureComponent } from 'react';
import Cookies from 'js-cookie';
import { Upload, message } from 'antd';
import { UploadProps, RcFile } from 'antd/lib/upload';
import { baseURL } from 'config';
const maxFileSize = 512000; // 50kb = 50 * 1024

const beforeUpload = (file: RcFile) => {
  const isLt50k = file.size < maxFileSize;
  if (!isLt50k) message.error('Image must be smaller than 50kb');
  return isLt50k;
};

interface Props extends UploadProps {}

class UploadComponent extends PureComponent<Props> {
  render() {
    const cookie = Cookies.get('EasyBooksToken');
    const headers =
      (cookie && {
        Authorization: `Bearer ${encodeURIComponent(cookie)}`,
      }) ||
      undefined;
    const { name, listType, children, onChange } = this.props;

    return (
      <Upload
        accept=".jpg,.png,.gif"
        action={`${baseURL}/api/upload`}
        beforeUpload={beforeUpload}
        name={name}
        listType={listType}
        onChange={onChange}
        showUploadList={false}
        type="select"
        headers={headers}
      >
        {children}
      </Upload>
    );
  }
}

export default UploadComponent;
