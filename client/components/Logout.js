import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay'
import withRouter from 'found/lib/withRouter';
import DeleteSessionMutation from '../mutations/DeleteSessionMutation';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    DeleteSessionMutation.commit(
      this.props.relay.environment,
      {
        viewer: this.props.viewer,
        onCompleted: () => this.props.router.push('/')
      }
    );
  }
  render() {
    console.log('Logout - viewer: ' + JSON.stringify(this.props.viewer));
    this.logout();
    return (
        null
    );
  }
}

export default createFragmentContainer(
  withRouter(Logout),
  graphql`
    fragment Logout_viewer on viewer {
      id
      isLoggedIn
    }
  `,
)
