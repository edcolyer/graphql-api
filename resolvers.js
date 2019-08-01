const Post = require('./post/resolvers');
const User = require('./user/resolvers');

console.log({
  ...Post,
  ...User
});

module.exports = {
  ...Post,
  ...User
};
