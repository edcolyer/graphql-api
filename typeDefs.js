const fs = require('fs');
const { gql } = require('apollo-server-express');

const Post = fs.readFileSync('./post/typeDef.graphql').toString();
const User = fs.readFileSync('./user/typeDef.graphql').toString();
const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;
module.exports = [root, Post, User];
