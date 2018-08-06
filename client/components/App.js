import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'found/lib/PropTypes';
import '../css/App.css';
import {graphql, createFragmentContainer,} from 'react-relay';

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
  logoutLink(isLoggedIn) {
    console.log("App - isLoggedIn: " + isLoggedIn);
    if (isLoggedIn) {
      return (<span className="logout"><a href="/logout">Logout</a></span>);
    }
    else {
      return null;
    }
  }
  render() {
    const { viewer, children, isLoading } = this.props;
    return (
       <div className="App">
          <header className="App-header">
           <span className="App-title">User Authentication with Relay</span>
           {this.logoutLink(viewer.isLoggedIn)}
          </header>
          {children}
       </div>
    );
  }
}

export default createFragmentContainer(
  App,
  graphql`
    fragment App_viewer on viewer {
      id,
      isLoggedIn,
      username,
      ...Todolist_todos
    }
  `
)
