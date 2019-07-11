import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import { setMessages } from 'actions/app';
import { Profile as ProfileProps, fetchProfile, saveProfile } from 'actions/profile';
import { RootState } from 'reducers';
import Layout from 'components/Layout';
import ProfileForm from 'components/ProfileForm';

interface Props {
  profile: RootState['profile'];
  fetchProfile: () => ReturnType<ReturnType<typeof fetchProfile>>;
  saveProfile: (data: ProfileProps) => ReturnType<ReturnType<typeof saveProfile>>;
  setMessages: typeof setMessages;
}

class Profile extends Component<Props> {
  componentDidMount() {
    this.props.fetchProfile();
  }

  save = async (data: ProfileProps, options: { stay: boolean }) => {
    await this.props.saveProfile(data);
    await this.props.setMessages({
      id: 'save_profile',
      type: 'success',
      text: 'Profile has been successfully saved',
    });
  };

  render() {
    const { profile, setMessages } = this.props;

    return (
      <Layout>
        <h1>Profile</h1>
        <Divider />
        <ProfileForm initialData={profile} save={this.save} />
      </Layout>
    );
  }
}

const mapStateToProps = ({ profile }: RootState) => ({
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
