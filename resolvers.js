const _ = require('lodash');

// Defined by us
const Post = require('./post/resolvers');
const User = require('./user/resolvers');

// Merge resolvers
const resolvers = _.merge(Post, User);

// Scalars
// Note: Because a huge advantage of GraphQL is its type system, it is a great
// idea to use specific scalars where you need to enforce consistency (rather
// than a generic String type, e.g. for a phone number)
const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  ...resolvers,

  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};
