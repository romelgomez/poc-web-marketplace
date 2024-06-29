import { gql } from '@apollo/client';

export const UPDATE_PUBLICATION = gql`
  mutation updatePublication($data: PublicationInput!) {
    updatePublication(data: $data) {
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
