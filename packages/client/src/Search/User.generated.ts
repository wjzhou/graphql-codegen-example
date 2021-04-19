import * as Types from '../apollo/types';

import { gql } from '@apollo/client';
export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'username' | 'email' | 'role'>
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
  role
}
    `;