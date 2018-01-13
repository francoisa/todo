import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export class Login extends Component {
  _onLogin(username, pwd) {
    this.props.relay.commitUpdate(
    );
  }

  _welcomeMessage() {
    const { message } = this.props.username
    return (<div>
      {message}
      </div>);
  }

  _loginForm() {
    let username, pwd;
    return (<div>
      <input
        type="text"
        className="form-control"
        ref={ node => username = node }
        placeholder="username"/>
      <br/>
      <input
        type="password"
        className="form-control"
        ref={ node => pwd = node }
        placeholder="password"/>
      <br/>
      <Button onClick={() => this._onLogin(username.value, pwd.value)}>
        Log in
      </Button>
    </div>)
  }

  render () {
    return (
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
    );
  }
};
