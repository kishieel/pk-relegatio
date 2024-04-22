import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { GRAPHQL_URL } from '@app/consts/environment';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_URL,
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          // headers: {
          //   Authorization: `Bearer JWT`,
          // },
          next: { revalidate: 0 },
        }),
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
});
