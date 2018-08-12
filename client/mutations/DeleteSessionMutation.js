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

function commit(environment, {onCompleted}) {
  // Now we just call commitMutation with the appropriate parameters
  return commitMutation(
    environment,
    {
      mutation,
      variables: { input: {}},
      onCompleted,
      updater: (store) => {
      }
    }
  );
}

export default {commit};
