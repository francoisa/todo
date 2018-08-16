import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay'
import withRouter from 'found/lib/withRouter';
import CreateSessionMutation from '../mutations/CreateSessionMutation';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      this.props.environment,
      {
        viewer: this.props.viewer,
        user: this.state.username,
        pass: this.state.password,
        onCompleted: () => this.props.router.go('/')
      }
    );
  }
  login(event) {
    this.sharedLogin();
    this.setState({username: '', password: ''});
  }
  render() {
    const { username, password } = this.state;
    console.log('viewer: ' + JSON.stringify(this.props.viewer));
    return (
        <div className='addform'>
          <TextField type='text' label='username' name='username'
            value={username} onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}/>&nbsp;
           <TextField type='password' label='password' name='password'
             value={password} onChange={this.handleTextChange}
             onKeyPress={this.handleKeyPress}/>&nbsp;
          <Button onClick={this.login} color='primary' variant='outlined' size='small'>
            Login
          </Button>
        </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(Login),
  graphql`
    fragment Login_viewer on viewer {
      id
      isLoggedIn
    }
  `,
)
