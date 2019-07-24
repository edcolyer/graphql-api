const postService = require('./index');

module.exports = {
  /**
   * Return a specific post, given an ID.
   * @param {string} id - The ID of the post to query for
   * @returns {Post} The requested post
   */
  post: (args, req, info) => {
    const { id } = args;

    return postService.getPost({ id });
  },

  // TODO: `posts`

  // TODO: `createPost`
  /**
   * Creates a post.
   * @param {string} title - The title of the post
   * @param {string} content - The post's content
   * @param {number} [parentId] - The ID of the parent (if any)
   * @returns {Post} The created post
   */
  createPost: function(args, req, info) {
    console.log('Creating post');
    const { input } = args;
    const { title, content, parentId } = input;
    // TODO: get user from decorated request
    const userId = 1;

    return postService.createPost({ title, content, parentId, userId });
  }

  // TODO: `updatePost`

  // TODO: `deletePost`
};
