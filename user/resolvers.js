const userService = require('./index');

module.exports = {
  Query: {
    /**
     * Return a specific user, given an ID.
     */
    user: (obj, args, context, info) => {
      const { id } = args;

      return userService.getUser({ id });
    }
  },

  Mutation: {
    /**
     * Creates a user.
     */
    createUser: function(obj, args, context, info) {
      const { input } = args;
      const { name, location } = input;

      return userService.createUser({ name, location });
    }
  }
};
