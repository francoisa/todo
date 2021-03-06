import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import { createToken, decodeToken } from '../../authentication'

import viewerType from '../types/viewerType';

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: viewerType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: ({ email, password }, { db }, { rootValue }) => {
    const user = db.createSession(email, password)

    // set session token so that user is authenticated on next requests via a cookie
    if (user) {
      /* eslint-disable no-param-reassign */
      rootValue.session.token = createToken(user)
      rootValue.tokenData = decodeToken(rootValue.session.token)
      /* eslint-enable no-param-reassign */
    }
    return { user }
  },
})
