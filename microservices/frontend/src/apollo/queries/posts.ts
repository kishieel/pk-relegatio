import { gql } from '@app/graphql';

export const POSTS_QUERY = gql(/* GraphQL */ `
  query Posts($input: PostPaginationInput! = {}) {
    posts(input: $input) {
      edges {
        node {
          id
          author {
            id
            firstName
            lastName
            createdAt
            updatedAt
          }
          title
          slug
          content
          createdAt
          updatedAt
        }
      }
      info {
        hasNextPage
        hasPrevPage
        total
        count
      }
    }
  }
`);
