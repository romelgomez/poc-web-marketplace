import { gql } from '@apollo/client';

export const REMOVE_LISTING = gql`
  mutation removeListing($id: String!) {
    removeListing(id: $id) {
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
