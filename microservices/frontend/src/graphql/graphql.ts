/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cuid: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
};

export type AuthToken = {
  __typename?: 'AuthToken';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Author = {
  __typename?: 'Author';
  createdAt: Scalars['DateTimeISO']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Cuid']['output'];
  lastName: Scalars['String']['output'];
  posts: Array<Post>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum AuthorFilterBy {
  Any = 'ANY',
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME'
}

export enum AuthorOrderBy {
  CreatedAt = 'CREATED_AT',
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type AuthorPaginationFilterByInput = {
  field: AuthorFilterBy;
  operator?: InputMaybe<PaginationFilterByOperator>;
  value: Scalars['String']['input'];
};

export type AuthorPaginationInput = {
  filterBy?: InputMaybe<Array<AuthorPaginationFilterByInput>>;
  orderBy?: InputMaybe<Array<AuthorPaginationOrderByInput>>;
  paging?: InputMaybe<AuthorPaginationPagingInput>;
};

export type AuthorPaginationOrderByInput = {
  direction: PaginationOrderByDirection;
  field: AuthorOrderBy;
};

export type AuthorPaginationPagingInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postCreate: Post;
  postDelete: Scalars['Boolean']['output'];
  postUpdate: Post;
  refreshToken: AuthToken;
  signIn: AuthToken;
  signUp: AuthToken;
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  id: Scalars['Cuid']['input'];
};


export type MutationPostUpdateArgs = {
  id: Scalars['Cuid']['input'];
  input: PostUpdateInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export enum PaginationFilterByOperator {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Like = 'LIKE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE',
  Nin = 'NIN',
  Nlike = 'NLIKE'
}

export enum PaginationOrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Post = {
  __typename?: 'Post';
  author: Author;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Cuid']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type PostCreateInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export enum PostFilterBy {
  Any = 'ANY',
  Slug = 'SLUG',
  Title = 'TITLE'
}

export enum PostOrderBy {
  CreatedAt = 'CREATED_AT',
  Slug = 'SLUG',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT'
}

export type PostPagination = {
  __typename?: 'PostPagination';
  edges: Array<PostPaginationEdge>;
  info: PostPaginationMeta;
};

export type PostPaginationEdge = {
  __typename?: 'PostPaginationEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export type PostPaginationFilterByInput = {
  field: PostFilterBy;
  operator?: InputMaybe<PaginationFilterByOperator>;
  value: Scalars['String']['input'];
};

export type PostPaginationInput = {
  filterBy?: InputMaybe<Array<PostPaginationFilterByInput>>;
  orderBy?: InputMaybe<Array<PostPaginationOrderByInput>>;
  paging?: InputMaybe<PostPaginationPagingInput>;
};

export type PostPaginationMeta = {
  __typename?: 'PostPaginationMeta';
  count: Scalars['Float']['output'];
  firstCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  lastCursor?: Maybe<Scalars['String']['output']>;
  total: Scalars['Float']['output'];
};

export type PostPaginationOrderByInput = {
  direction: PaginationOrderByDirection;
  field: PostOrderBy;
};

export type PostPaginationPagingInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PostUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  author: Author;
  authors: Array<Author>;
  post: Post;
  postBySlug: Post;
  posts: PostPagination;
};


export type QueryAuthorArgs = {
  id: Scalars['Cuid']['input'];
};


export type QueryAuthorsArgs = {
  input: AuthorPaginationInput;
};


export type QueryPostArgs = {
  id: Scalars['Cuid']['input'];
};


export type QueryPostBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPostsArgs = {
  input: PostPaginationInput;
};

export type RefreshTokenInput = {
  token: Scalars['String']['input'];
};

export type SignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignUpInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type PostByIdQueryVariables = Exact<{
  id: Scalars['Cuid']['input'];
}>;


export type PostByIdQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: any, title: string, slug: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: any, firstName: string, lastName: string, createdAt: any, updatedAt: any } } };

export type PostBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PostBySlugQuery = { __typename?: 'Query', postBySlug: { __typename?: 'Post', id: any, title: string, slug: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: any, firstName: string, lastName: string, createdAt: any, updatedAt: any } } };

export type PostsQueryVariables = Exact<{
  input?: PostPaginationInput;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostPagination', edges: Array<{ __typename?: 'PostPaginationEdge', node: { __typename?: 'Post', id: any, title: string, slug: string, content: string, createdAt: any, updatedAt: any, author: { __typename?: 'Author', id: any, firstName: string, lastName: string, createdAt: any, updatedAt: any } } }>, info: { __typename?: 'PostPaginationMeta', hasNextPage: boolean, hasPrevPage: boolean, total: number, count: number } } };


export const PostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Cuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PostByIdQuery, PostByIdQueryVariables>;
export const PostBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PostBySlugQuery, PostBySlugQueryVariables>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostPaginationInput"}}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;