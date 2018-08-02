import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import viewerType from '../types/viewerType';

import { createToken, decodeToken } from '../../authentication';

/**
 *
 * input SessionInput {
 *   username: String!,
 *   password: String!
 * }
 *
 * type SessionPayload {
 *   clientMutationId: string
 *   username: String,
 *   token: String,
 *   list: TodoConnection
 * }
 */
export default mutationWithClientMutationId({
  name: 'CreateSession',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: payload => payload
    }
  },
  mutateAndGetPayload: ({ username, password }, dao, { rootValue }) => {
    const newSession = dao.createSession(username, password);
    if (newSession) {
      rootValue.session.token = createToken(newSession);
      rootValue.tokenData = decodeToken(rootValue.session.token);
    }
    return newSession;
  }
});
