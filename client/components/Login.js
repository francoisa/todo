import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay'
import withRouter from 'found/lib/withRouter';
import CreateSessionMutation from '../mutations/CreateSessionMutation';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import environment from '../relay-environment'

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', showPassword: false, type: 'password'};
    this.login = this.login.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sharedLogin = this.sharedLogin.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.showHide = this.showHide.bind(this);
  }
  handleKeyPress(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.orig !== this.state.username) {
        this.sharedLogin();
        this.setState({orig: this.state.username});
      }
    }
  }
  handleTextChange(event) {
    if (event.target.name === 'username') {
      this.setState({username: event.target.value});
    }
    else {
      this.setState({password: event.target.value});
    }
  }
  handleMouseDownPassword(event) {
    event.preventDefault();
  }
  showHide() {
    this.setState({ showPassword: !this.state.showPassword })
  }
  sharedLogin() {
    CreateSessionMutation.commit(
      environment,
      {
        viewer: this.props.viewer,
        user: this.state.username,
        pass: this.state.password,
        onCompleted: () => this.props.router.go(-1)
      }
    );
  }
  login(event) {
    this.sharedLogin();
    this.setState({username: '', password: ''});
  }
  render() {
    const { username, password } = this.state;
    const { viewer } = this.props;
    const { classes } = this.props;
    console.log('viewer: ' + JSON.stringify(viewer));
    return (
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={0}>
            <Grid item xs={8}>
              <FormControl>
                <InputLabel htmlFor="username">username</InputLabel>
                <Input type='text' label='username' name='username'
                  value={username} onChange={this.handleTextChange}
                  className={classes.textField}
                  onKeyPress={this.handleKeyPress}
                />
            </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl>
                <InputLabel htmlFor="password">password</InputLabel>
                <Input
                  id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  name='password'
                  label='password'
                  value={password}
                  className={classes.textField}
                  onChange={this.handleTextChange}
                  onKeyPress={this.handleKeyPress}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='show password'
                        onClick={this.showHide}
                        onMouseOver={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <Button onClick={this.login} color='primary' variant='outlined' size='small' margin="normal">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
    );
  }
}

export default withStyles(styles)(createFragmentContainer(
  withRouter(Login),
  graphql`
    fragment Login_viewer on viewer {
      id
      isLoggedIn
    }
  `,
))
