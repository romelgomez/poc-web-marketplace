import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import type { ReactNode } from 'react';
import { useClerkAuth } from '../context/hooks/use-clerk-auth.hook';

type Props = {
  children: ReactNode;
};

export default function ApolloProviderWrapper({ children }: Props) {
  const { getAuthToken } = useClerkAuth();

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
  });


  console.log({
    tag: 'apollo',
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL,
    tag_id: process.env.TAG_ID,
    tag2: process.env.TAG2
  });


  const authLink = setContext(async (_, { headers }) => {
    const token = await getAuthToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
