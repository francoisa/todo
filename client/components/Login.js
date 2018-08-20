import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay'
import withRouter from 'found/lib/withRouter';
import CreateSessionMutation from '../mutations/CreateSessionMutation';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import environment from '../relay-environment'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.login = this.login.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
          <Grid container spacing={8}>
            <Grid item xs={8}>
              <TextField type='text' label='username' name='username'
                value={username} onChange={this.handleTextChange}
                className={classes.textField}
                onKeyPress={this.handleKeyPress}
                margin="normal"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField type='password' label='password' name='password'
                value={password} onChange={this.handleTextChange}
                className={classes.textField}
                onKeyPress={this.handleKeyPress}
                margin="normal"
              />
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
