import axios, { type AxiosResponse } from 'axios';

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL;

if (!graphqlEndpoint) {
  throw new Error('GraphQL endpoint is missing from environment variables.');
}

interface GraphQLRequestPayload<T> {
  query: string;
  variables?: T;
}

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Makes a typed GraphQL request using Axios.
 *
 * @param queryOrMutation - The GraphQL query or mutation string.
 * @param variables - The variables for the query or mutation.
 * @returns A promise that resolves with the GraphQL response data.
 */
async function graphqlRequest<
  TVariables = Record<string, unknown>,
  TResult = Record<string, unknown>,
>(
  queryOrMutation: string,
  variables?: TVariables,
): Promise<TResult | undefined> {
  try {
    const payload: GraphQLRequestPayload<TVariables> = {
      query: queryOrMutation,
      variables,
    };

    if (!graphqlEndpoint) {
      throw new Error(
        'GraphQL endpoint is missing from environment variables.',
      );
    }

    const response: AxiosResponse<GraphQLResponse<TResult>> = await axios.post(
      graphqlEndpoint,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        maxBodyLength: Number.POSITIVE_INFINITY,
      },
    );

    if (response.data.errors) {
      throw new Error(
        response.data.errors.map((error) => error.message).join('\n'),
      );
    }

    return response.data.data as TResult;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`GraphQL Request Failed: ${error.message}`);
    }
  }
}

export default graphqlRequest;
