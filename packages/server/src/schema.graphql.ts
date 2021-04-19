import gql from 'graphql-tag';

export const typeDefs = gql`
scalar Date

schema {
    query: Query
    mutation: Mutation
}

type Query {
  me: User!
  user(id: ID!): User
  allUsers: [User]
  search(term: String!): [SearchResult!]!
}

type Mutation {
  addUser(user: AddUserInput!): User!
}

enum Role {
  USER,
  ADMIN,
}

interface Node {
  id: ID!
}

union SearchResult = User | ChatMessage

type User implements Node {
  id: ID!
  username: String!
  email: String!
  role: Role!
}

fragment UserFragment on User {
    id
    username
    email
    role
}

type ChatMessage implements Node {
  id: ID!
  content: String!
  time: Date!
  user: User!
}
fragment ChatMessageFragment on ChatMessage{
  id
  content
  time
  user
}

input AddUserInput {
  username: String!
  email: String!
  role: Role!
}
`