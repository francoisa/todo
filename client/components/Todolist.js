import React, { Component } from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import Todo from './Todo';
import List from '@material-ui/core/List';

class Todolist extends Component {
  render() {
    const { list } = this.props.todos;
      console.log("Todolist - todos " + JSON.stringify(this.props.todos));
      return (
         <div>
             <List>
               {list.edges.filter(edge => edge.node !== null)
                 .map(edge =>
                 <Todo
                   key={edge.node.id}
                   todo={edge.node}
                   userId={this.props.userId}
                 />
               )}
             </List>
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
