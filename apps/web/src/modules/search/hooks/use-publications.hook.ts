import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PUBLICATIONS } from '../graphql/find-all-publications.query';
import type { PublicationsResponse } from '../search.types';

export default function usePublications() {
  const router = useRouter();
  const [publication, setPublication] = useState<
    PublicationsResponse | undefined
  >();

  const listingId = router.query.i?.toString();
  console.log('listingId', listingId);

  const { data, loading, error } = useQuery<{ search: PublicationsResponse }>(
    PUBLICATIONS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        input: {
          q: router.query.q?.toString() || '',
          filter: [],
          page: router.query.page ? +router.query.page : 1,
        },
        index: listingId,
      },
      skip: !listingId,
    },
  );

  useEffect(() => {
    if (!loading && data && !error) {
      setPublication(data.search);
    } else if (error) {
      console.error('Error fetching publications:', error);
    }
  }, [data, loading, error]);

  return publication;
}
