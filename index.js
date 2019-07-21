const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}

// Read the schema.graphql file
const graphqlSchema = fs.readFileSync('schema.graphql').toString();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(graphqlSchema);

// Get the `root`, which contains a resolver function for each API endpoint
const root = require('./root');

const app = express();
app.use(loggingMiddleware);

app.use('/graphql', graphqlHttp({
  schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV !== 'production'
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
