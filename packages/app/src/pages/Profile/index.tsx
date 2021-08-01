import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageContext } from 'providers/Page/context';
import { setMessages } from 'actions/app';
import { Profile as ProfileProps, fetchProfile, saveProfile } from 'actions/profile';
import { RootState } from 'reducers';
import { Text } from 'components';
import Layout from 'components/Layout';
import Header from 'components/Header';
import ProfileForm from 'components/ProfileForm';

interface Props {
  profile: RootState['profile'];
  fetchProfile: () => ReturnType<ReturnType<typeof fetchProfile>>;
  saveProfile: (data: ProfileProps) => ReturnType<ReturnType<typeof saveProfile>>;
  setMessages: typeof setMessages;
}

class Profile extends Component<Props> {
  static contextType = PageContext;

  componentDidMount() {
    this.props.fetchProfile();
  }

  save = async (data: ProfileProps, options: { stay: boolean }) => {
    await this.props.saveProfile(data);

    if (!options.stay) {
      await this.props.setMessages({
        id: 'save_profile',
        type: 'success',
        text: <Text intl="messages.profile_saved_success" />,
      });
      this.context.goTo(`/invoices`);
    }
  };

  render() {
    const { profile } = this.props;

    return (
      <Layout>
        <Header left={<Text as="h1" intl="profile" />} />
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
