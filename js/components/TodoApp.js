import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';
import { Grid, Row, Col, Button, Panel, PageHeader } from 'react-bootstrap';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Login } from './Login'

function CheckLogin(props) {
  const authenticated = props.authenticated;
  console.log("TodoApp:authenticated: " + authenticated)
  if (authenticated) {
    return null;
  }
  return (<Login/>);
}

function Authenticated(parent) {
  const token = localStorage.getItem('token');
  if (token) {
      console.log("TodoApp:token: " + token);
      return (<div>{parent.children}</div>);
  }
  else {
    return null;
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true
    }
  }
  _handleTextInputSave = (text) => {
    AddTodoMutation.commit(
      this.props.relay.environment,
      text,
      this.props.viewer,
    )
  };
  _onLogout = () => {
    localStorage.removeItem('token');
    this.setState({authenticated: false});
  };
  render() {
    const hasTodos = this.props.viewer.totalCount > 0;
    return (
      <Grid>
        <CheckLogin authenticated={this.state.authenticated}/>
        <Authenticated>
          <Row>
            <Col className="pull-right">
              <Button bsStyle="link" onClick={() => this._onLogout()}>
                Log out
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <PageHeader bsClass="text-center">todos</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col>
              <TodoTextInput
                autoFocus={true}
                className="new-todo"
                onSave={this._handleTextInputSave}
                placeholder="What needs to be done?"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TodoList viewer={this.props.viewer} />
              {hasTodos &&
                <TodoListFooter
                  todos={this.props.viewer.todos}
                  viewer={this.props.viewer}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col>
             <Panel bsClass="text-center">
               <Panel.Body >Double-click to edit a todo</Panel.Body>
             </Panel>
           </Col>
         </Row>
        </Authenticated>
      </Grid>
    );
  }
}

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment TodoApp_viewer on User {
      id,
      totalCount,
      ...TodoListFooter_viewer,
      ...TodoList_viewer,
    }
  `,
});
