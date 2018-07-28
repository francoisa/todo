import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import styles from './Home.css';

class HomePage extends Component {

  static propTypes = {
    viewer: PropTypes.shape({
      id: PropTypes.string
    }).isRequired,
  }

  constructor() {
    super();
  }

  render() {
    const { viewer } = this.props;
    return (
      <div className={styles.content}>
        <h1>User Authentication with Relay</h1>
        <div>
          You are currently logged in.
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment Home_viewer on viewer {
      id
    }
  `,
)
