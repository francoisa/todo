import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  cursorForObjectInConnection,
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay';

import { TodoConnection } from '../types/todoType';

/**
 *
 * type AddTodoPayload {
 *   clientMutationId: string
 *   todo: Todo
 * }
 */
export default mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    text: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: ({localTodoId, userId}, args, dao) => {
        console.log('userId: ' + userId + ' localTodoId: ' + localTodoId);
        const todo = dao.getTodo(localTodoId);
        console.log('todo: ' + JSON.stringify(todo));
        return {
          cursor: cursorForObjectInConnection(dao.getTodos(userId), todo),
          node: todo
        };
      }
    }
  },
  mutateAndGetPayload: ({ text, userId }, dao) => {
    const newTodo = dao.addTodo(text);
    const {id} = fromGlobalId(userId);
    return {localTodoId: newTodo.id, userId: id};
  }
});
