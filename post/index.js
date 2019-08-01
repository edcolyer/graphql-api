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
 * Delete a post from the database.
 */
async function deletePost(id) {
  const childPosts = await knex('posts')
    .select('*')
    .where({
      parent_id: id
    });

  const posts = await knex('posts')
    .delete()
    .where({
      id
    })
    .returning('*');

  if (posts.length < 1) {
    // No post found
    throw new Error('Post does not exist');
  }
  posts[0].childPosts = childPosts;

  return camelize(posts[0]);
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

/**
 * Fetch a list of parent posts from the database.
 */
async function getPosts() {
  // TODO: implement pagination
  const posts = await knex('posts')
    .select('*')
    .where({
      parent_id: null
    });

  const ownerUsers = await knex('users')
    .select('*')
    .distinct()
    .whereIn('id', posts.map(p => p.owner_user_id));

  // Map users to posts
  const usersMap = {};
  for (const u of ownerUsers) {
    usersMap[u.id] = u;
  }
  for (const p of posts) {
    p.ownerUser = usersMap[p.owner_user_id];
  }

  return camelize(posts);
}

/**
 * Update a post in the database.
 */
async function updatePost(id, { title, content }) {
  const post = await knex('posts')
    .update({
      title,
      content,
      edited_timestamp: knex.raw('CURRENT_TIMESTAMP')
    })
    .where({
      id
    })
    .returning('*');

  return camelize(post[0]);
}

module.exports = {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost
};
