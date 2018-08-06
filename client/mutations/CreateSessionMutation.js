import {graphql, commitMutation} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    createSession(input: $input) {
      viewer {
        id
        isLoggedIn
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
      onCompleted,
      updater: (store) => {
        const payload = store.getRootField('createSession');
        const viewer = payload.getLinkedRecord('viewer');
        const isLoggedIn = viewer.getValue('isLoggedIn');
        console.log('isLoggedIn: ' + isLoggedIn);
        viewer.isLoggedIn = isLoggedIn;
      }
    }
  );
}

export default {commit};
