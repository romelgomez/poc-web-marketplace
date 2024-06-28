import { useQuery } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useMemo, useState } from 'react';
import type { Account } from '../../modules/accounts/accounts.entity';
import { GET_ACCOUNT } from '../../modules/accounts/graphql/get-acoount.query';

export const useAccount = () => {
  const { user } = useUser();

  const [account, setAccount] = useState<Account | null>(null);

  const userEmail: string | undefined = useMemo(
    () => user?.primaryEmailAddress?.emailAddress,
    [user?.primaryEmailAddress?.emailAddress],
  );

  const { data, loading, error } = useQuery<{ getAccount: Account }>(
    GET_ACCOUNT,
    {
      fetchPolicy: 'network-only',
      variables: {
        email: userEmail ?? '',
      },
      skip: !userEmail,
    },
  );

  useEffect(() => {
    if (!loading && data?.getAccount?.id && !error) {
      setAccount(data.getAccount);
    } else if (error) {
      console.error('Error fetching publications:', error);
    }
  }, [data, loading, error]);

  return { account, loading, error };
};
