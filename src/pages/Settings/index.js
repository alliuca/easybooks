import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings, saveSettings } from 'actions/app';
import { Divider } from 'antd';
import Page from 'layout/Page';
import SettingsForm from 'components/SettingsForm';

class Settings extends Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  handleSaveSettings = (obj) => this.props.saveSettings(obj)

  render() {
    const { settings } = this.props;

    return (
      <Page>
        <h1>Settings</h1>
        <Divider />
        <SettingsForm
          settings={settings}
          saveSettings={this.handleSaveSettings}
        />
      </Page>
    );
  }
}

const mapStateToProps = ({ app: { settings } }) => ({
  settings,
});

const mapDispatchToProps = {
  fetchSettings,
  saveSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
