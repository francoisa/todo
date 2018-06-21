import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import styles from './Home.css';

const HomePage = ({ viewer }) => (
  <div className={styles.content}>
    <h1>User Authentication with Relay</h1>

    <div>
      You are currently {!viewer.id && 'not'} logged in.
    </div>
  </div>
)


HomePage.propTypes = {
  viewer: PropTypes.shape({
    id: PropTypes.String,
  }).isRequired,
}

export default createFragmentContainer(
  HomePage,
  graphql`
    fragment Home_viewer on viewer {
      id
    }
  `,
)
