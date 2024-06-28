import { gql } from '@apollo/client';

export const LISTING = gql`
  query listing($id: String!) {
    listing(id: $id) {
      id
      name
      visibility
      accountId
      description
      tag
      created
      modified
      deleted
    }
  }
`;
