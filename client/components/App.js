import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'found/lib/PropTypes';
import '../css/App.css';
import environment from '../relay-environment'
import {graphql, createFragmentContainer,} from 'react-relay';
import Todolist from './Todolist';
import AddTodo from './AddTodo';

class App extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    viewer: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string
    }),
    router: routerShape.isRequired,
    isLoading: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = {
      navigationOpen: false,
    }
  }

  render() {
    const { viewer, isLoading } = this.props;
    return (
       <div className="list">
              <div>
                <div className='subheading'>welcome: {viewer.username}</div>
                <AddTodo environment={environment} viewer={viewer}/>
                <Todolist todos={viewer} userId={viewer.id}/>
              </div>
       </div>
    );
  }
}

export default createFragmentContainer(
  App,
  graphql`
    fragment App_viewer on viewer {
      id,
      username,
      ...Todolist_todos
    }
  `
)
