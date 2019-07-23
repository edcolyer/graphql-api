const userService = require('./index');

module.exports = {
  /**
   * Return a specific user, given an ID.
   * @param {string} id - The ID of the user to query for
   * @returns {User} The requested user
   */
  user: (args, req, info) => {
    const { id } = args;

    return userService.getUser({ id });
  },

  /**
   * Creates a user.
   * @param {string} name - The screen name of the user
   * @param {string} [location] - The location of the user
   * @returns {User} The created user
   */
  createUser: function(args, req, info) {
    const { params } = args;
    const { name, location } = params;

    return userService.createUser({ name, location });
  }
};
