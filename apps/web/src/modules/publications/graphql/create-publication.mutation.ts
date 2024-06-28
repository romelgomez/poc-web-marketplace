import { gql } from '@apollo/client';

export const CREATE_PUBLICATION = gql`
  mutation createPublication($data: PublicationInput!) {
    createPublication(data: $data) {
      id
      title
      description
      visibility
      created
      modified
      listing {
        id
        name
        description
      }
      media {
        id
        size
        version
        name
        created
        deleted
      }
    }
  }
`;
