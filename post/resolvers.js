const postService = require('./index');

module.exports = {
  Query: {
    /**
     * Return a specific post, given an ID.
     */
    post: (obj, args, context, info) => {
      const { id } = args;

      return postService.getPost({ id });
    },

    /**
     * Return all parent posts.
     * Note: if you were to do pagination, here is a great resource:
     * https://www.apollographql.com/docs/react/features/pagination/
     */
    posts: (obj, args, context, info) => {
      return postService.getPosts();
    }
  },

  Mutation: {
    /**
     * Creates a post.
     */
    createPost: function(obj, args, context, info) {
      const { input } = args;
      const { title, content, parentId } = input;
      // TODO: get user from decorated request
      const userId = 1;

      return postService.createPost({ title, content, parentId, userId });
    },

    /**
     * Updates a post.
     */
    updatePost: function(obj, args, context, info) {
      const { id, patch } = args.input;

      return postService.updatePost(id, patch);
    },

    /**
     * Creates a post.
     */
    deletePost: function(obj, args, context, info) {
      const { id } = args;

      return postService.deletePost(id);
    }
  }
};
