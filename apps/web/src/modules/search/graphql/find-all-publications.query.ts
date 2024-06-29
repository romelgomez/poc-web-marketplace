import { gql } from '@apollo/client';

export const PUBLICATIONS = gql`
  query search($input: SearchInput!, $index: String!) {
    search(input: $input, index: $index) {
      hits {
        id
        title
        description
        deleted
        listingId
        media {
          id
          size
          version
          deleted
        }
      }
      hitsPerPage
      page
      totalHits
      totalPages
      offset
      limit
      estimatedTotalHits
      count
    }
  }
`;
