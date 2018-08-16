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
    nodeId: { type: new GraphQLNonNull(GraphQLString) },
    text: { type: GraphQLString },
    status: { type: GraphQLString }
  },
  outputFields: {
    clientMutationId: {type: GraphQLString},
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: ({userId, todo}, args, dao, rootValue) => {
      return {
          cursor: cursorForObjectInConnection(dao.getTodos(userId), todo),
          node: todo
        };
      }
    }
  },
  mutateAndGetPayload: ({ nodeId, text, status }, dao, { rootValue: { tokenData } }) => {
    const { id } = fromGlobalId(nodeId);
    const updatedTodo = dao.editTodo(id, text, status);
    const userLocalId = fromGlobalId(tokenData.userId);
    return {userId: userLocalId.id, todo: updatedTodo};
  }
});
