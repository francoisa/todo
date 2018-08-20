import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import styles from './Home.css';
import Todolist from '../components/Todolist';
import AddTodo from '../components/AddTodo';
import Login from '../components/Login';
import environment from '../relay-environment'
import withRouter from 'found/lib/withRouter';

const HomePage = ({ viewer, router }) => {
  console.log('Home - viewer.isLoggedIn: ' + viewer.isLoggedIn);
  if (viewer.isLoggedIn) {
    return (
      <div className={styles.content}>
        <div className="list">
          <div className='subheading'>welcome: {viewer.username}</div>
          <AddTodo environment={environment} viewer={viewer}/>
          <Todolist todos={viewer} userId={viewer.id}/>
        </div>
      </div>
    )
  }
  else {
    router.push('/login');
    return null;
  }
}


HomePage.propTypes = {
  viewer: PropTypes.shape({
    id: PropTypes.String,
  }).isRequired,
}

export default createFragmentContainer(
  withRouter(HomePage),
  graphql`
    fragment Home_viewer on viewer {
      id,
      isLoggedIn,
      username,
      ...Todolist_todos
    }
  `,
)
