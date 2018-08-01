import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId
} from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'DeleteTodo',
  inputFields: {
    nodeId: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    deletedId: {
      type: GraphQLID,
      resolve: ({nodeId}) => nodeId
    }
  },
  mutateAndGetPayload: ({ nodeId }, dao) => {
    const { id } = fromGlobalId(nodeId);
    dao.deleteTodo(id);
    return { nodeId };
  }
});
