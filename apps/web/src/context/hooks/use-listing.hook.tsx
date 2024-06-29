import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { CREATE_LISTING } from '../../modules/listings/graphql/create-listing.mutation';
import { LISTING } from '../../modules/listings/graphql/find-one-listing.query';
import { REMOVE_LISTING } from '../../modules/listings/graphql/remove-listing.mutation';
import { UPDATE_LISTING } from '../../modules/listings/graphql/update-listing.mutation';
import { Listing } from '../../modules/listings/listings.entity';
import type { IListing } from '../../modules/listings/listings.types';
import { useAppContext } from './use-app-context';

export const useListing = () => {
  const [listing, setListing] = useState<Listing | undefined>();

  const router = useRouter();
  const { state } = useAppContext();

  const [createListing] = useMutation(CREATE_LISTING);
  const [updateListing] = useMutation(UPDATE_LISTING);
  const [removeListing] = useMutation(REMOVE_LISTING);

  const { data, loading, error, refetch } = useQuery<{
    listing: Listing;
  } | null>(LISTING, {
    fetchPolicy: 'no-cache',
    variables: {
      id: router.query.i || '',
    },
    skip: !router.query.i,
  });

  useEffect(() => {
    if (!loading && data && !error) {
      setListing(data.listing);
    } else if (error) {
      console.error('Error fetching listing:', error);
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (state.listing) {
      setListing(state.listing);
    }
  }, [state.listing]);

  const loadListing = useCallback(
    async (id: string) => {
      await refetch({
        id: id,
      });
    },
    [refetch],
  );

  const saveListing = useCallback(
    async (data: IListing) => {
      const listing = new Listing({
        ...data,
      });

      await createListing({
        variables: {
          data: listing.dto(),
        },
      });
    },
    [createListing],
  );

  const modifyListing = useCallback(
    async (data: IListing) => {
      const listing = new Listing({
        ...data,
      });

      await updateListing({
        variables: {
          data: listing.dto(),
        },
      });
    },
    [updateListing],
  );

  const deleteListing = useCallback(
    async (id: string) => {
      await removeListing({
        variables: {
          id,
        },
      });
    },
    [removeListing],
  );

  return {
    listing,
    loadListing,
    saveListing,
    modifyListing,
    deleteListing,
  };
};
