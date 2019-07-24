const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

function loggingMiddleware(req, res, next) {
  // TODO: do something with this?
  next();
}

// Construct the GraphQL schema string
// Note: seems common to have typeDef.js files (which you can just require or
// import)
const Post = fs.readFileSync('./post/typeDef.graphql').toString();
const User = fs.readFileSync('./user/typeDef.graphql').toString();
const Query = fs.readFileSync('./query/typeDef.graphql').toString();
const Mutation = fs.readFileSync('./mutation/typeDef.graphql').toString();
const typeDef = [Query, Mutation, Post, User];
const graphqlSchema = typeDef.join('\n');

// Build the schema
const schema = buildSchema(graphqlSchema);

// Get resolvers
const userResolvers = require('./user/resolvers');
const postResolvers = require('./post/resolvers');

// Create the `root`, which contains a resolver function for each API "endpoint"
// TODO: is there a better way for this to be split up?
const root = {
  ...userResolvers,
  ...postResolvers
};

const app = express();
app.use(loggingMiddleware);

app.use('/graphql', graphqlHttp({
  schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV !== 'production'
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
