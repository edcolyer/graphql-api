const knex = require('../helpers/database');
const camelize = require('camelize');

/**
 * Create a post in the database.
 */
async function createPost({ title, content, parentId, userId }) {
  const post = await knex('posts')
    .insert({ title, content, parent_id: parentId, owner_user_id: userId })
    .returning('*');
  post.childPosts = [];

  return camelize(post[0]);
}

/**
 * Fetch a post from the database.
 */
async function getPost({ id }) {
  const post = await knex('posts')
    .select('*')
    .first();

  post.childPosts = await knex('posts')
    .select('*')
    .where({
      parent_id: post.id
    });

  // Increment view count
  await knex('posts')
    .increment('view_count', 1)
    .where({
      id
    });

  return camelize(post);
}

module.exports = {
  createPost,
  getPost
};
