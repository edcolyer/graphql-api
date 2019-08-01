const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { express: voyagerMiddleware } = require('graphql-voyager/middleware');

// Get the typeDefs
const typeDefs = require('./typeDefs');

// Get the resolvers
const resolvers = require('./resolvers');

// Error handler
// Note: Good resource for error handling: https://www.apollographql.com/docs/
// apollo-server/features/errors/
function formatError(error) {
  console.error(error);
  return error;
}

// Initialise Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Disable stack traces in production
  // Note: I think this is automatically done if NODE_ENV is production, without
  // this line of code
  debug: process.env.NODE_ENV !== 'production',

  // Handle errors globally
  formatError
});

const app = express();

server.applyMiddleware({ app });

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
