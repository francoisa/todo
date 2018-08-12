import {graphql, commitMutation} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    createSession(input: $input) {
      viewer {
        id
        isLoggedIn
        username
        email
        list {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              text
              status
            }
          }
        }
      }
    }
  }
`;

let tempID = 0;

function commit(environment, {viewer, user, pass, onCompleted}) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {username: user, password: pass}
      },
      onCompleted: onCompleted,
      updater: (store) => {
        const payload = store.getRootField('createSession');
        const v = payload.getLinkedRecord('viewer');
        const isLoggedIn = v.getValue('isLoggedIn');
        console.log('Login - isLoggedIn: ' + isLoggedIn);
        const viewerProxy = store.get(viewer.id);
        viewerProxy.setValue(isLoggedIn, 'isLoggedIn');
        console.log('Login - isLoggedIn: ' + viewerProxy.getValue('isLoggedIn'));
      }
    }
  );
}

export default {commit};
