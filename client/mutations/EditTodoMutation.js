import {graphql, commitMutation} from 'react-relay';

// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation EditTodoMutation($input: EditTodoInput!) {
    editTodo(input: $input) {
      todoEdge {
        node {
          id
          text
          status
        }
        cursor
      }
    }
  }
`;

function sharedUpdater(store, {id, text, status}) {
  const todoProxy = store.get(id);
  todoProxy.setValue(text, 'text');
  todoProxy.setValue(status,'status');
}

function commit(
  environment,
  status,
  text,
  todo
) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {status: status, text: text, nodeId: todo.id},
      },
      optimisticUpdater: (store) => {
        sharedUpdater(store, {id: todo.id, text: text, status: status});
      },
      updater: (store) => {
//        const payload = store.getRootField('editTodo');
//        const todoEdge = payload.getLinkedRecord('todoEdge');
//        const nodeProxy = todoEdge.getLinkedRecord('node');
        const nodeProxy = store.get(todo.id);
        const node = {id: nodeProxy.getValue('id')};
        node.text = nodeProxy.getValue('text');
        node.status = nodeProxy.getValue('status');
        sharedUpdater(store, node);
      }
    }
  );
}

export default {commit};
