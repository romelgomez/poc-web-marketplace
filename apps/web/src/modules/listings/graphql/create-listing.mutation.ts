import { gql } from '@apollo/client';

export const CREATE_LISTING = gql`
  mutation createListing($data: ListingInput!) {
    createListing(data: $data) {
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
