module.exports = {
  /**
   * Return a specific user, given an ID.
   * @param {string} id - The ID of the user to query for
   */
  user: (args, req, info) => {
    const { id } = args;

    // TODO: fetch user by ID
    return {
      id: id,
      name: 'Joe Bloggs'
    };
  }
};
