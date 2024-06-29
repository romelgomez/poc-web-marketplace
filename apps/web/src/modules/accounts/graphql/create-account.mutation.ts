import { gql } from '@apollo/client';

export const CREATE_ACCOUNT_QUERY = `
  mutation createAccount($data: UserInput!) {
    createAccount(data: $data) {
      id
      created
      modified
      name
      disabled
      ownerId
      user {
        id
        email
        firstName
        lastName
        nationality
      }
      listings {
        id
        modified
        created
        deleted
        name
        description
        visibility
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($data: UserInput!) {
    createAccount(data: $data) {
      id
      created
      modified
      name
      disabled
      ownerId
      user {
        id
        email
        firstName
        lastName
        nationality
      }
      listings {
        id
        modified
        created
        deleted
        name
        description
        visibility
      }
    }
  }
`;
