import * as Types from '../apollo/types';

import { UserFragmentFragment } from './User.generated';
import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from './User.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchQueryVariables = Types.Exact<{
  term: Types.Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: Array<(
    { __typename: 'User' }
    & UserFragmentFragment
  ) | (
    { __typename: 'ChatMessage' }
    & Pick<Types.ChatMessage, 'id' | 'content' | 'time'>
    & { user: (
      { __typename?: 'User' }
      & UserFragmentFragment
    ) }
  )> }
);


export const SearchDocument = gql`
    query search($term: String!) {
  search(term: $term) {
    __typename
    ... on User {
      ...UserFragment
    }
    ... on ChatMessage {
      id
      content
      time
      user {
        ...UserFragment
      }
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;