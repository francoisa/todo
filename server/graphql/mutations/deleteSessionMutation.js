import { mutationWithClientMutationId } from 'graphql-relay'

import viewerType from '../types/viewerType';

export default mutationWithClientMutationId({
  name: 'deleteSession',
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: (obj, { db }, { rootValue }) => {
    // eslint-disable-next-line no-param-reassign
    rootValue.session.token = null
    rootValue.tokenData.userId = null;
    return { user: {id: null, isLoggedIn: false } }
  },
})
