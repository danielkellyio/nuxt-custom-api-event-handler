export const postBelongsToUserGuard = defineGuard<{ postId: string }>(
  async (event, payload) => {
    // check if the post belongs to the user
    // this can be any async operation
    // like checking if a post belongs to a user in a database
    const usersPosts = ["123", "456"];

    if (!usersPosts.includes(payload.postId)) {
      throw createError({
        statusCode: 403,
        statusMessage: "Post does not belong to user",
      });
    }
  }
);
