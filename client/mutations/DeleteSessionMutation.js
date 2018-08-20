import {graphql, commitMutation} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
// We start by defining our mutation from above using `graphql`
const mutation = graphql`
  mutation DeleteSessionMutation($input: deleteSessionInput!) {
    deleteSession(input: $input) {
      viewer {
        id
        isLoggedIn
      }
    }
  }
`;

function commit(environment, {onCompleted, viewer}) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: { input: {}},
      onCompleted,
      updater: (store) => {
        console.log('DeleteSessionMutation - viewer: ' + JSON.stringify(viewer))
        const viewerProxy = store.get(viewer.id);
        viewerProxy.setValue(false, 'isLoggedIn');
      }
    }
  );
}

export default {commit};
