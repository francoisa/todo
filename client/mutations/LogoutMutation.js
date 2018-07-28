import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      user {
        id
      }
    }
  }
`

function commit({ environment, onCompleted, onError }) {
  const variables = { input: {} }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  })
}

export default {
  commit,
}
