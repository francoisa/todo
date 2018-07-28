import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {graphql, createFragmentContainer,} from 'react-relay';
import { routerShape } from 'found/lib/PropTypes';
import styles from '../css/App.css';
import Link from 'found/lib/Link'
import AppBar from 'material-ui/AppBar'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import UserMenu from './HeaderUserMenu'

class Body extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    viewer: PropTypes.shape({
      id: PropTypes.string
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

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) }
  }

  toggleNavigation = () => {
    const state = this.state
    state.navigationOpen = !this.state.navigationOpen
    this.setState(state)
  }

  render() {
    const { viewer, children, isLoading } = this.props;
    return (
      <div className="App">
        <AppBar
          title={<Link activeClassName={styles.title} to="/">Home</Link>}
          iconElementRight={<UserMenu viewer={viewer}/>}
          />
        {children}
      </div>
    );
  }
}

export default createFragmentContainer(
  Body,
  graphql`
    fragment Body_viewer on viewer {
      id,
      ...HeaderUserMenu_viewer
    }
  `
)
