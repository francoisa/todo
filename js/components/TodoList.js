import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';

import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import { FormControl, Label } from 'react-bootstrap';

class TodoList extends React.Component {
  _handleMarkAllChange = (e) => {
    const complete = e.target.checked;
    MarkAllTodosMutation.commit(
      this.props.relay.environment,
      complete,
      this.props.viewer.todos,
      this.props.viewer,
    );
  };
  renderTodos() {
    return this.props.viewer.todos.edges.map(edge =>
      <Todo
        key={edge.node.id}
        todo={edge.node}
        viewer={this.props.viewer}
      />
    );
  }
  render() {
    const numTodos = this.props.viewer.totalCount;
    const numCompletedTodos = this.props.viewer.completedCount;
    return (
       <div>
        <h3>
        <Label>
          <FormControl
            checked={numTodos === numCompletedTodos}
            onChange={this._handleMarkAllChange}
            type="checkbox"
            bsClass="text-left"
          />
          &nbsp;Mark all as complete
        </Label>
        </h3>
        <ul className="todo-list">
          {this.renderTodos()}
        </ul>
      </div>
    );
  }
}

export default createFragmentContainer(TodoList, {
  viewer: graphql`
    fragment TodoList_viewer on User {
      todos(first: 2147483647) # max GraphQLInt
        @connection(key: "TodoList_todos") {
          edges {
            node {
              id,
              complete,
              ...Todo_todo,
            },
          },
        },
        id,
        totalCount,
        completedCount,
        ...Todo_viewer,
    }
  `,
});
