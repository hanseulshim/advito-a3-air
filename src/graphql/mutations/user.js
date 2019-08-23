import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      displayName
      clientId
      profilePicturePath
      sessionToken
      roleIds
    }
  }
`;

export const SEND_RESET_PASSWORD = gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;
