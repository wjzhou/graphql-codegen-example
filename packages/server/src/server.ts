import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema.graphql';
import { resolvers } from './resolvers';
import { context } from './context';

// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});