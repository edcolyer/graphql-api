const knex = require('../helpers/database');

/**
 * Create a user in the database.
 */
async function createUser({ name, location }) {
  const data = await knex('users')
    .insert({ name, location })
    .returning('*');

  return data[0];
}

/**
 * Fetch a user from the database.
 */
async function getUser({ id }) {
  const data = await knex('users')
    .select('*')
    .first();

  return data;
}

module.exports = {
  createUser,
  getUser
};
