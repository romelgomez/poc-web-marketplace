import { gql } from '@apollo/client';

export const UPDATE_LISTING = gql`
  mutation updateListing($data: ListingInput!) {
    updateListing(data: $data) {
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
