import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMessages } from 'actions/app';
import { fetchProfile, saveProfile } from 'actions/profile';
import { Divider } from 'antd';
import Page from 'layout/Page';
import ProfileForm from 'components/ProfileForm';

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  handleSaveProfile = obj => this.props.saveProfile(obj);

  render() {
    const { profile, setMessages } = this.props;

    return (
      <Page>
        <h1>Profile</h1>
        <Divider />
        <ProfileForm
          profile={profile}
          saveProfile={this.handleSaveProfile}
          setMessages={setMessages}
        />
      </Page>
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = {
  fetchProfile,
  saveProfile,
  setMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
