import React from 'react';
import './App.css';
import { Search } from './Search/Search'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import possibleTypes from './apollo/possible-types';
import { TypedTypePolicies } from './apollo/client-helpers';

const typePolicies: TypedTypePolicies = {
  possibleTypes: possibleTypes.possibleTypes
}

const client = new ApolloClient({
  cache: new InMemoryCache({ typePolicies }),
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Search />
    </ApolloProvider>
  );
}

export default App;
