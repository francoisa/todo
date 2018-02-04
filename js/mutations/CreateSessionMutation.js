import { commitMutation, graphql } from 'react-relay';
import { connectionHandler } from 'relay-runtime'
import { modernEnvironment } from '../app'

const mutation = graphql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    createSession(input: $input) {
      viewer {
        token
      }
    }
  }
 `

export default (username, password, callback) => {
  const variables = {
    input: {
      username,
      password
    },
  }

  commitMutation(
    modernEnvironment,
    {
      mutation,
      variables,
      updater: (store) => {
        const payload = store.getRootField('createSession');
        const viewer = payload.getLinkedRecord('viewer');
        console.log("CreateSessionMutation:viewer.token: " + viewer.getValue('token'));
        localStorage.setItem('token', viewer.getValue('token'));
      },
      onCompleted: () => {
        callback()
      },
      onError: err => console.error("In CreateSessionMutation: commitMutation: " + err)
    }
  )
}
