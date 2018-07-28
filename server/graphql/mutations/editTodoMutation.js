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

export default mutationWithClientMutationId({
  name: 'EditTodo',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    nodeId: { type: new GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLString },
    status: { type: GraphQLString }
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: ({todo, userId}, args, dao) => {
      return {
          cursor: cursorForObjectInConnection(dao.getTodos(userId), todo),
          node: todo
        };
      }
    }
  },
  mutateAndGetPayload: ({ userId, nodeId, text, status }, dao) => {
    const { id } = fromGlobalId(nodeId);
    const updatedTodo = dao.editTodo(id, text, status);
    const userLocalId = fromGlobalId(userId);
    return {userId: userLocalId.id, todo: updatedTodo};
  }
});
