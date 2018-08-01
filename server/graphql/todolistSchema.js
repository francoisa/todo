import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
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

import addTodoMutation from './mutations/addTodoMutation';
import deleteTodoMutation from './mutations/deleteTodoMutation';
import editTodoMutation from './mutations/editTodoMutation';
import createSessionMutation from './mutations/createSessionMutation';
import LoginMutation from './mutations/LoginMutation';
import LogoutMutation from './mutations/LogoutMutation';

import todoType from './types/todoType';
import viewerType from './types/viewerType';
import { NodeDefinitions } from './types/todoType';


/**
 *
 * interface Node {
 *   id: ID!
 * }
 *
 * type Query {
 *   getTodo(input: TodoInput): Todo
 *   node(id: ID!): Node
 * }
 *
 * type Mutation {
 *   createSession(input: SessionInput): SessionPayload
 *   addTodo(input: AddTodoInput!): AddTodoPayload
 *   editTodo(input: AddTodoInput!): AddTodoPayload
 *   removeTodo(input: AddTodoInput!): AddTodoPayload
 * }
 */

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    todo: {
      type: todoType,
      args: {
        nodeId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, {nodeId}, dao) => dao.getTodo(nodeId)
    },
    viewer: {
      type: viewerType,
      args: {
        nodeId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, {nodeId}, dao) => dao.getSession(nodeId)
    },
    node: NodeDefinitions.nodeField
  })
});


/**
 * This is the type that will be the root of our mutations, and the
 * entry point into performing writes in our schema.
 *
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTodo: addTodoMutation,
    deleteTodo: deleteTodoMutation,
    editTodo: editTodoMutation,
    createSession: createSessionMutation,
    login: LoginMutation,
    logout: LogoutMutation
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const TodoSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
