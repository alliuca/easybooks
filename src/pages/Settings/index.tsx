import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings, setMessages } from 'actions/app';
import { PageContext } from 'providers/Page/context';
import { RootState } from 'reducers';
import { SettingsData } from 'actions/app';
import { Text } from 'components';
import Layout from 'components/Layout';
import Header from 'components/Header';
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
        text: <Text intl="messages.settings_saved_success" />,
      });
      this.context.goTo(`/invoices`);
    }
  };

  render() {
    const { settings } = this.props;

    return (
      <Layout>
        <Header left={<Text as="h1" intl="settings" />} />
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
