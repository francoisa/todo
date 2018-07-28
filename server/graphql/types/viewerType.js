import {
  GraphQLBoolean,
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

import { NodeDefinitions, TodoConnection } from './todoType';

/**
 *
 * type viewer : Node {
 *   id: ID!
 *   name: String
 *   list: TodoConnection
 * }
 */
export default new GraphQLObjectType({
  name: 'viewer',
  description: 'A logged in user',
  interfaces: [ NodeDefinitions.nodeInterface ],
  fields: () => ({
    id: globalIdField(),
    email: {
      type: GraphQLString,
      description: 'email address.'
    },
    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) =>
        tokenData.userId !== null
    },
    username: {
      type: GraphQLString,
      description: 'first and last name.'
    },
    token: {
      type: GraphQLString,
      description: 'jwt tokwn.'
    },
    list: {
      type: TodoConnection.connectionType,
      description: 'The user\'s todo list.',
      args: connectionArgs,
      resolve: (viewer, args, dao) => connectionFromArray(
        viewer.list.map(dao.getTodo),
        args
      )
    }
  })
});
