import { gql } from '@app/graphql';

export const POST_BY_ID_QUERY = gql(/* GraphQL */ `
  query PostById($id: Cuid!) {
    post(id: $id) {
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
