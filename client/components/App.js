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
      id: PropTypes.String
    }),
    children: PropTypes.node.isRequired,
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
    const { viewer, children, isLoading } = this.props;
    return (
       <div className="App">
          <header className="App-header">
           <h1 className="App-title">Todo</h1>
          </header>
         <div className="list">
                <div>
                  <div className='subheading'>welcome: {viewer.username}</div>
                  <AddTodo environment={environment} viewer={viewer}/>
                  <Todolist todos={viewer} userId={viewer.id}/>
                </div>
           {children}
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
