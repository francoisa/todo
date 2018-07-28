import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay';

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
export const NodeDefinitions = nodeDefinitions(
  (globalId, dao) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'viewer') {
      return dao.getSession(id);
    }
    if (type === 'Todo') {
      return dao.getTodo(id);
    }
    return null;
  },
  obj => {
    return obj.list ? viewerType : todoType;
  }
);

/**
 *
 * type Todo : Node {
 *   id: ID!
 *   text: String
 *   status: String
 * }
 */
const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'A task',
  interfaces: [ NodeDefinitions.nodeInterface ],
  fields: () => ({
    id: globalIdField(),
    text: {
      type: GraphQLString,
      description: 'The text of the todo item.'
    },
    status: {
      type: GraphQLString,
      description: 'The status of the todo item.'
    }
  })
});

export const TodoConnection =
  connectionDefinitions({ name: 'Todo', nodeType: todoType });

export default todoType;
