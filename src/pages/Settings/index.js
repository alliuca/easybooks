import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings, setMessages } from 'actions/app';
import { Divider } from 'antd';
import Layout from 'components/Layout';
import SettingsForm from 'components/SettingsForm';

class Settings extends Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  handleSaveSettings = obj => this.props.saveSettings(obj);

  render() {
    const { settings, setMessages } = this.props;

    return (
      <Layout>
        <h1>Settings</h1>
        <Divider />
        <SettingsForm
          settings={settings}
          saveSettings={this.handleSaveSettings}
          setMessages={setMessages}
        />
      </Layout>
    );
  }
}

const mapStateToProps = ({ app: { settings } }) => ({
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
