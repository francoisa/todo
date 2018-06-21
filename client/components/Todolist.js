import React, { Component } from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Todo from './Todo';

class Todolist extends Component {
  render() {
    const { list } = this.props.todos;
      return (
         <div>
             <ul className="todolist">
               {list.edges.map(edge =>
                 <Todo
                   key={edge.node.id}
                   todo={edge.node}
                   userId={this.props.userId}
                 />
               )}
              </ul>
          </div>
    );
  }
}

export default createFragmentContainer(
    Todolist,
    graphql`
      fragment Todolist_todos on viewer {
        list(first: 65535)
        @connection(key: "Todolist_list") {
          edges {
            node {
              id,
              ...Todo_todo
            }
          }
        }
      }`
);
