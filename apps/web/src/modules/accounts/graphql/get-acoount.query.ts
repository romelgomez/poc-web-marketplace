import { gql } from '@apollo/client';

export const GET_ACCOUNT_QUERY = `
  query getAccount($email: String!) {
    getAccount(email: $email) {
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

export const GET_ACCOUNT = gql`
  query getAccount($email: String!) {
    getAccount(email: $email) {
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
