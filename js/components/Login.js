import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import CreateSessionMutation from '../mutations/CreateSessionMutation';
import TodoApp from './TodoApp';
import { QueryRenderer,graphql } from 'react-relay';
import { modernEnvironment } from '../app';

var token = localStorage.getItem('token');

function Authenticated(parent) {
  token = localStorage.getItem('token');
  if (token) {
      console.log("Login:token: " + token);
      return (<div>{parent.children}</div>);
  }
  else {
    return null;
  }
}

function NotAuthenticated(parent) {
  token = localStorage.getItem('token');
  if (!token) {
      return (<div>{parent.children}</div>);
  }
  else {
    return null;
  }
}

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authenticated: false
    }
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _onLogin() {
    const { username, password } = this.state;
    const _this = this;
    CreateSessionMutation(username, password, () => {
      token = localStorage.getItem('token');
      _this.setState({authenticated: true});
    })
  }

  _welcomeMessage() {
    const { message } = this.props.username ? this.props.username : { message: false }
    if (message) {
    return (<div>
      {message}
      </div>);
    }
    else {
      return (<div>Please log in:</div>);
    }
  }

  _handleInputChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState( { [name] : value })
  }

  _loginForm() {
    return (<div>
      <input
        className="form-control"
        name="username"
        value={this.state.username}
        type="text"
        onChange={this._handleInputChange}
        placeholder="username"/>
      <br/>
      <input
        className="form-control"
        name="password"
        value={this.state.password}
        type="password"
        onChange={this._handleInputChange}
        placeholder="password"/>
      <br/>
      <Button onClick={() => this._onLogin()}>
        Log in
      </Button>
    </div>)
  }

  render () {
    return (<div>
      <NotAuthenticated>
        <Grid>
          <Row>
            <Col xs={4} md={4}>
              {this._welcomeMessage()}
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={4}>
              {this._loginForm()}
            </Col>
          </Row>
        </Grid>
      </NotAuthenticated>
      <Authenticated>
        <QueryRenderer
          environment = {modernEnvironment}
          query = {graphql`
            query LoginQuery($token: String!) {
              viewer(token: $token) {
                ...TodoApp_viewer
              }
            }
          `}
          variables = {{token: token}}
          render = {({error, props}) => {
            console.log('Login:props: ' + JSON.stringify(props) + ' token:' +
              token);
            if (props) {
              return <TodoApp viewer={props.viewer} />;
            }
            else {
              return (
                <Grid>
                  <Row>
                    <Col xs={4} md={4}>
                      <Panel bsClass="text-center">
                        <Panel.Body>Loading</Panel.Body>
                      </Panel>
                    </Col>
                  </Row>
                </Grid>
              );
            }
          }}
        />,
      </Authenticated>
    </div>);
  }
};
