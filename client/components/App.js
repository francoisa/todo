import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'found/lib/PropTypes';
import '../css/App.css';
import {graphql, createFragmentContainer,} from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import withRouter from 'found/lib/withRouter';

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
      anchorEl: null
    }
    this.logoutLink = this.logoutLink.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logout() {
    this.setState({ anchorEl: null });
    this.props.router.push('/logout');
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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { viewer, children, isLoading } = this.props;
    return (
      <div className="App">
      <AppBar position="static">
         <Toolbar>
           <IconButton className="menuButton" color="inherit" aria-label="Menu">
             <MenuIcon />
           </IconButton>
           <Typography variant="title" color="inherit" className="flex">
             User Authentication with Relay
           </Typography>
           {viewer.isLoggedIn && (
             <div>
               <IconButton
                 aria-owns={open ? 'menu-appbar' : null}
                 aria-haspopup="true"
                 onClick={this.handleMenu}
                 color="inherit"
               >
                 <AccountCircle />
               </IconButton>
               <Menu
                 id="menu-appbar"
                 anchorEl={anchorEl}
                 anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 transformOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 open={open}
                 onClose={this.handleClose}
               >
                 <MenuItem href="/profile">Profile</MenuItem>
                 <MenuItem onClick={this.logout}>Logout</MenuItem>
               </Menu>
             </div>
           )}
         </Toolbar>
       </AppBar>
          {children}
       </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(App),
  graphql`
    fragment App_viewer on viewer {
      isLoggedIn
    }
  `
)
