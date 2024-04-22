import { gql } from '@app/graphql';

export const POST_BY_SLUG_QUERY = gql(/* GraphQL */ `
  query PostBySlug($slug: String!) {
    postBySlug(slug: $slug) {
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
`);
