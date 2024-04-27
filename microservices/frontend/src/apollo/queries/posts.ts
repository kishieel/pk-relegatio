import { gql } from '@app/graphql';

export const POSTS_QUERY = gql(/* GraphQL */ `
  query Posts($input: PostPaginationInput! = {}) {
    posts(input: $input) {
      data {
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
      pageInfo {
        hasNextPage
        hasPrevPage
      }
    }
  }
`);
