import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings, setMessages } from 'actions/app';
import { Divider } from 'antd';
import { PageContext } from 'providers/Page/context';
import { RootState } from 'reducers';
import { SettingsData } from 'actions/app';
import Layout from 'components/Layout';
import SettingsForm from 'components/SettingsForm';

interface Props {
  settings: SettingsData;
  fetchSettings: () => ReturnType<ReturnType<typeof fetchSettings>>;
  saveSettings: (data: SettingsData) => ReturnType<ReturnType<typeof saveSettings>>;
  setMessages: typeof setMessages;
}

class Settings extends Component<Props> {
  static contextType = PageContext;

  componentDidMount() {
    this.props.fetchSettings();
  }

  save = async (data: SettingsData, options: { stay: boolean }) => {
    await this.props.saveSettings(data);

    if (!options.stay) {
      await this.props.setMessages({
        id: 'save_settings',
        type: 'success',
        text: 'Settings have been successfully saved',
      });
      this.context.goTo(`/invoices`);
    }
  };

  render() {
    const { settings } = this.props;

    return (
      <Layout>
        <h1>Settings</h1>
        <Divider />
        <SettingsForm initialData={settings} save={this.save} />
      </Layout>
    );
  }
}

const mapStateToProps = ({ app: { settings } }: RootState) => ({
  settings,
});

const mapDispatchToProps = {
  fetchSettings,
  saveSettings,
  setMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
